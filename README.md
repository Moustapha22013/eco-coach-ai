# Eco-Assistant IA

Assistant IA expert pour réduire l'empreinte carbone numérique de vos projets web. Analysez votre stack technique et obtenez des recommandations personnalisées pour améliorer votre éco-score.

## 🚀 Getting Started

### Prérequis

- **Node.js 20.9.0 ou supérieur** (requis pour Next.js 16)
  - Vérifiez votre version : `node --version`
  - Si vous avez une version antérieure, utilisez [nvm](https://github.com/nvm-sh/nvm) : `nvm install 20 && nvm use 20`
- npm, yarn, pnpm ou bun
- Une clé API OpenRouter (pour DeepSeek R1T2 Chimera)

### Installation

1. Clonez le projet et installez les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

2. Configurez votre clé API OpenRouter (optionnel) :

Le projet fonctionne immédiatement avec une clé API OpenRouter déjà configurée. Pour utiliser votre propre clé, créez un fichier `.env.local` à la racine du projet :

```bash
OPENROUTER_API_KEY=votre_cle_api_ici

# Optionnel : pour les statistiques sur openrouter.ai
SITE_URL=http://localhost:3000
SITE_NAME=Eco-Assistant IA
```

Pour obtenir une clé API OpenRouter :
- Visitez [OpenRouter](https://openrouter.ai/)
- Créez un compte ou connectez-vous
- Générez une nouvelle clé API dans les paramètres
- Copiez-la dans votre fichier `.env.local`

**Note** : Le projet utilise DeepSeek R1T2 Chimera (gratuit) via OpenRouter. Les variables `SITE_URL` et `SITE_NAME` sont optionnelles et utilisées pour les statistiques sur OpenRouter.

3. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎯 Fonctionnalités

### 💬 Dialogue Interactif et Pédagogique
- **Conversation naturelle** : Posez des questions comme "Dois-je compresser mes images ?", "Quel type de serveur choisir ?", "Comment activer le cache ?"
- **Analyse intelligente** : L'IA analyse vos réponses et intentions pour proposer des recommandations personnalisées
- **Approche pédagogique** : Chaque conseil explique l'impact environnemental concret (CO2, énergie, ressources)
- **Questions de suivi** : L'assistant pose des questions pour mieux comprendre votre contexte

### 📊 Scoring et Rapport
- **Scoring automatique** basé sur 5 catégories (max 100 points) :
  - **Contenu** (images, vidéos) : 20 pts (Impact : Bande passante & Stockage)
  - **Infrastructure** (hébergement vert) : 25 pts (Impact : Énergie data centers & Refroidissement)
  - **Performance** (cache, CDN) : 15 pts (Impact : Charge serveur & Sauts réseau)
  - **Développement** (minification, Tree Shaking) : 15 pts (Impact : Batterie appareil & Cycles CPU)
  - **Sobriété** (fonctionnalités, UX) : 25 pts (Impact : Éviter fonctionnalités inutiles)
- **Rapport d'éco-score** avec :
  - Score global sur 100
  - Analyse détaillée par catégorie avec barres de progression
  - Recommandations personnalisées pour améliorer le score
  - Explications de l'impact environnemental de chaque recommandation

### 🎨 Interface Moderne
- Interface conversationnelle intuitive
- Suggestions de questions pour démarrer
- Support du mode sombre
- Animations fluides et feedback visuel

## 🛠️ Technologies

- [Next.js 16](https://nextjs.org/) - Framework React
- [Vercel AI SDK](https://sdk.vercel.ai/) - SDK pour intégrer les modèles IA avec support des outils (tools)
- [OpenRouter](https://openrouter.ai/) - Plateforme d'accès aux modèles IA
- [DeepSeek R1T2 Chimera](https://openrouter.ai/models/tngtech/deepseek-r1t2-chimera) - Modèle IA conversationnel gratuit via OpenRouter
- [Zod](https://zod.dev/) - Validation de schémas pour les outils
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Lucide React](https://lucide.dev/) - Icônes

## 🔄 Flux Utilisateur

1. **Démarrage** : L'utilisateur lance la conversation avec l'assistant
2. **Questions** : L'utilisateur pose des questions sur ses choix techniques
3. **Analyse** : L'IA analyse les réponses et intentions de l'utilisateur
4. **Recommandations** : L'IA propose des conseils pédagogiques avec explication de l'impact environnemental
5. **Scoring** : Les bonnes pratiques sont récompensées avec des points dans les catégories appropriées
6. **Rapport** : À la fin de la session, un rapport d'éco-score est généré avec des recommandations personnalisées

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Exécute ESLint

## 🚢 Déploiement

### Vercel (recommandé)

1. **Poussez votre code sur GitHub** (déjà fait : https://github.com/Moustapha22013/eco-coach-ai)

2. **Importez le projet sur Vercel** :
   - Allez sur [Vercel](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez le repository `eco-coach-ai`
   - Vercel détectera automatiquement Next.js

3. **Configurez les variables d'environnement** (optionnel) :
   - Par défaut, une clé API OpenRouter est déjà configurée dans le code
   - Pour utiliser votre propre clé, ajoutez `OPENROUTER_API_KEY` dans les variables d'environnement Vercel
   - `SITE_URL` : URL de votre site déployé (optionnel, ex: https://votre-app.vercel.app)
   - `SITE_NAME` : Nom de votre application (optionnel, ex: Eco-Assistant IA)

4. **Déployez !** Vercel déploiera automatiquement votre application. Le déploiement fonctionnera immédiatement avec la clé API par défaut.

### Variables d'environnement

| Variable | Description | Requis | Note |
|----------|-------------|--------|------|
| `OPENROUTER_API_KEY` | Clé API OpenRouter pour accéder à DeepSeek R1T2 Chimera | ❌ Non | Une clé API par défaut est déjà incluse dans le code. Vous pouvez la remplacer en ajoutant cette variable. |
| `SITE_URL` | URL du site pour les statistiques OpenRouter | ❌ Non | Optionnel |
| `SITE_NAME` | Nom du site pour les statistiques OpenRouter | ❌ Non | Optionnel |

**Note importante** : Le projet fonctionne immédiatement après le déploiement car une clé API OpenRouter est déjà configurée dans le code. Vous n'avez pas besoin de configurer de variables d'environnement pour que le déploiement fonctionne.

### Autres plateformes

Assurez-vous de définir les variables d'environnement dans votre configuration de déploiement. Le fichier `vercel.json` est configuré pour un timeout de 30 secondes pour les routes API.

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenRouter API](https://openrouter.ai/docs)
- [DeepSeek R1T2 Chimera](https://openrouter.ai/models/tngtech/deepseek-r1t2-chimera)
- [Éco-conception web](https://www.greenit.fr/)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
