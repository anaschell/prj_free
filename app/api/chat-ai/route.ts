export const maxDuration = 30

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    console.error("[v0] GROQ_API_KEY is not configured")
    return Response.json(
      {
        response: "Le service IA n'est pas configuré. Veuillez contacter le support.",
        error: "GROQ_API_KEY not configured",
      },
      { status: 500 },
    )
  }

  console.log("[v0] Received message:", message)

  try {
    console.log("[v0] Calling Groq API...")

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Tu es un assistant virtuel pour Free, l'opérateur télécom français. 
      
Ton rôle est d'aider les clients avec leurs questions sur les services Free (internet, mobile, box, etc.).

IMPORTANT: Tu dois UNIQUEMENT répondre aux questions concernant Free et ses services. Si la question n'est PAS liée à Free, aux télécommunications, à internet, au mobile, ou aux services Free, tu dois répondre EXACTEMENT: "TRANSFER_TO_HUMAN"

Voici les informations que tu peux utiliser pour répondre (basées sur https://assistance.free.fr):

ABONNEMENT ET COMPTE:
- Factures: Consultables dans l'Espace Abonné sur free.fr, section "Mes factures"
- Mot de passe oublié: Cliquer sur "Mot de passe oublié" sur la page de connexion
- Modifier informations: Espace Abonné > "Mes informations"
- Résiliation: Lettre recommandée avec AR à Free, Service Résiliation, 75371 Paris Cedex 08

INTERNET ET BOX:
- Problème de connexion: Vérifier branchements, redémarrer la box (débrancher 30 secondes)
- WiFi lent: Se rapprocher de la box, utiliser la bande 5GHz, redémarrer
- Mot de passe WiFi: Interface Freebox (mafreebox.freebox.fr) > WiFi > Sécurité
- Test de débit: Disponible sur free.fr/assistance

MOBILE:
- Activer SIM: Appeler le 555 depuis le mobile Free ou via l'Espace Abonné
- Code PUK: Disponible dans l'Espace Abonné > "Ma ligne mobile"
- Téléphone volé: Suspendre la ligne via l'Espace Abonné ou appeler le 3244

OFFRES:
- Freebox Révolution Light: 19,99€/mois
- Freebox Pop: 29,99€/mois  
- Freebox Ultra: 39,99€/mois
- Forfaits mobile: de 2€ à 19,99€/mois

Si tu ne trouves PAS d'information pertinente pour répondre à la question du client, réponds EXACTEMENT: "TRANSFER_TO_HUMAN"

Réponds de manière claire, concise et professionnelle en français. Si la question n'est pas liée à Free ou si tu n'as pas l'information, réponds uniquement "TRANSFER_TO_HUMAN".`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    console.log("[v0] Groq API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Groq API error:", response.status, errorText)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || "TRANSFER_TO_HUMAN"

    console.log("[v0] AI response generated successfully")

    return Response.json({ response: aiResponse })
  } catch (error) {
    console.error("[v0] Error generating AI response:", error)
    return Response.json({ response: "TRANSFER_TO_HUMAN" }, { status: 500 })
  }
}
