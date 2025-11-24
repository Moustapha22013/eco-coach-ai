import { ChatInterface } from "@/components/ChatInterface";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-24 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8 mx-auto">
          <div className="fixed left-0 top-0 flex w-full flex-col items-center justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <p className="font-bold">Projet 2 — Assistant IA pour l'éco-numérique</p>
            <p className="text-xs opacity-70 mt-1">Sensibilisation interactive à l'impact numérique</p>
          </div>
        </div>

        <ChatInterface />
      </div>
    </main>
  );
}
