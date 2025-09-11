import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog | Stay Updated with Latest Insights',
  description: 'Discover the latest trends, tutorials, and insights from our team. Stay updated with industry best practices and innovative solutions.',
  openGraph: {
    title: 'Blog | Stay Updated with Latest Insights',
    description: 'Discover the latest trends, tutorials, and insights from our team.',
    type: 'website',
    images: [
      {
        url: '/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Stay Updated with Latest Insights',
    description: 'Discover the latest trends, tutorials, and insights from our team.',
    images: ['/blog-og.jpg'],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Latest Insights
            </div>
            <h1 className="text-display text-foreground mb-6">
              Our Blog
            </h1>
            <p className="text-body-lg">
              Discover the latest trends, tutorials, and insights from our team. 
              Stay updated with industry best practices and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/blog"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "focus-ring"
                )}
              >
                All Posts
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    "bg-muted text-muted-foreground hover:bg-muted/80",
                    "focus-ring"
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-heading-2 text-foreground mb-4">
                No posts yet
              </h2>
              <p className="text-body text-muted-foreground">
                Check back soon for the latest insights and updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={cn(
                    "group rounded-2xl border border-border bg-card overflow-hidden",
                    "hover:shadow-lg transition-all duration-300",
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  )}
                >
                  {post.image && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Meta information */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                    </div>

                    {/* Title and Description */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="focus-ring rounded-sm"
                    >
                      <h2 className="text-heading-3 text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-body text-muted-foreground mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {post.author.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}