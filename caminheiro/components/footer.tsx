import { Music, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-card-foreground">Grupo de Jovens</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Conectando jovens através da música e da palavra. Um espaço para crescer, aprender e adorar juntos.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#letras" className="text-muted-foreground hover:text-foreground transition-colors">
                  Letras de Músicas
                </a>
              </li>
              <li>
                <a href="#musicas" className="text-muted-foreground hover:text-foreground transition-colors">
                  Biblioteca Musical
                </a>
              </li>
              <li>
                <a href="#videos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Vídeos Educativos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Contato</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: grupo@jovens.com</p>
              <p>WhatsApp: (11) 99999-9999</p>
              <p>Reuniões: Domingos às 18h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>para o Grupo de Jovens</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
