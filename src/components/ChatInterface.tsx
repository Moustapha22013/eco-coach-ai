"use client";

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { EcoScoreReport } from './EcoScoreReport';
import { RobotIntroScreen } from './RobotIntroScreen';
import { Send, Leaf } from 'lucide-react';

export const ChatInterface = () => {
    const { messages, isTyping, report, sendMessage, resetChat } = useChat();
    const [inputValue, setInputValue] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        sendMessage(inputValue);
        setInputValue('');
    };

    const handleIntroComplete = () => {
        setShowIntro(false);
        // Small delay for smooth transition
        setTimeout(() => {
            setShowChat(true);
        }, 300);
    };

    if (report) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
                <EcoScoreReport report={report} onReset={resetChat} />
            </div>
        );
    }

    // Show intro screen first
    if (showIntro) {
        return <RobotIntroScreen onComplete={handleIntroComplete} />;
    }

    return (
        <div 
            className={`flex flex-col h-[600px] w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-border transition-all duration-500 ${
                showChat ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            {/* Header */}
            <div className="bg-primary p-4 text-primary-foreground flex items-center gap-3 shadow-md z-10">
                <div className="bg-white/20 p-2 rounded-full">
                    <Leaf size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-lg">Eco-Assistant IA</h1>
                    <p className="text-xs opacity-90">Conseiller en éco-conception numérique</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
                <div className="space-y-4">
                    {messages.map((msg: Message) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}

                    {isTyping && (
                        <div className="flex w-full mb-4 justify-start">
                            <div className="flex max-w-[80%] flex-row">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 bg-primary text-primary-foreground">
                                    <Leaf size={18} className="animate-pulse" />
                                </div>
                                <div className="p-4 rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-border">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Posez une question (ex: Dois-je compresser mes images ? Quel serveur choisir ? Comment activer le cache ?)"
                        className="flex-1 px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
                {messages.length <= 1 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Suggestions :</span>
                        <button
                            type="button"
                            onClick={() => {
                                setInputValue("Dois-je compresser mes images ?");
                            }}
                            className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                        >
                            Images
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setInputValue("Quel type de serveur choisir ?");
                            }}
                            className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                        >
                            Serveur
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setInputValue("Comment activer le cache ?");
                            }}
                            className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                        >
                            Cache
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
