import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: {
    name: string
    avatar: string
    bio?: string
  }
  tags: string[]
  image?: string
  published: boolean
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || { name: 'Anonymous', avatar: '/placeholder-user.jpg' },
        tags: data.tags || [],
        image: data.image || '',
        published: data.published !== false,
        content,
        readingTime: readingTime(content),
      } as BlogPost
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return allPostsData
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || { name: 'Anonymous', avatar: '/placeholder-user.jpg' },
      tags: data.tags || [],
      image: data.image || '',
      published: data.published !== false,
      content,
      readingTime: readingTime(content),
    }
  } catch (error) {
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap((post) => post.tags)
  return [...new Set(tags)].sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  const posts = getAllPosts()
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit)
  
  return relatedPosts
}