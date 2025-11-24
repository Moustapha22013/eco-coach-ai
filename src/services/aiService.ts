/**
 * @deprecated This file contains a legacy mock AI service implementation.
 * The project now uses Google Gemini via the Vercel AI SDK in /app/api/chat/route.ts
 * This file is kept for reference but is not actively used.
 */
import { EcoScoreReport, Message } from '@/types';

interface AIResponse {
    message: string;
    scoreUpdate?: {
        category: string;
        points: number;
        maxPoints: number;
        feedback: string;
    };
    isFinal?: boolean;
}

const KNOWLEDGE_BASE = [
    {
        keywords: ['compresser', 'image', 'photo', 'poids'],
        response: "L'optimisation des images est cruciale. Utilisez des formats modernes comme WebP ou AVIF. Avez-vous déjà mis en place une compression automatique ?",
        category: 'Contenu',
        points: 20,
        maxPoints: 20,
        feedback: "Excellente pratique ! La compression réduit considérablement la bande passante."
    },
    {
        keywords: ['serveur', 'hébergement', 'cloud'],
        response: "Le choix du serveur impacte l'empreinte carbone. Privilégiez des hébergeurs engagés (PUE faible, énergies renouvelables). Quel hébergeur utilisez-vous ?",
        category: 'Infrastructure',
        points: 25,
        maxPoints: 25,
        feedback: "Bien choisi. L'infrastructure verte est la base d'un service éco-responsable."
    },
    {
        keywords: ['cache', 'caching', 'cdn'],
        response: "Le cache permet de limiter les requêtes vers le serveur. Activez le cache navigateur et côté serveur (Redis, Varnish). Est-ce que le cache est activé sur votre projet ?",
        category: 'Performance',
        points: 15,
        maxPoints: 15,
        feedback: "Le cache est activé, c'est parfait pour réduire la charge serveur."
    },
    {
        keywords: ['code', 'minifier', 'bundle'],
        response: "Un code propre et minifié consomme moins de ressources. Utilisez-vous le Tree Shaking et la minification ?",
        category: 'Développement',
        points: 15,
        maxPoints: 15,
        feedback: "Code optimisé = moins d'énergie consommée par les terminaux utilisateurs."
    },
    {
        keywords: ['video', 'streaming', 'autoplay'],
        response: "La vidéo est très énergivore. Évitez l'autoplay et ne chargez les vidéos que si nécessaire (lazy loading). Appliquez-vous ces règles ?",
        category: 'Contenu',
        points: 25,
        maxPoints: 25,
        feedback: "La gestion sobre de la vidéo est un gain majeur pour l'éco-conception."
    }
];

export const generateAIResponse = (userMessage: string): AIResponse => {
    const lowerMsg = userMessage.toLowerCase();

    // Check for specific keywords
    const match = KNOWLEDGE_BASE.find(item =>
        item.keywords.some(k => lowerMsg.includes(k))
    );

    if (match) {
        // Simple sentiment analysis simulation
        const isPositive = ['oui', 'yes', 'déjà', 'fait', 'absolument', 'bien sûr'].some(k => lowerMsg.includes(k));

        if (isPositive) {
            return {
                message: `C'est excellent ! ${match.feedback} Avez-vous d'autres questions sur l'éco-conception ?`,
                scoreUpdate: {
                    category: match.category,
                    points: match.points,
                    maxPoints: match.maxPoints,
                    feedback: match.feedback
                }
            };
        } else {
            return {
                message: match.response
            };
        }
    }

    // Default responses
    if (lowerMsg.includes('bonjour') || lowerMsg.includes('salut')) {
        return {
            message: "Bonjour ! Je suis votre assistant en éco-conception numérique. Posez-moi une question sur votre projet (images, serveur, cache...) pour commencer."
        };
    }

    if (lowerMsg.includes('merci') || lowerMsg.includes('revoir')) {
        return {
            message: "Avec plaisir ! Souhaitez-vous générer votre rapport d'éco-score maintenant ?",
            isFinal: true
        };
    }

    if (lowerMsg.includes('rapport') || lowerMsg.includes('score')) {
        return {
            message: "Je génère votre rapport tout de suite...",
            isFinal: true
        };
    }

    return {
        message: "Je ne suis pas sûr de comprendre. Pouvez-vous préciser ? Je peux vous aider sur les images, l'hébergement, le cache ou le code."
    };
};

export const calculateFinalReport = (updates: NonNullable<AIResponse['scoreUpdate']>[]): EcoScoreReport => {
    const breakdown = updates.reduce((acc, curr) => {
        const existing = acc.find(b => b.category === curr.category);
        if (existing) {
            existing.points = Math.max(existing.points, curr.points); // Take max to avoid duplicates? Or sum? Let's take max per category for simplicity in this mock
        } else {
            acc.push({ ...curr });
        }
        return acc;
    }, [] as EcoScoreReport['breakdown']);

    const totalPoints = breakdown.reduce((sum, item) => sum + item.points, 0);
    const maxPossible = 100; // Simplified

    // Add recommendations for missing points
    const recommendations: string[] = [];
    if (!breakdown.find(b => b.category === 'Contenu')) recommendations.push("Pensez à optimiser vos médias (images, vidéos).");
    if (!breakdown.find(b => b.category === 'Infrastructure')) recommendations.push("Vérifiez l'impact de votre hébergement.");
    if (!breakdown.find(b => b.category === 'Performance')) recommendations.push("Activez le cache pour réduire les requêtes.");

    return {
        score: Math.min(100, totalPoints),
        recommendations,
        breakdown
    };
};
