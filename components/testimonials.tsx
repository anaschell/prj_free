import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    rating: 5,
    text: "Très bonne connexion Internet, beaucoup de choix avec les chaînes télé et les offres Free téléphoniques à des prix compétitifs.",
    author: "Marie L.",
    service: "Freebox Pop",
  },
  {
    rating: 5,
    text: "Mise en place très rapide parfaite. Fibre et Wi-Fi fonctionnent parfaitement, excellent service client et grande qualité d'intervention de technicien.",
    author: "Jean-Pierre M.",
    service: "Freebox Ultra",
  },
  {
    rating: 5,
    text: "Tout est parfait, la souscription et l'abonnement en ligne, la qualité d'intervention du technicien, sans oublier parfaitement.",
    author: "Sophie D.",
    service: "Freebox Ultra Essentiel",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ensemble pour l'avis</h2>
          <p className="text-muted-foreground">Si ça dure entre nous c'est parce qu'on se dit TOUT.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">Voir tous les avis</Button>
        </div>
      </div>
    </section>
  )
}
