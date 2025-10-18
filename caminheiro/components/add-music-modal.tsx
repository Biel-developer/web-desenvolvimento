"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Music } from "lucide-react"

interface AddMusicModalProps {
  onAddMusic: (music: any) => void
}

export function AddMusicModal({ onAddMusic }: AddMusicModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    duration: "",
    fullLyrics: "",
    tags: [] as string[],
    karaokeSpeed: 3, // segundos por linha
  })
  const [newTag, setNewTag] = useState("")

  const categories = ["Louvor", "Adoração", "Contemporâneo", "Clássico", "Gospel", "Infantil"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.fullLyrics) {
      alert("Título e letra são obrigatórios!")
      return
    }

    const newMusic = {
      id: Date.now(), // ID temporário
      title: formData.title,
      artist: formData.artist || "Desconhecido",
      category: formData.category || "Geral",
      duration: formData.duration || "0:00",
      preview: formData.fullLyrics.split("\n")[0].substring(0, 50) + "...",
      tags: formData.tags,
      fullLyrics: formData.fullLyrics,
      karaokeSpeed: formData.karaokeSpeed,
    }

    onAddMusic(newMusic)

    // Reset form
    setFormData({
      title: "",
      artist: "",
      category: "",
      duration: "",
      fullLyrics: "",
      tags: [],
      karaokeSpeed: 3,
    })
    setNewTag("")
    setIsOpen(false)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Música
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Adicionar Nova Música
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Nome da música"
                required
              />
            </div>
            <div>
              <Label htmlFor="artist">Artista</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => setFormData((prev) => ({ ...prev, artist: e.target.value }))}
                placeholder="Nome do artista"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="Ex: 4:32"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicionar tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Configuração do Karaoke */}
          <div>
            <Label htmlFor="karaokeSpeed">Velocidade do Karaoke (segundos por linha)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Input
                id="karaokeSpeed"
                type="number"
                min="1"
                max="10"
                step="0.5"
                value={formData.karaokeSpeed}
                onChange={(e) => setFormData((prev) => ({ ...prev, karaokeSpeed: Number.parseFloat(e.target.value) }))}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">
                {formData.karaokeSpeed}s por linha (ajuste conforme o ritmo da música)
              </span>
            </div>
          </div>

          {/* Letra Completa */}
          <div>
            <Label htmlFor="lyrics">Letra Completa *</Label>
            <Textarea
              id="lyrics"
              value={formData.fullLyrics}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullLyrics: e.target.value }))}
              placeholder="Cole aqui a letra completa da música..."
              className="min-h-[200px] font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Dica: Separe versos com linha em branco para melhor formatação
            </p>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Música</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
