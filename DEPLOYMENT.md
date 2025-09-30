# Guide de Déploiement sur Vercel

## Configuration Requise

Pour que le chatbot IA fonctionne correctement sur Vercel, vous devez configurer la variable d'environnement suivante :

### 1. Obtenir une Clé API Groq (GRATUIT)

Groq offre une API gratuite avec un tier généreux pour les modèles LLaMA.

1. Créez un compte sur [console.groq.com](https://console.groq.com)
2. Allez dans la section "API Keys"
3. Cliquez sur "Create API Key"
4. Donnez un nom à votre clé (par exemple : "Free Chatbot")
5. Copiez la clé API (elle commence par `gsk_`)
   - **IMPORTANT** : Sauvegardez cette clé immédiatement, vous ne pourrez plus la voir après

### 2. Configurer la Variable d'Environnement sur Vercel

1. Allez sur votre projet Vercel
2. Cliquez sur "Settings" (Paramètres)
3. Allez dans "Environment Variables"
4. Ajoutez une nouvelle variable :
   - **Name (Nom)** : `GROQ_API_KEY`
   - **Value (Valeur)** : Votre clé API Groq (commence par `gsk_`)
   - **Environment** : Sélectionnez "Production", "Preview" et "Development"
5. Cliquez sur "Save"

### 3. Redéployer

Après avoir ajouté la variable d'environnement, vous devez redéployer votre application :

1. Allez dans l'onglet "Deployments"
2. Cliquez sur les trois points (...) du dernier déploiement
3. Sélectionnez "Redeploy"

## Vérification

Pour vérifier que tout fonctionne :

1. Ouvrez votre site déployé
2. Cliquez sur le bouton du chatbot en bas à droite
3. Posez une question sur Free (par exemple : "Comment résilier mon abonnement ?")
4. Vous devriez recevoir une réponse de l'IA

## Dépannage

Si le chatbot ne fonctionne pas :

1. **Vérifiez les logs Vercel** :
   - Allez dans "Deployments" > Cliquez sur votre déploiement > "Functions"
   - Cherchez les logs de `/api/chat-ai`
   - Vérifiez s'il y a des erreurs

2. **Erreur "GROQ_API_KEY not configured"** :
   - La variable d'environnement n'est pas configurée
   - Suivez les étapes ci-dessus pour l'ajouter

3. **Erreur "Groq API error: 401"** :
   - Votre clé API est invalide ou expirée
   - Générez une nouvelle clé sur console.groq.com

4. **Erreur "Groq API error: 429"** :
   - Vous avez dépassé votre quota gratuit
   - Attendez quelques minutes ou créez un nouveau compte

5. **Le chatbot transfère toujours vers un humain** :
   - L'API Groq fonctionne mais il y a peut-être un problème de quota
   - Vérifiez votre compte Groq pour voir les limites d'utilisation

## Coûts

**L'API Groq est GRATUITE** avec un tier généreux qui inclut :
- Jusqu'à 14,400 requêtes par jour
- Jusqu'à 30 requêtes par minute
- Modèle LLaMA 3.3 70B ultra-rapide

C'est parfait pour un chatbot de support client avec un trafic modéré.

Vous pouvez surveiller votre utilisation sur : https://console.groq.com/usage

## Support

Si vous rencontrez des problèmes, vérifiez :
- Les logs de la fonction dans Vercel
- Votre quota d'API Groq
- Que la variable d'environnement est bien configurée pour tous les environnements
