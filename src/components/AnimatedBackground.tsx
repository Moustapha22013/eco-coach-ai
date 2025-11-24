"use client";

import { Leaf, Sparkles } from 'lucide-react';

export const AnimatedBackground = () => {
    // Generate floating leaves
    const leaves = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
    }));

    // Generate floating particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 15,
        size: 2 + Math.random() * 4,
    }));

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient background with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950">
                {/* Animated mesh gradient effect */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent dark:via-emerald-900/20 animate-pulse"></div>
                </div>
            </div>
            
            {/* Animated gradient orbs - floating effect */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            {/* Floating leaves */}
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="absolute text-emerald-400/30 dark:text-emerald-500/20 float-down"
                    style={{
                        left: `${leaf.left}%`,
                        top: '-10%',
                        animationDuration: `${leaf.duration}s`,
                        animationDelay: `${leaf.delay}s`,
                        fontSize: `${leaf.size}px`,
                        transform: `rotate(${leaf.rotation}deg)`,
                    }}
                >
                    <Leaf size={leaf.size} />
                </div>
            ))}

            {/* Floating particles/sparkles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-emerald-400/40 dark:bg-emerald-500/30 float-down"
                    style={{
                        left: `${particle.left}%`,
                        top: '-5px',
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}

            {/* Sparkle effects */}
            {Array.from({ length: 10 }).map((_, i) => {
                const delay = Math.random() * 3;
                const duration = 3 + Math.random() * 2;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const size = 16 + Math.random() * 12;
                
                return (
                    <div
                        key={`sparkle-${i}`}
                        className="absolute text-emerald-400/20 dark:text-emerald-500/10 sparkle"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                    >
                        <Sparkles size={size} />
                    </div>
                );
            })}
        </div>
    );
};

