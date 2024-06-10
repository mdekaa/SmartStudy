"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function LandingHero() {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5 bg-gradient-to-r from-blue-950 to-blue-600">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Tool For Smart Studying </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Resources",
                "Talk to Teachers",
                "AI Doubt Solvers",
                "Community Discussion",
                
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-100">
        Clear Doubts, Access to Resources and much more.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Register
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        gorusur
      </div>
    </div>
  );
}