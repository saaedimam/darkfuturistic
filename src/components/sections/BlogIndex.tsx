'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import type { BlogPost } from '@/lib/blog'

export function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        // Fallback to mock data
        const { getBlogPosts } = await import('../../../lib/blog')
        const mockPosts = await getBlogPosts()
        setPosts(mockPosts)
        setFilteredPosts(mockPosts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: 'easeOut',
      },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Blog
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development, design, and technology.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedTag === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    {post.image && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <Button asChild variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm || selectedTag ? 'No posts found matching your criteria.' : 'No posts available.'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}