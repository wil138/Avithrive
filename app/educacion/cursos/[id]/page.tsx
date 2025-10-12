"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CourseDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Detalles del Curso {id}</h1>
        <p className="text-xl text-gray-600 mb-6">
          Aquí se mostrará la información detallada del curso.
        </p>
        <Link href="/educacion/cursos">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Cursos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetailPage;