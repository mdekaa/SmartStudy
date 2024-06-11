"use client";

import React from "react";
import { cn } from "@/lib/utils";


import {
    
    FileQuestion,
    Rss,
    Sticker
  } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const categories = [
  {
    name: "Ask the Community",
    avatar: FileQuestion,
    description: "EXPLANATION HKADCBDHAKVBDKHV"
  },
  {
    name: "Updates from us",
    avatar: Rss,
    description: "ADVHKBHVDVHKADVKKA KHBKV"
  },
  {
    name: "Suggestion Box",
    avatar: Sticker,
    description:"MADNV DJHAVBAHKVBAVBJHVB"
  }
];

export default function CommunityContent() {
  return (
    <div className="px-10 pb-20 bg-gradient-to-r from-slate-600 to-slate-900">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 p-10">
        Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((item) => (
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
                    {/* <p className="text-zinc-400 text-sm">{item.title}</p> */}
                  </div>
                </CardTitle>
              </div>
              <CardContent className="pt-4 px-0 w-12">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}