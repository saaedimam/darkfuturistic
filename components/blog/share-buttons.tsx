'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButtons({ url, title, description, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        // User cancelled sharing or sharing failed
        console.log('Sharing cancelled or failed')
      }
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Native sharing (mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="focus-ring"
          aria-label="Share this post"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}

      {/* Twitter */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="focus-ring"
      >
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      {/* LinkedIn */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="focus-ring"
      >
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      {/* Copy Link */}
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="focus-ring"
        aria-label={copied ? "URL copied!" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}