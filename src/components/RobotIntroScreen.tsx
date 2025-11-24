"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Leaf } from 'lucide-react';
import { AnimatedRobot } from './AnimatedRobot';

interface RobotIntroScreenProps {
    onComplete: () => void;
}

export const RobotIntroScreen = ({ onComplete }: RobotIntroScreenProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [robotAnimation, setRobotAnimation] = useState(true);

    const fullText = "Initialisation du système Eco-Assistant...\nAnalyse de l'empreinte carbone numérique...\nSystème prêt à vous aider !";

    useEffect(() => {
        let currentIndex = 0;
        let currentLine = '';
        let lineIndex = 0;
        const lines = fullText.split('\n');

        const typeInterval = setInterval(() => {
            if (lineIndex < lines.length) {
                const currentLineText = lines[lineIndex];
                
                if (currentIndex < currentLineText.length) {
                    currentLine += currentLineText[currentIndex];
                    setDisplayedText(lines.slice(0, lineIndex).join('\n') + '\n' + currentLine);
                    currentIndex++;
                } else {
                    // Move to next line
                    lineIndex++;
                    currentIndex = 0;
                    currentLine = '';
                    
                    if (lineIndex >= lines.length) {
                        clearInterval(typeInterval);
                        setTimeout(() => {
                            setShowButton(true);
                            setRobotAnimation(false);
                        }, 500);
                    }
                }
            }
        }, 50); // Speed of typing

        return () => clearInterval(typeInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-emerald-500/20 relative">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
                {/* Animated Robot with Eyes */}
                <div className="mb-8 relative">
                    <AnimatedRobot isActive={robotAnimation} />
                </div>

                {/* Typewriter Text */}
                <div className="mb-8 min-h-[120px]">
                    <div className="font-mono text-lg text-emerald-100 whitespace-pre-line text-left bg-black/30 p-6 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
                        {displayedText}
                        <span className="inline-block w-2 h-5 bg-emerald-400 ml-1 animate-pulse">|</span>
                    </div>
                </div>

                {/* Start Button */}
                {showButton && (
                    <button
                        onClick={onComplete}
                        className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Leaf size={20} className="group-hover:rotate-12 transition-transform" />
                            Démarrer la consultation
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                )}

                {/* Loading dots while typing */}
                {!showButton && (
                    <div className="flex gap-2 mt-4">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

