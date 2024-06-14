"use client";

import React from "react";
import { cn } from "@/lib/utils";


import {

  Percent,
  Handshake,
  Lightbulb,
  Goal

} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const offers = [
  {
    name: "Accurate Predictions",
    avatar: Percent,
    description: "Using advanced algorithms, we offer precise CGPA predictions based on your current grades and future academic plans."
  },
  {
    name: "User-Friendly Interface",
    avatar: Handshake,
    description: "Our platform is designed to be easy to use, ensuring that students of all technical backgrounds can navigate and utilize our tools effectively"
  },
  {
    name: "Comprehensive Insights",
    avatar: Lightbulb,
    description: "Beyond predictions, we provide detailed insights and analysis to help you understand the factors impacting your academic performance"
  },
  {
    name: "Goal Setting",
    avatar: Goal,
    description: "Set your academic targets and track your progress towards achieving them. Our platform offers personalized tips and strategies to help you stay on track"
  }
];

export default function AboutContent() {
  return (
    <div className="px-10 pb-20 bg-gradient-to-r from-slate-600 to-slate-900">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 p-5">
        What We Offer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {offers.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <div className="flex flex-row items-center">
                <div className="h-10 w-10 mr-4">
                  <div className="flex items-center flex-1">
                    <item.avatar className={cn("h-5 w-5 mr-3")} />

                  </div>
                </div>
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    
                  </div>
                </CardTitle>
              </div>
              <CardContent className="pt-4 px-0 w-56">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}