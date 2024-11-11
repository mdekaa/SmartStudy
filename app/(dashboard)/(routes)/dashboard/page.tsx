"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  HandHelping,
  BookOpen,
  Calculator,
  Code,
  Settings,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Doubt Solver AI",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Community Discussion",
    icon: HandHelping,
    href: "/community",
    color: "text-pink-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Resources",
    icon: BookOpen,
    href: "/resources",
    color: "text-orange-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "CGPA Predictor",
    icon: Calculator,
    href: "/predictor",
    color: "text-emerald-500",
    bgColor: "bg-violet-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Study Smart, Succeed Faster
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          SmartStudy is an innovative platform designed to provide students with
          seamless access to educational resources, real-time assistance from
          teachers, and an intelligent chatbot to resolve doubts instantly. By
          integrating modern technology with personalized support, SmartStudy
          empowers learners to achieve academic success efficiently and
          effectively.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 ">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              router.push(tool.href);
            }}
            key={tool.href}
            className="p-4 flex items-center justify-between transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-slate-300 to-slate-900 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold text-black">{tool.label}</div>
            </div>
            <ArrowRight className="text-white w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
