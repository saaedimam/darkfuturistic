"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function AnimatedVideoBackground() {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 })

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  // Generate multiple floating elements for dynamic background
  const floatingElements = React.useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      initialX: Math.random() * dimensions.width,
      initialY: Math.random() * dimensions.height,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  }, [isClient, dimensions])

  const meshGradient = {
    background: `
      radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(102, 187, 106, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(129, 199, 132, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 90% 70%, rgba(56, 142, 60, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 10% 90%, rgba(165, 214, 167, 0.15) 0%, transparent 50%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(15, 23, 42, 0.9) 100%)
    `,
  }

  return (
    <div className="absolute inset-0 overflow-hidden" style={meshGradient}>
      {/* Animated mesh grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(76, 175, 80, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76, 175, 80, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating geometric elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            background: `linear-gradient(135deg, rgba(76, 175, 80, 0.4), rgba(129, 199, 132, 0.2))`,
            filter: "blur(2px)",
          }}
          initial={{
            x: element.initialX,
            y: element.initialY,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [element.initialX, element.initialX + 200, element.initialX - 100, element.initialX],
            y: [element.initialY, element.initialY - 150, element.initialY + 100, element.initialY],
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.6, 0.3, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Flowing wave animations */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 50%, rgba(76, 175, 80, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(129, 199, 132, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 50%, rgba(165, 214, 167, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, rgba(76, 175, 80, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 50%, rgba(76, 175, 80, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Digital rain effect */}
      {isClient && (
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-px bg-gradient-to-b from-[#4CAF50] to-transparent"
              style={{
                left: `${(i * 2) % 100}%`,
                height: Math.random() * 200 + 100,
              }}
              animate={{
                y: [-100, dimensions.height + 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Pulsing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(76, 175, 80, 0.8) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(129, 199, 132, 0.6) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
