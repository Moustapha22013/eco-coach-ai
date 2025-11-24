"use client";

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface AnimatedRobotProps {
    isActive: boolean;
}

export const AnimatedRobot = ({ isActive }: AnimatedRobotProps) => {
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);

    // Animate eyes to follow cursor or move randomly
    useEffect(() => {
        if (!isActive) return;

        const moveEyes = () => {
            // Random eye movement
            setEyePosition({
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8,
            });
        };

        const blinkEyes = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        };

        const eyeInterval = setInterval(moveEyes, 2000);
        const blinkInterval = setInterval(blinkEyes, 3000);

        return () => {
            clearInterval(eyeInterval);
            clearInterval(blinkInterval);
        };
    }, [isActive]);

    return (
        <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Robot Body */}
            <div className={`relative bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-2xl shadow-2xl border-4 border-emerald-300/50 ${isActive ? 'animate-bounce' : ''}`} style={{ 
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                transform: 'perspective(1000px) rotateX(5deg)',
            }}>
                {/* Robot Head */}
                <div className="relative">
                    {/* Antenna */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-emerald-300 rounded-t-full">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>

                    {/* Eyes Container */}
                    <div className="flex justify-center gap-6 mb-4">
                        {/* Left Eye */}
                        <div className="relative w-16 h-16 bg-slate-800 rounded-full border-4 border-emerald-300 flex items-center justify-center overflow-hidden">
                            <div 
                                className={`absolute w-8 h-8 bg-emerald-400 rounded-full transition-all duration-300 ${isBlinking ? 'h-1' : ''}`}
                                style={{
                                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                                }}
                            >
                                {/* Eye shine */}
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
                            </div>
                        </div>

                        {/* Right Eye */}
                        <div className="relative w-16 h-16 bg-slate-800 rounded-full border-4 border-emerald-300 flex items-center justify-center overflow-hidden">
                            <div 
                                className={`absolute w-8 h-8 bg-emerald-400 rounded-full transition-all duration-300 ${isBlinking ? 'h-1' : ''}`}
                                style={{
                                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                                }}
                            >
                                {/* Eye shine */}
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
                            </div>
                        </div>
                    </div>

                    {/* Mouth/Display */}
                    <div className="w-24 h-8 mx-auto bg-slate-800 rounded-lg border-2 border-emerald-300 flex items-center justify-center">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                        </div>
                    </div>
                </div>

                {/* Robot Chest Panel */}
                <div className="mt-4 flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div 
                            key={i}
                            className="w-3 h-3 bg-emerald-300 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 200}ms` }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Sparkles around robot */}
            {isActive && (
                <>
                    <div className="absolute -top-2 -right-2">
                        <Sparkles size={20} className="text-emerald-400 animate-ping" />
                    </div>
                    <div className="absolute -bottom-2 -left-2">
                        <Sparkles size={16} className="text-emerald-400 animate-ping" style={{ animationDelay: '1s' }} />
                    </div>
                </>
            )}
        </div>
    );
};

