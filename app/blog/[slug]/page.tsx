import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPost } from '../../../src/components/sections/BlogPost'
import { getBlogPost, getBlogPosts } from '../../../lib/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - ioriimasu',
    }
  }

  return {
    title: `${post.title} - ioriimasu Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}