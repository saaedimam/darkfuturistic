import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { ShareButtons } from '@/components/blog/share-buttons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    publishedTime: post.date,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      
      {/* Back Navigation */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="py-8 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8 lg:mb-12">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime.text}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-display text-foreground mb-6">
                {post.title}
              </h1>
              
              {/* Description */}
              <p className="text-body-lg mb-6">
                {post.description}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors focus-ring"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author & Share */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium text-foreground">
                      {post.author.name}
                    </div>
                    {post.author.bio && (
                      <div className="text-sm text-muted-foreground">
                        {post.author.bio}
                      </div>
                    )}
                  </div>
                </div>
                
                <ShareButtons 
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`}
                  title={post.title}
                  description={post.description}
                />
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="aspect-video relative overflow-hidden rounded-2xl mb-8 lg:mb-12">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} />
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-heading-3 text-foreground mb-1">
                      {post.author.name}
                    </div>
                    {post.author.bio && (
                      <div className="text-body text-muted-foreground">
                        {post.author.bio}
                      </div>
                    )}
                  </div>
                </div>
                
                <ShareButtons 
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`}
                  title={post.title}
                  description={post.description}
                />
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-heading-2 text-foreground mb-8 text-center">
                Related Posts
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {relatedPost.image && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="focus-ring rounded-sm"
                      >
                        <h3 className="text-heading-3 text-foreground mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      
                      <p className="text-body text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <time dateTime={relatedPost.date}>
                          {new Date(relatedPost.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                        <span>{relatedPost.readingTime.text}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}