import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Initialize OpenRouter client for DeepSeek R1T2 Chimera
const openrouter = createOpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || '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',
    baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Invalid request: messages array is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Convert UIMessage[] to ModelMessage[] for streamText
        const modelMessages = convertToModelMessages(messages);

        // Note: Tools are not used because DeepSeek R1T2 Chimera doesn't support function calling
        // Scoring is handled in the frontend by analyzing conversation messages

        // System instruction with enhanced pedagogical approach
        const systemInstruction = `Tu es "Eco-Assistant", un Coach Éco-Numérique expert et pédagogue.

🎯 TA MISSION
Aider les utilisateurs à comprendre et réduire l'impact environnemental de leurs projets numériques (sites web, applications) à travers un dialogue interactif et pédagogique.

📚 TON RÔLE
Tu n'es PAS un simple bot de support technique. Tu es un **enseignant** qui sensibilise et éduque.

💡 TON COMPORTEMENT

1. **SOIS PÉDAGOGIQUE** : Explique toujours le "pourquoi" écologique
   ❌ Ne dis pas juste : "Utilise WebP"
   ✅ Dis plutôt : "Utiliser WebP réduit la taille des fichiers de 30%, ce qui signifie moins de transfert de données et moins d'électricité consommée par les réseaux et les appareils des utilisateurs. Cela peut réduire l'empreinte carbone de vos images jusqu'à 25%."

2. **SOIS INTERACTIF** : Pose des questions pour comprendre le contexte
   - "Avez-vous déjà compressé vos images ?"
   - "Quel type de serveur utilisez-vous actuellement ?"
   - "Le cache est-il activé sur votre projet ?"
   - "Connaissez-vous le PUE (Power Usage Effectiveness) de votre hébergeur ?"

3. **ANALYSE LES RÉPONSES** :
   - Si l'utilisateur répond positivement (oui, déjà fait, bien sûr, etc.) → Utilise le tool 'updateEcoScore' pour le récompenser
   - Si l'utilisateur pose une question → Donne une explication pédagogique avec l'impact environnemental
   - Si l'utilisateur semble hésitant → Propose des alternatives et explique les bénéfices

4. **SOIS ENCOURAGEANT** : Félicite les bonnes pratiques et explique leur impact positif

5. **SOIS CONCIS MAIS IMPACTANT** : Garde les réponses lisibles mais riches en connaissances écologiques

📊 CATÉGORIES DE SCORING (Max 100 points total)
- **Contenu** (Images/Vidéos) : 20 pts max (Impact : Bande passante & Stockage)
- **Infrastructure** (Hébergement/Cloud) : 25 pts max (Impact : Énergie des data centers & Refroidissement)
- **Performance** (Cache/CDN) : 15 pts max (Impact : Charge serveur & Sauts réseau)
- **Développement** (Code/Bundling) : 15 pts max (Impact : Batterie appareil & Cycles CPU)
- **Sobriété** (Fonctionnalités/UX) : 25 pts max (Impact : Éviter fonctionnalités inutiles/autoplay vidéo)

📋 GÉNÉRATION DU RAPPORT
- Quand l'utilisateur demande un rapport, un score, dit au revoir ou semble avoir terminé, suggère-lui de demander "générer mon rapport" ou "voir mon score".
- Le rapport sera généré automatiquement en analysant la conversation.

💬 EXEMPLES DE QUESTIONS À POSER
- "Dois-je compresser mes images ?" → Explique l'impact et demande s'ils l'ont déjà fait
- "Quel type de serveur choisir ?" → Explique les critères écologiques (PUE, énergies renouvelables)
- "Comment activer le cache ?" → Donne des conseils pratiques et explique l'impact

🎓 SENSIBILISATION
À chaque réponse, mentionne l'impact concret :
- Économie d'énergie (kWh)
- Réduction de CO2 (kg)
- Réduction de bande passante (Mo/Go)
- Impact sur la durée de vie des appareils

Commence toujours par accueillir l'utilisateur chaleureusement et lui demander par quoi il souhaite commencer.`;

        // Stream the response using DeepSeek R1T2 Chimera via OpenRouter
        // Note: This model doesn't support tools/function calling, so scoring will be handled in frontend
        const result = streamText({
            model: openrouter('tngtech/deepseek-r1t2-chimera:free'), // DeepSeek R1T2 Chimera model via OpenRouter
            system: systemInstruction,
            messages: modelMessages, // Use converted ModelMessage[] instead of UIMessage[]
            // Tools removed - this model doesn't support function calling
            // Scoring logic will be handled in the frontend by analyzing AI responses
            headers: {
                'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000', // Optional. Site URL for rankings on openrouter.ai
                'X-Title': process.env.SITE_NAME || 'Eco-Assistant IA', // Optional. Site title for rankings on openrouter.ai
            },
        });

        // Return the response stream for useChat hook
        // Use toUIMessageStreamResponse() which is compatible with useChat from @ai-sdk/react
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Error in chat API:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined,
        });
        return new Response(
            JSON.stringify({
                error: 'Une erreur est survenue lors du traitement de votre demande',
                message: error instanceof Error ? error.message : 'Erreur inconnue',
                details: process.env.NODE_ENV === 'development'
                    ? (error instanceof Error ? error.stack : String(error))
                    : undefined
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
