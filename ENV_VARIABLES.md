# Variables d'environnement

Ce fichier documente les variables d'environnement nécessaires pour le projet.

## Variables requises

### `OPENROUTER_API_KEY`
- **Description** : Clé API OpenRouter pour accéder à DeepSeek R1T2 Chimera
- **Requis** : ❌ Non (une clé API par défaut est déjà incluse dans le code)
- **Exemple** : `sk-or-v1-...`
- **Où l'obtenir** : https://openrouter.ai/keys
- **Note** : Le projet fonctionne immédiatement sans configuration car une clé API est déjà présente. Vous pouvez la remplacer en définissant cette variable d'environnement.

## Variables optionnelles

### `SITE_URL`
- **Description** : URL du site pour les statistiques OpenRouter
- **Requis** : ❌ Non
- **Exemple** : `https://votre-app.vercel.app` ou `http://localhost:3000`
- **Défaut** : `http://localhost:3000`

### `SITE_NAME`
- **Description** : Nom du site pour les statistiques OpenRouter
- **Requis** : ❌ Non
- **Exemple** : `Eco-Assistant IA`
- **Défaut** : `Eco-Assistant IA`

## Configuration locale

Créez un fichier `.env.local` à la racine du projet :

```bash
OPENROUTER_API_KEY=votre_cle_api_ici
SITE_URL=http://localhost:3000
SITE_NAME=Eco-Assistant IA
```

## Configuration Vercel

Dans les paramètres du projet Vercel, ajoutez ces variables dans "Environment Variables" :

1. `OPENROUTER_API_KEY` (Production, Preview, Development)
2. `SITE_URL` (Production uniquement, avec l'URL de votre déploiement)
3. `SITE_NAME` (Production uniquement)

