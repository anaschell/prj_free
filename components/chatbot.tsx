"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const XIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SendIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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

const BotIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

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

interface Message {
  id: string
  content: string
  sender: "user" | "bot" | "system"
  timestamp: Date
}

const knowledgeBase = {
  // Abonnement et compte client
  facture: [
    "Pour consulter votre facture, connectez-vous à votre Espace Abonné sur free.fr, section 'Mes factures'. Vous y trouverez toutes vos factures et votre suivi conso.",
    "Vos factures sont disponibles 24h/24 dans votre Espace Abonné. Cliquez sur 'Gérer mon compte' puis 'Mes factures' pour les consulter et télécharger.",
  ],

  "mot de passe": [
    "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion de votre Espace Abonné. Vous recevrez un email de réinitialisation.",
    "Rendez-vous sur free.fr, cliquez sur 'Se connecter' puis 'Mot de passe oublié'. Saisissez votre identifiant Free pour recevoir les instructions par email.",
  ],

  informations: [
    "Pour mettre à jour vos informations personnelles, connectez-vous à votre Espace Abonné, section 'Mes informations'. Vous pouvez modifier votre adresse, RIB et email.",
    "Dans votre Espace Abonné, allez dans 'Gérer mon compte' > 'Mes informations' pour modifier votre adresse, coordonnées bancaires ou email de contact.",
  ],

  résiliation: [
    "Pour résilier votre abonnement, envoyez une lettre recommandée avec AR à Free, Service Résiliation, 75371 Paris Cedex 08, en respectant le préavis de 10 jours.",
    "La résiliation se fait par courrier recommandé uniquement. Modèle de lettre disponible dans votre Espace Abonné, section 'Résilier mon abonnement'.",
  ],

  // Facturation et paiements
  "facture élevée": [
    "Une facture plus élevée peut être due à des communications hors forfait, options ajoutées, ou frais de mise en service. Vérifiez le détail dans votre Espace Abonné.",
    "Consultez le détail de votre facture dans votre Espace Abonné pour identifier les éventuels hors forfait, options supplémentaires ou frais exceptionnels.",
  ],

  "paiement retard": [
    "Pour payer une facture en retard, connectez-vous à votre Espace Abonné, section 'Mes factures', et cliquez sur 'Payer maintenant' sur la facture concernée.",
    "Réglez votre facture impayée directement en ligne via votre Espace Abonné ou par téléphone au 3244. Des frais de relance peuvent s'appliquer.",
  ],

  prélèvement: [
    "Pour activer le prélèvement automatique, allez dans votre Espace Abonné > 'Mes factures' > 'Gérer mes moyens de paiement' et ajoutez votre RIB.",
    "Le prélèvement automatique se configure dans votre Espace Abonné. Vous pouvez l'activer, le désactiver ou modifier votre RIB à tout moment.",
  ],

  // Internet fixe (box)
  "box connexion": [
    "Si votre box ne se connecte pas, vérifiez les branchements, redémarrez-la en la débranchant 30 secondes, et vérifiez l'état des voyants selon le guide fourni.",
    "Problème de connexion : vérifiez que tous les câbles sont bien branchés, redémarrez votre Freebox, et consultez l'état du réseau sur free.fr/assistance.",
  ],

  redémarrer: [
    "Pour redémarrer votre box, débranchez l'alimentation 30 secondes puis rebranchez. Pour une réinitialisation complète, maintenez le bouton reset 10 secondes.",
    "Redémarrage simple : débranchez 30 secondes. Réinitialisation d'usine : bouton reset maintenu 10 secondes (attention, cela efface vos paramètres).",
  ],

  "mot de passe wifi": [
    "Pour changer le mot de passe WiFi, connectez-vous à l'interface de votre Freebox (mafreebox.freebox.fr), allez dans 'WiFi' > 'Réseau sans fil' > 'Sécurité'.",
    "Modifiez votre mot de passe WiFi via l'interface Freebox : mafreebox.freebox.fr > WiFi > Configuration > Sécurité. Choisissez un mot de passe fort.",
  ],

  "contrôle parental": [
    "Le contrôle parental se configure dans l'interface Freebox : mafreebox.freebox.fr > 'Contrôle parental'. Vous pouvez filtrer par horaires et contenus.",
    "Activez le contrôle parental via mafreebox.freebox.fr, section dédiée. Définissez des plages horaires et filtres de contenu pour chaque appareil.",
  ],

  déménagement: [
    "Suivez votre déménagement dans votre Espace Abonné, section 'Mes services' > 'Déménager'. Vous y trouverez l'avancement de votre dossier et les étapes.",
    "L'avancement de votre déménagement ou raccordement fibre est visible dans votre Espace Abonné. Vous recevrez aussi des SMS d'information.",
  ],

  // Mobile
  "activer sim": [
    "Pour activer votre carte SIM, insérez-la dans votre téléphone et composez le 555 depuis votre mobile Free, ou activez-la dans votre Espace Abonné.",
    "Activation SIM : appelez le 555 depuis votre mobile Free ou connectez-vous à votre Espace Abonné > 'Mes services' > 'Activer ma carte SIM'.",
  ],

  "code puk": [
    "Votre code PUK est disponible dans votre Espace Abonné, section 'Mes services' > 'Ma ligne mobile'. Vous pouvez aussi appeler le 3244.",
    "Code PUK bloqué ? Récupérez-le dans votre Espace Abonné ou appelez le service client au 3244. Ne tentez pas de codes au hasard.",
  ],

  roaming: [
    "Pour gérer le roaming, allez dans votre Espace Abonné > 'Mes services' > 'Ma ligne mobile' > 'Mes options'. Vous pouvez l'activer/désactiver selon vos besoins.",
    "Le roaming (données à l'étranger) se gère dans votre Espace Abonné, section mobile. Attention aux frais hors Europe selon votre forfait.",
  ],

  "transférer contacts": [
    "Pour transférer vos contacts, utilisez la sauvegarde cloud de votre téléphone (iCloud, Google) ou l'application de transfert du constructeur.",
    "Sauvegardez vos contacts via votre compte Google/Apple avant de changer de SIM, ou utilisez les outils de transfert intégrés à votre téléphone.",
  ],

  "téléphone volé": [
    "En cas de vol/perte, suspendez immédiatement votre ligne dans votre Espace Abonné > 'Mes services' > 'Suspendre ma ligne' ou appelez le 3244.",
    "Téléphone perdu/volé : suspendez votre ligne via l'Espace Abonné ou le 3244, puis déposez plainte. Vous pourrez commander une nouvelle SIM.",
  ],

  // Pannes et assistance technique
  "wifi lent": [
    "WiFi lent ? Vérifiez votre position par rapport à la box, redémarrez-la, utilisez la bande 5GHz si disponible, et testez votre débit sur free.fr.",
    "Pour améliorer votre WiFi : rapprochez-vous de la box, évitez les obstacles, utilisez le WiFi 5GHz, et vérifiez qu'aucun appareil ne sature la bande passante.",
  ],

  "tester connexion": [
    "Testez votre connexion sur free.fr/assistance > 'Test de débit'. Ce test mesure votre débit réel et vous indique si votre ligne fonctionne normalement.",
    "Le test de débit Free (free.fr/assistance) vous donne votre vitesse réelle de connexion. Effectuez le test câblé pour plus de précision.",
  ],

  "pas de tonalité": [
    "Pas de tonalité sur le fixe ? Vérifiez le branchement du téléphone, testez avec un autre appareil, et redémarrez votre Freebox.",
    "Problème de tonalité : vérifiez les connexions, testez votre téléphone sur une autre prise, et consultez l'état de votre ligne dans l'Espace Abonné.",
  ],

  "tv chaînes": [
    "Plus de chaînes TV ? Vérifiez les branchements HDMI/péritel, redémarrez le Player, et relancez la recherche de chaînes dans les paramètres.",
    "Problème de réception TV : vérifiez les câbles, redémarrez le Player Freebox, et effectuez une recherche automatique des chaînes.",
  ],

  "panne générale": [
    "Vérifiez les pannes générales sur free.fr/assistance > 'État du réseau' ou sur les réseaux sociaux @free_1337. Vous pouvez aussi appeler le 3244.",
    "Pour vérifier une panne dans votre zone, consultez l'état du réseau sur free.fr ou suivez @free_1337 sur Twitter pour les informations en temps réel.",
  ],

  // Livraison et matériel
  "livraison box": [
    "Suivez votre livraison dans votre Espace Abonné > 'Mes commandes'. Vous recevrez un SMS avec le numéro de suivi transporteur.",
    "L'état de livraison de votre box/SIM est visible dans votre Espace Abonné. Un email de confirmation avec suivi vous sera envoyé à l'expédition.",
  ],

  "retourner matériel": [
    "Pour retourner votre ancien matériel, utilisez l'étiquette prépayée fournie ou téléchargeable dans votre Espace Abonné > 'Retourner mon matériel'.",
    "Le retour de matériel se fait avec l'étiquette prépayée Free. Vous avez 1 mois après résiliation pour retourner votre Freebox.",
  ],

  "box défectueuse": [
    "Box défectueuse ? Contactez le service technique au 3244 pour diagnostic. Si confirmé, un échange gratuit sera organisé sous 48h.",
    "En cas de dysfonctionnement de votre box, appelez le 3244 pour un diagnostic. L'échange est gratuit si le défaut est confirmé.",
  ],

  // Offres et options
  "offres actuelles": [
    "Nos offres actuelles : Freebox Révolution Light (19,99€/mois), Freebox Pop (29,99€/mois), Freebox Ultra (39,99€/mois). Détails sur free.fr.",
    "Découvrez nos offres sur free.fr : Freebox Révolution Light, Pop et Ultra. Forfaits mobile de 2€ à 19,99€/mois selon vos besoins.",
  ],

  "ajouter option": [
    "Pour ajouter/retirer une option (Netflix, Canal+, etc.), allez dans votre Espace Abonné > 'Mes services' > 'Mes options TV' ou 'Mes options mobiles'.",
    "Gérez vos options dans votre Espace Abonné, section 'Mes services'. Vous pouvez ajouter/supprimer Netflix, Canal+, Deezer à tout moment.",
  ],

  "augmenter forfait": [
    "Pour augmenter votre forfait data, connectez-vous à votre Espace Abonné > 'Mes services' > 'Ma ligne mobile' > 'Changer de forfait'.",
    "Changement de forfait mobile possible dans votre Espace Abonné. L'augmentation est immédiate, la diminution prend effet au cycle suivant.",
  ],

  "partager data": [
    "Le partage de data se fait via le partage de connexion de votre téléphone (hotspot WiFi) ou avec une option multi-SIM selon votre forfait.",
    "Partagez votre forfait via le hotspot de votre mobile ou souscrivez à l'option multi-SIM pour utiliser votre forfait sur plusieurs appareils.",
  ],
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHumanMode, setIsHumanMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Bonjour ! Je suis l'Assistant IA de Free. Je peux répondre à vos questions sur nos services en cherchant des informations sur notre site d'assistance. Si je ne trouve pas de réponse, je vous mettrai en relation avec un conseiller humain.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getKnowledgeResponse = (message: string): string | null => {
    const lowerMessage = message.toLowerCase()

    for (const [topic, responses] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(topic)) {
        const randomIndex = Math.floor(Math.random() * responses.length)
        return responses[randomIndex]
      }
    }

    // Check for broader keyword matches
    if (
      lowerMessage.includes("facture") ||
      lowerMessage.includes("consulter") ||
      lowerMessage.includes("télécharger")
    ) {
      const responses = knowledgeBase["facture"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("wifi") || lowerMessage.includes("wi-fi") || lowerMessage.includes("sans fil")) {
      const responses = knowledgeBase["wifi lent"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("box") && (lowerMessage.includes("connexion") || lowerMessage.includes("internet"))) {
      const responses = knowledgeBase["box connexion"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("sim") && lowerMessage.includes("activer")) {
      const responses = knowledgeBase["activer sim"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("puk")) {
      const responses = knowledgeBase["code puk"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerMessage.includes("offre") || lowerMessage.includes("prix") || lowerMessage.includes("tarif")) {
      const responses = knowledgeBase["offres actuelles"]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    return null
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")

    if (isHumanMode) {
      return
    }

    setIsTyping(true)

    try {
      const response = await fetch("/api/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()
      const aiResponse = data.response

      setIsTyping(false)

      // Check if AI wants to transfer to human
      if (aiResponse === "TRANSFER_TO_HUMAN") {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Je n'ai pas trouvé de réponse précise à votre question dans notre base de connaissances. Je vous mets en relation avec un conseiller humain qui pourra mieux vous aider.",
          sender: "system",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])

        setTimeout(() => {
          const transferMessage: Message = {
            id: (Date.now() + 2).toString(),
            content:
              "📞 Vous êtes maintenant connecté avec un conseiller humain. Vous pouvez continuer à écrire vos messages.",
            sender: "system",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, transferMessage])
          setIsHumanMode(true)
        }, 1500)
      } else {
        // AI found an answer
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      }
    } catch (error) {
      console.error("Error calling AI:", error)
      setIsTyping(false)

      // On error, transfer to human
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, je rencontre un problème technique. Je vous mets en relation avec un conseiller humain.",
        sender: "system",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorResponse])

      setTimeout(() => {
        const transferMessage: Message = {
          id: (Date.now() + 2).toString(),
          content:
            "📞 Vous êtes maintenant connecté avec un conseiller humain. Vous pouvez continuer à écrire vos messages.",
          sender: "system",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, transferMessage])
        setIsHumanMode(true)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-red-800"
          size="icon"
        >
          {isOpen ? <XIcon /> : <BotIcon />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white overflow-hidden">
            {/* Header with title */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-400 to-sky-500 text-white border-b-2 border-sky-600 flex-shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                {isHumanMode ? <PhoneIcon /> : <BotIcon />}
                <span className="font-bold text-xl tracking-wide">
                  {isHumanMode ? "CONSEILLER HUMAIN" : "ASSISTANT IA"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <XIcon />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="text-xs font-semibold mb-1 px-1">
                        {message.sender === "user" && <span className="text-coral-600">Vous</span>}
                        {message.sender === "bot" && <span className="text-sky-600">Assistant IA</span>}
                        {message.sender === "system" && <span className="text-amber-600">Système</span>}
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 break-words shadow-md ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-coral-500 to-coral-600 text-white"
                            : message.sender === "system"
                              ? "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900 border-2 border-amber-300"
                              : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-2 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {message.sender === "bot" && (
                              <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                                <BotIcon />
                              </div>
                            )}
                            {message.sender === "user" && (
                              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                <UserIcon />
                              </div>
                            )}
                            {message.sender === "system" && (
                              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                                <PhoneIcon />
                              </div>
                            )}
                          </div>

                          <p className="text-sm leading-relaxed break-words overflow-wrap-anywhere flex-1">
                            {message.content}
                          </p>
                        </div>

                        <div
                          className={`text-xs mt-2 ${
                            message.sender === "user"
                              ? "text-white/70 text-right"
                              : message.sender === "system"
                                ? "text-amber-700/70 text-right"
                                : "text-gray-500 text-right"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="text-xs font-semibold mb-1 px-1 text-sky-600">Assistant IA</div>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 max-w-[85%] border-2 border-gray-200 shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                            <BotIcon />
                          </div>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </div>

            <div className="p-4 border-t flex-shrink-0 bg-gray-50">
              {isHumanMode ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Écrivez votre message au conseiller..."
                      className="flex-1 border-gray-300 focus:border-coral-500 focus:ring-coral-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-red-700 font-semibold"
                      size="default"
                    >
                      <SendIcon />
                      <span className="ml-2">Envoyer</span>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Connecté avec un conseiller humain • Cliquez sur le bouton pour envoyer
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1 border-gray-300 focus:border-coral-500 focus:ring-coral-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-red-700 font-semibold"
                    size="default"
                  >
                    <SendIcon />
                    <span className="ml-2">Envoyer</span>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
