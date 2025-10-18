"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Minimize2, Maximize2, Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  videoUrl?: string
  thumbnail?: string
}

export function VideoModal({ isOpen, onClose, title, videoUrl, thumbnail }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Entra em fullscreen automaticamente quando o modal abre
      enterFullscreen()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )

      setIsFullscreen(isCurrentlyFullscreen)

      // Se saiu do fullscreen, fecha o modal
      if (!isCurrentlyFullscreen && isOpen) {
        onClose()
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [isOpen, onClose])

  const enterFullscreen = async () => {
    if (containerRef.current) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen()
        } else if ((containerRef.current as any).mozRequestFullScreen) {
          await (containerRef.current as any).mozRequestFullScreen()
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen()
        }
      } catch (error) {
        console.error("Erro ao entrar em fullscreen:", error)
      }
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (error) {
      console.error("Erro ao sair do fullscreen:", error)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  const handleClose = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      onClose()
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-none w-screen h-screen p-0 m-0 transition-all duration-300 bg-black border-none"
        hideCloseButton
      >
        <div ref={containerRef} className="relative w-full h-full bg-black">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              poster={thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl || "/placeholder-video.mp4"} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
              {/* Top controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleClose} className="text-white hover:bg-white/20">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-4 left-4 right-4">
                {/* Progress bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Control buttons and time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
