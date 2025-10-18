"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, FileText, Music, Video, Heart, Share2, Mic } from "lucide-react"
import { KaraokeModal } from "./karaoke-modal"
import { AddMusicModal } from "./add-music-modal"
import { VideoModal } from "./video-modal"

// Dados de exemplo - você pode substituir por dados reais
const initialContentData = {
  letras: [
    {
      id: 1,
      title: "Tim Vanessa aos pés do Monte",
      category: "Louvor",
      preview: "Um sentimento me ronda, não sei dizer...",
      tags: ["Adoração", "Esperança"],
      fullLyrics: `Um sentimento me ronda
Não sei dizer, tudo é novo pra mim
Meu coração se renova
Sinto a esperança invadir o meu ser
Quero ser manso
Ser limpo
Ser justo
E pobre de espírito ser
Tua palavra me sonda
Me conta do Reino que espera por mim
Eu te ofereço meu pranto
As dores da alma que quer renascer
Eu ouvi tua voz
Teu falar me encantou
Quis seguir, caminhar
Quis saber pra onde vou
Eis-me aqui, minha dor serenou
Um sentimento me ronda
Não sei dizer, tudo é novo pra mim
Meu coração se renova
Sinto a esperança invadir o meu ser
Quero ser manso
Ser limpo
Ser justo
E pobre de espírito ser
Tua palavra me sonda
Me conta do Reino que espera por mim
Eu te ofereço meu pranto
As dores da alma que quer renascer
Eu ouvi tua voz
Teu falar me encantou
Quis seguir, caminhar
Quis saber pra onde vou
Eis-me aqui, minha dor serenou
Eu ouvi tua voz
Teu falar me encantou
Quis seguir, caminhar
Quis saber pra onde vou
Eis-me aqui, minha dor serenou`,
      karaokeSpeed: 3,
    },
    {
      id: 2,
      title: "Pedro",
      category: "Louvor",
      preview: "Vem que eu te farei um pescador de homens...",
      tags: ["Fé", "Vocação"],
      fullLyrics: `Vem que eu te farei um pescador de homens
Se perseverares serás Cefas, Pedra
E onde a agonia do vazio medra
Frutificarás a mitigar a fome

Quero ir contigo mas receio as águas
Temo afundar enquanto vais andando
Se no Horto já pressentes tuas chagas
Eu, Tiago e João ao chão, em sono

Como não bastasse, eis-me a ferir
Um soldado que te traz voz de prisão
Sou pequena ovelha, atemorizada
Balindo negação

Volvo à vida e tomo pela tua mão
Crê, te levarei aonde não queiras ir

Pedro, tu me amas?
Pedro, tu me amas?
Pedro, tu me amas?`,
      karaokeSpeed: 3.5,
    },
  ],
  musicas: [
    {
      id: 1,
      title: "Tim Vanessa aos pés do Monte",
      artist: "Artista",
      duration: "4:32",
      category: "Louvor",
    },
    {
      id: 2,
      title: "Pedro",
      artist: "Artista",
      duration: "3:45",
      category: "Louvor",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Como Liderar um Louvor",
      duration: "12:45",
      category: "Tutorial",
      thumbnail: "/music-tutorial.jpg",
    },
    {
      id: 2,
      title: "História dos Hinos",
      duration: "18:30",
      category: "Educativo",
      thumbnail: "/church-history-timeline.png",
    },
    {
      id: 3,
      title: "Técnicas de Canto",
      duration: "15:22",
      category: "Treinamento",
      thumbnail: "/singing-techniques.jpg",
    },
  ],
}

export function ContentGrid() {
  const [activeTab, setActiveTab] = useState<"letras" | "musicas" | "videos">("letras")
  const [contentData, setContentData] = useState(initialContentData)
  const [karaokeModal, setKaraokeModal] = useState<{
    isOpen: boolean
    title: string
    lyrics: string
  }>({
    isOpen: false,
    title: "",
    lyrics: "",
  })

  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean
    title: string
    videoUrl?: string
    thumbnail?: string
  }>({
    isOpen: false,
    title: "",
    videoUrl: "",
    thumbnail: "",
  })

  const tabs = [
    { id: "letras", label: "Letras", icon: FileText },
    { id: "musicas", label: "Músicas", icon: Music },
    { id: "videos", label: "Vídeos", icon: Video },
  ]

  const openKaraoke = (title: string, lyrics: string) => {
    setKaraokeModal({
      isOpen: true,
      title,
      lyrics,
    })
  }

  const closeKaraoke = () => {
    setKaraokeModal({
      isOpen: false,
      title: "",
      lyrics: "",
    })
  }

  const handleAddMusic = (newMusic: any) => {
    setContentData((prev) => ({
      ...prev,
      letras: [...prev.letras, newMusic],
      musicas: [
        ...prev.musicas,
        {
          id: newMusic.id,
          title: newMusic.title,
          artist: newMusic.artist,
          duration: newMusic.duration,
          category: newMusic.category,
        },
      ],
    }))
  }

  const openVideo = (title: string, videoUrl?: string, thumbnail?: string) => {
    setVideoModal({
      isOpen: true,
      title,
      videoUrl,
      thumbnail,
    })
  }

  const closeVideo = () => {
    setVideoModal({
      isOpen: false,
      title: "",
      videoUrl: "",
      thumbnail: "",
    })
  }

  return (
    <>
      <section id="content" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore o Conteúdo</h2>
            <p className="text-lg text-muted-foreground">Navegue pela nossa biblioteca organizada de recursos</p>
          </div>

          <div className="flex justify-center">
            <AddMusicModal onAddMusic={handleAddMusic} />
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-card border border-border rounded-lg p-1 inline-flex">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center space-x-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "letras" &&
              contentData.letras.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">{item.preview}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-2" />
                              Ver Letra
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold">{item.title}</DialogTitle>
                              <Badge variant="secondary" className="w-fit">
                                {item.category}
                              </Badge>
                            </DialogHeader>
                            <div className="mt-4">
                              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                                {item.fullLyrics}
                              </pre>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-6">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" onClick={() => openKaraoke(item.title, item.fullLyrics)}>
                          <Mic className="w-4 h-4 mr-2" />
                          Cantar
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {activeTab === "musicas" &&
              contentData.musicas.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Reproduzir
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {activeTab === "videos" &&
              contentData.videos.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-t-lg">
                      <Button
                        size="lg"
                        className="rounded-full"
                        onClick={() => openVideo(item.title, undefined, item.thumbnail)}
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Button size="sm" onClick={() => openVideo(item.title, undefined, item.thumbnail)}>
                        <Video className="w-4 h-4 mr-2" />
                        Assistir
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Existing modals */}
      <KaraokeModal
        isOpen={karaokeModal.isOpen}
        onClose={closeKaraoke}
        title={karaokeModal.title}
        lyrics={karaokeModal.lyrics}
        customSpeed={contentData.letras.find((song) => song.title === karaokeModal.title)?.karaokeSpeed}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={closeVideo}
        title={videoModal.title}
        videoUrl={videoModal.videoUrl}
        thumbnail={videoModal.thumbnail}
      />
    </>
  )
}
