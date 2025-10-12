"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface GameHeaderProps {
  title: string;
  description: string;
  score: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ title, description, score }) => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/educacion")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Educación
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-emerald-100">{description}</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm text-emerald-200">Puntos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;