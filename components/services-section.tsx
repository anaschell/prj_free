import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones, Wifi, Users, Shield } from "lucide-react"

const services = [
  {
    icon: Headphones,
    title: "Assistance 7j/7 par chat ou téléphone",
    description: "Notre équipe d'experts est disponible pour vous accompagner à tout moment.",
    image: "/customer-service-representative.png",
  },
  {
    icon: Wifi,
    title: "Découvrez nos Freebox Wi-Fi 7",
    description: "La technologie Wi-Fi la plus avancée pour une connexion ultra-rapide.",
    image: "/modern-wifi-router-with-signal-waves.jpg",
  },
]

const features = [
  {
    icon: Shield,
    title: "On est Free 7j/7 pour vous écouter",
    description: "Un conseiller au bout du fil avec notre service client disponible tous les jours.",
  },
  {
    icon: Users,
    title: "Nos boutiques sont à deux pas",
    description: "Plus de 300 boutiques dans toute la France pour vous accompagner.",
  },
  {
    icon: Wifi,
    title: "Numéro 1 sur la Fibre",
    description: "Le réseau fibre le plus performant de France avec une couverture nationale.",
  },
  {
    icon: Users,
    title: "On règle toute la Famille",
    description: "Des offres adaptées à tous les besoins, de l'individuel au familial.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container max-w-screen-xl px-4">
        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <service.icon className="h-8 w-8 mb-3" />
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <Button variant="secondary" size="sm">
                      {index === 0 ? "Découvrir Free Proxi" : "Découvrir les offres Freebox"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi Free ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">On avait 1000 raisons mais on en a choisi 4.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6">
                <img
                  src={`/.jpg?height=200&width=300&query=${feature.title.toLowerCase().replace(/\s+/g, "-")}-illustration`}
                  alt={feature.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              <feature.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <Button variant="link" className="mt-4 p-0 h-auto text-primary">
                {index === 0
                  ? "Contacter Free Proxi"
                  : index === 1
                    ? "Trouver une boutique"
                    : index === 2
                      ? "Tester votre éligibilité"
                      : "Découvrir mes Abonnements"}{" "}
                →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
