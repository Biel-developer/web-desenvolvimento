"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, List } from "lucide-react"

interface KaraokeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  lyrics: string
  customSpeed?: number // Adicionado parâmetro para velocidade personalizada
}

interface Section {
  name: string
  lines: string[]
  type: "verso" | "refrão" | "ponte" | "intro" | "outro"
}

const SONG_TIMINGS: Record<string, { lineTime: number; sectionPause: number }> = {
  "Como Zaqueu": { lineTime: 2.5, sectionPause: 1.0 }, // Música mais lenta
  "Rude Cruz": { lineTime: 3.0, sectionPause: 1.5 }, // Música contemplativa
  "Quão Grande És Tu": { lineTime: 2.8, sectionPause: 1.2 }, // Ritmo médio
  "Quão Grande é o Meu Deus": { lineTime: 3.0, sectionPause: 1.2 },
  "Reckless Love": { lineTime: 2.5, sectionPause: 1.0 },
  Oceanos: { lineTime: 4.0, sectionPause: 1.5 },
}

export function KaraokeModal({ isOpen, onClose, title, lyrics, customSpeed }: KaraokeModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [showStructure, setShowStructure] = useState(false)
  const [useStructuredMode, setUseStructuredMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const songTiming = customSpeed
    ? { lineTime: customSpeed, sectionPause: 1.0 }
    : SONG_TIMINGS[title] || { lineTime: 2.5, sectionPause: 1.0 }

  const [sections, setSections] = useState<Section[]>([])
  const [songStructure, setSongStructure] = useState<number[]>([]) // índices das seções na ordem
  const [allLines, setAllLines] = useState<string[]>([])

  useEffect(() => {
    const lines = lyrics.split("\n").filter((line) => line.trim() !== "")
    setAllLines(lines)

    // Tentar detectar seções automaticamente
    const detectedSections: Section[] = []
    const structure: number[] = []

    if (lines.length > 0) {
      // Dividir em seções básicas (isso pode ser melhorado com IA ou input manual)
      const midPoint = Math.floor(lines.length / 2)

      detectedSections.push({
        name: "Verso 1",
        lines: lines.slice(0, midPoint),
        type: "verso",
      })

      detectedSections.push({
        name: "Refrão",
        lines: lines.slice(midPoint),
        type: "refrão",
      })

      // Estrutura padrão: Verso 1 -> Refrão -> Verso 1 -> Refrão
      structure.push(0, 1, 0, 1)
    }

    setSections(detectedSections)
    setSongStructure(structure)
  }, [lyrics])

  const getStructuredLines = () => {
    if (!useStructuredMode || sections.length === 0) {
      return allLines
    }

    const structuredLines: string[] = []
    songStructure.forEach((sectionIndex) => {
      if (sections[sectionIndex]) {
        structuredLines.push(`[${sections[sectionIndex].name}]`)
        structuredLines.push(...sections[sectionIndex].lines)
        structuredLines.push("") // linha vazia entre seções
      }
    })
    return structuredLines.filter((line) => line !== "")
  }

  const displayLines = getStructuredLines()

  const togglePlayback = () => {
    if (isPlaying) {
      // Pausar
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Iniciar
      setIsPlaying(true)
      intervalRef.current = setInterval(() => {
        setCurrentLineIndex((prev) => {
          if (prev >= displayLines.length - 1) {
            // Chegou ao fim, parar
            setIsPlaying(false)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            return prev
          }
          return prev + 1
        })
      }, songTiming.lineTime * 1000) // Usar timing fixo da música
    }
  }

  // Função para resetar
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPlaying(false)
    setCurrentLineIndex(0)
    setCurrentSectionIndex(0)
  }

  // Limpar interval quando o componente for desmontado ou modal fechado
  useEffect(() => {
    if (!isOpen) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsPlaying(false)
      setCurrentLineIndex(0)
      setCurrentSectionIndex(0)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentLineIndex((prev) => {
          if (prev >= displayLines.length - 1) {
            setIsPlaying(false)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            return prev
          }
          return prev + 1
        })
      }, songTiming.lineTime * 1000) // Usar timing fixo
    }
  }, [isPlaying, displayLines.length, songTiming.lineTime])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>{title} - Modo Karaoke</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowStructure(!showStructure)}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="bg-muted/50 p-3 rounded-lg mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ritmo: {songTiming.lineTime}s por linha</span>
            <span className="text-primary font-medium">
              {customSpeed ? "Velocidade personalizada" : "Sincronizado com o ritmo original"}
            </span>
          </div>
        </div>

        {showStructure && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Estrutura da Música</h3>
              <Button
                variant={useStructuredMode ? "default" : "outline"}
                size="sm"
                onClick={() => setUseStructuredMode(!useStructuredMode)}
              >
                {useStructuredMode ? "Modo Estruturado" : "Modo Simples"}
              </Button>
            </div>

            {useStructuredMode && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Sequência:{" "}
                  {songStructure.map((sectionIndex, i) => (
                    <span key={i} className="inline-block bg-primary/20 px-2 py-1 rounded mr-1 mb-1">
                      {sections[sectionIndex]?.name || `Seção ${sectionIndex + 1}`}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {sections.map((section, index) => (
                    <div key={index} className="bg-background p-2 rounded border">
                      <div className="font-medium text-primary">{section.name}</div>
                      <div className="text-muted-foreground">{section.lines.length} linhas</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controles */}
        <div className="flex items-center justify-center space-x-4 py-4 border-b">
          <Button onClick={togglePlayback} size="lg">
            {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isPlaying ? "Pausar" : "Iniciar"}
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reiniciar
          </Button>
        </div>

        {/* Progresso */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>
            Linha {currentLineIndex + 1} de {displayLines.length}
          </span>
          <span>{Math.round((currentLineIndex / displayLines.length) * 100)}% concluído</span>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted/20 rounded-lg p-6">
          <div className="space-y-3">
            {displayLines.map((line, index) => {
              const isSection = line.startsWith("[") && line.endsWith("]")
              return (
                <div
                  key={index}
                  className={`leading-relaxed transition-all duration-500 p-3 rounded-lg ${
                    isSection
                      ? "bg-secondary text-secondary-foreground font-bold text-center text-lg border-2 border-primary/30"
                      : index === currentLineIndex
                        ? "bg-primary text-primary-foreground font-semibold text-xl scale-105 shadow-lg"
                        : index < currentLineIndex
                          ? "text-muted-foreground opacity-60"
                          : "text-foreground text-lg"
                  }`}
                >
                  {line || "\u00A0"} {/* \u00A0 é um espaço não-quebrável para linhas vazias */}
                </div>
              )
            })}
          </div>
        </div>

        {/* Indicador visual de progresso */}
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentLineIndex / displayLines.length) * 100}%` }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
