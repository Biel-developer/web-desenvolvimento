import { Button } from "@/components/ui/button"
import { Music, Video, FileText } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full mb-12">
          <Image
            src="/caminheiros-banner.png"
            alt="Centro Espírita Caminheiros - 57 Anos"
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg shadow-2xl"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Letras</h3>
            <p className="text-muted-foreground">Acesse todas as letras organizadas por categoria e tema</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Music className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Músicas</h3>
            <p className="text-muted-foreground">Biblioteca completa de áudios para acompanhar as letras</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Video className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Vídeos</h3>
            <p className="text-muted-foreground">Vídeos educativos e de apoio para suas apresentações</p>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="mr-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
          >
            Explorar Conteúdo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 bg-transparent"
          >
            Sobre o Grupo
          </Button>
        </div>
      </div>
    </section>
  )
}
