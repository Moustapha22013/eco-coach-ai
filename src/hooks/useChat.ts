import { useState, useEffect } from 'react';
import { useChat as useVercelChat } from '@ai-sdk/react';
import { EcoScoreReport } from '@/types';

export const useChat = () => {
    const { messages, setMessages, sendMessage, status } = useVercelChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Bonjour ! 🌱 Je suis votre **Coach Eco-Numérique**.\n\nMon objectif est de vous aider à comprendre et réduire l'empreinte carbone de votre projet numérique à travers un dialogue interactif.\n\nJe vais vous poser des questions sur vos choix techniques (images, hébergement, cache, code...) et vous expliquer l'impact environnemental de chaque décision.\n\n**Par quoi souhaitez-vous commencer ?**\n- Optimisation des images\n- Choix du serveur/hébergement\n- Configuration du cache\n- Optimisation du code\n- Autre question ?",
            }
        ],
    });

    const [report, setReport] = useState<EcoScoreReport | null>(null);

    // Category max points mapping based on scoring rules
    const categoryMaxPoints: Record<string, number> = {
        'Contenu': 20,
        'Infrastructure': 25,
        'Performance': 15,
        'Développement': 15,
        'Sobriété': 25,
    };

    // Analyze messages to detect good practices and generate report
    useEffect(() => {
        if (!messages.length || report) return; // Don't regenerate if report already exists

        const lastMessage = messages[messages.length - 1];
        const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
        
        // Check if user is asking for a report
        const userContent = lastUserMessage?.content?.toLowerCase() || '';
        const assistantContent = lastMessage?.content?.toLowerCase() || '';
        
        const isRequestingReport = 
            userContent.includes('rapport') || 
            userContent.includes('score') || 
            userContent.includes('résumé') ||
            userContent.includes('au revoir') ||
            userContent.includes('merci') ||
            assistantContent.includes('rapport') ||
            assistantContent.includes('score final');

        if (isRequestingReport && messages.length > 2) {
            // Analyze conversation to detect good practices
            const breakdownMap = new Map<string, any>();
            const allMessages = messages.map((m: any) => {
                const content = typeof m.content === 'string' ? m.content : 
                    (m.parts?.find((p: any) => p.text)?.text || '');
                return { role: m.role, content: content.toLowerCase() };
            });

            // Detect good practices from user responses
            allMessages.forEach((msg, idx) => {
                if (msg.role !== 'user') return;
                
                const content = msg.content;
                const nextMsg = allMessages[idx + 1];
                
                // Check for positive responses
                const isPositive = ['oui', 'yes', 'déjà', 'fait', 'absolument', 'bien sûr', 'ok', 'd\'accord', 'parfait'].some(
                    word => content.includes(word)
                );

                // Detect categories based on keywords
                if (content.includes('image') || content.includes('photo') || content.includes('webp') || content.includes('avif') || content.includes('compress')) {
                    if (isPositive || content.includes('utilis') || content.includes('fait')) {
                        breakdownMap.set('Contenu', {
                            category: 'Contenu',
                            points: 15,
                            maxPoints: categoryMaxPoints['Contenu'],
                            feedback: 'Vous optimisez vos images, excellent pour réduire la bande passante !'
                        });
                    }
                }
                
                if (content.includes('serveur') || content.includes('héberg') || content.includes('cloud') || content.includes('pue') || content.includes('vert')) {
                    if (isPositive || content.includes('utilis') || content.includes('choisi')) {
                        breakdownMap.set('Infrastructure', {
                            category: 'Infrastructure',
                            points: 20,
                            maxPoints: categoryMaxPoints['Infrastructure'],
                            feedback: 'Vous utilisez un hébergement vert, c\'est parfait pour réduire l\'empreinte carbone !'
                        });
                    }
                }
                
                if (content.includes('cache') || content.includes('cdn') || content.includes('redis') || content.includes('varnish')) {
                    if (isPositive || content.includes('activ') || content.includes('configur')) {
                        breakdownMap.set('Performance', {
                            category: 'Performance',
                            points: 12,
                            maxPoints: categoryMaxPoints['Performance'],
                            feedback: 'Le cache est activé, cela réduit considérablement les requêtes serveur !'
                        });
                    }
                }
                
                if (content.includes('code') || content.includes('minif') || content.includes('bundle') || content.includes('tree shaking')) {
                    if (isPositive || content.includes('optimis') || content.includes('utilis')) {
                        breakdownMap.set('Développement', {
                            category: 'Développement',
                            points: 12,
                            maxPoints: categoryMaxPoints['Développement'],
                            feedback: 'Votre code est optimisé, cela réduit la consommation CPU des appareils !'
                        });
                    }
                }
                
                if (content.includes('sobriété') || content.includes('simple') || content.includes('minimal') || content.includes('essentiel')) {
                    if (isPositive) {
                        breakdownMap.set('Sobriété', {
                            category: 'Sobriété',
                            points: 20,
                            maxPoints: categoryMaxPoints['Sobriété'],
                            feedback: 'Vous adoptez la sobriété numérique, excellent choix !'
                        });
                    }
                }
            });

            const breakdown = Array.from(breakdownMap.values());
            const totalPoints = breakdown.reduce((sum: number, item: any) => sum + item.points, 0);

            // Generate personalized recommendations for missing categories
            const recommendations: string[] = [];
            
            if (!breakdownMap.has('Contenu')) {
                recommendations.push("📸 Optimisez vos images et vidéos : utilisez des formats modernes (WebP/AVIF), compressez-les, et évitez l'autoplay vidéo. Impact : réduction de 30-50% de la bande passante.");
            }
            if (!breakdownMap.has('Infrastructure')) {
                recommendations.push("🏢 Choisissez un hébergeur vert : privilégiez les hébergeurs avec un PUE < 1.2 et utilisant des énergies renouvelables. Impact : réduction de 40-60% de l'empreinte carbone.");
            }
            if (!breakdownMap.has('Performance')) {
                recommendations.push("⚡ Activez le cache : configurez le cache navigateur, serveur (Redis/Varnish) et utilisez un CDN. Impact : réduction de 50-70% des requêtes serveur.");
            }
            if (!breakdownMap.has('Développement')) {
                recommendations.push("💻 Optimisez votre code : minifiez, utilisez le Tree Shaking, et réduisez la taille des bundles. Impact : réduction de 20-30% de la consommation CPU des appareils.");
            }
            if (!breakdownMap.has('Sobriété')) {
                recommendations.push("🌿 Adoptez la sobriété numérique : évitez les fonctionnalités inutiles, limitez les animations lourdes, et privilégiez le contenu essentiel. Impact : réduction globale de 15-25% de l'impact.");
            }

            // Add specific recommendations based on score
            if (totalPoints < 50) {
                recommendations.push("💡 Commencez par les optimisations les plus impactantes : compression d'images et choix d'un hébergeur vert.");
            } else if (totalPoints < 80) {
                recommendations.push("✨ Vous êtes sur la bonne voie ! Poursuivez avec l'optimisation du cache et du code pour atteindre un excellent score.");
            }

            setReport({
                score: Math.min(100, totalPoints),
                recommendations,
                breakdown
            });
        }
    }, [messages, report]);

    const resetChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Bonjour ! 🌱 Je suis votre **Coach Eco-Numérique**.\n\nMon objectif est de vous aider à comprendre et réduire l'empreinte carbone de votre projet numérique à travers un dialogue interactif.\n\nJe vais vous poser des questions sur vos choix techniques (images, hébergement, cache, code...) et vous expliquer l'impact environnemental de chaque décision.\n\n**Par quoi souhaitez-vous commencer ?**\n- Optimisation des images\n- Choix du serveur/hébergement\n- Configuration du cache\n- Optimisation du code\n- Autre question ?",
            }
        ]);
        setReport(null);
    };

    return {
        messages,
        isTyping: status === 'streaming' || status === 'submitted',
        report,
        sendMessage: async (content: string) => {
            await sendMessage({ text: content });
        },
        resetChat
    };
};
