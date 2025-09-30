import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden py-20 md:py-32">
      <div className="container relative z-10 max-w-screen-xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Nouvelle Freebox disponible
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">
              Faites Pop'er votre
              <br />
              rentrée!
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0">
              À la vitesse de la Freebox Pop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                S'abonner
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Découvrir
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative mx-auto max-w-md">
              <div className="floating-element">
                <img src="/modern-white-internet-router-box-floating.jpg" alt="Freebox moderne" className="w-full h-auto" />
              </div>
              <div className="absolute -top-4 -right-4 bg-primary-foreground rounded-full p-4 shadow-lg">
                <Badge className="bg-primary text-primary-foreground text-lg font-bold px-4 py-2">
                  149€
                  <span className="text-sm font-normal ml-1">offerts</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-20 left-10 w-16 h-16 bg-primary-foreground/10 rounded-full floating-element"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-12 h-12 bg-primary-foreground/10 rounded-full floating-element"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-8 h-8 bg-primary-foreground/10 rounded-full floating-element"
        style={{ animationDelay: "3s" }}
      ></div>
    </section>
  )
}
