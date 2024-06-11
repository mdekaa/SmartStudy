"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import DiscussionPage from "./discussion";


import {

  MessageSquare,
  HandHelping,
  BookOpen,
  Calculator,
  Code,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const features = [
  {
    name: "Doubt Solver AI",
    avatar: MessageSquare,
    title: "kiba kibi xory title",
    description: "EXPLANATION HKADCBDHAKVBDKHV",
    linkPage: "/"
  },
  {
    name: "Ultimate Resources",
    avatar: MessageSquare,
    title: "sfvnknksfvbf",
    description: "ADVHKBHVDVHKADVKKA KHBKV",
    linkPage: "/"

  },
  {
    name: "Community Discussion",
    avatar: MessageSquare,
    title: "dhvbdhvbkhdavbkhv",
    description: "MADNV DJHAVBAHKVBAVBJHVB",
    linkPage: "/community"
  },
  {
    name: "Chat with Teachers",
    avatar: MessageSquare,
    title: "djvnkjsvnsv",
    description: "AKDVHJBAJHDVJ",
    linkPage: "./discussion"
  },
  {
    name: "CGPA Predictor",
    avatar: MessageSquare,
    title: "djvnkjsvnsv",
    description: "AKDVHJBAJHDVJVBAHJVDBKK",
    linkPage: "/"
  },
  {
    name: "Attendance Tracker",
    avatar: MessageSquare,
    title: "djvnkjsvnsv",
    description: "AKDVHJBAJHDVJVBAHJ",
    linkPage: "/"
  }
];

export default function LandingContent() {
  return (
    <div className="px-10 pb-20 bg-gradient-to-r from-slate-600 to-slate-900">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 p-10">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <Link href={item.linkPage}>
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
                      <p className="text-zinc-400 text-sm">{item.title}</p>
                    </div>
                  </CardTitle>
                </div>
                <CardContent className="pt-4 px-0 w-12">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Link >
          </Card>
        ))}
      </div>
    </div>
  );
}