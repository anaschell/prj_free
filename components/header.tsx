import { Button } from "@/components/ui/button"

const PhoneIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
    />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/free-logo.png" alt="Free" className="h-8 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Freebox
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Téléphones & Forfaits
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Boutiques
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Bons Plans
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Assistance
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <PhoneIcon />
            Tester votre éligibilité
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <UserIcon />
            Carte prépayée
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <ShoppingCartIcon />
            Espace Abonné
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <MenuIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
