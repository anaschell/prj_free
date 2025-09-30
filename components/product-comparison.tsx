import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Wifi, Tv } from "lucide-react"

const products = [
  {
    name: "Freebox Pop",
    subtitle: "Fibre, Wi-Fi 6 & TV",
    price: "29",
    originalPrice: "39",
    image: "/white-modern-internet-router.jpg",
    features: [
      "Fibre jusqu'à 5 Gb/s partagés",
      "300 chaînes TV",
      "Récepteur Wi-Fi 6",
      "200 chaînes TV",
      "Appel TV OQEE inclus",
    ],
    popular: false,
  },
  {
    name: "Freebox Ultra Essentiel",
    subtitle: "Fibre ultra rapide, Wi-Fi 7 & TV",
    price: "39",
    originalPrice: "49",
    image: "/sleek-black-and-white-internet-router.jpg",
    features: [
      "Fibre jusqu'à 8 Gb/s",
      "Récepteur Wi-Fi 7",
      "Freebox Wi-Fi 7",
      "300 chaînes TV",
      "Appel TV OQEE inclus",
    ],
    popular: true,
  },
  {
    name: "Freebox Ultra",
    subtitle: "Fibre ultra rapide, Wi-Fi 7 & divertissement",
    price: "49",
    originalPrice: "59",
    image: "/premium-black-internet-router-with-lights.jpg",
    features: [
      "Fibre jusqu'à 8 Gb/s",
      "Récepteur Wi-Fi 7",
      "300 chaînes TV",
      "Netflix inclus",
      "Canal+ inclus",
      "Disney+ inclus",
      "Amazon Prime inclus",
    ],
    popular: false,
  },
]

export function ProductComparison() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-screen-xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Choisissez plus qu'une box internet,
            <br />
            choisissez une Freebox
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Wifi className="h-4 w-4" />
              Fibre
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Tv className="h-4 w-4" />
              Fibre & TV
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card
              key={index}
              className={`relative ${product.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""}`}
            >
              {product.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  L'offre star
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                <div className="mt-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-32 h-24 mx-auto object-contain"
                  />
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">{product.price}</span>
                    <span className="text-lg">€</span>
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </div>
                  <p className="text-sm text-muted-foreground">prix définitif, sans engagement</p>
                </div>

                <ul className="space-y-3">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button className="w-full" variant={product.popular ? "default" : "outline"}>
                  S'abonner
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
