"use client";

import React from "react";
import { cn } from "@/lib/utils";
import profileAvatar from "../public/profileAvatar.png"

import {

    Percent,
    Handshake,
    Lightbulb,
    Goal

} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const creators = [
    {
        name: "Ankit Sahu",
        avatar: Percent,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam minima eaque voluptatem repellat necessitatibus ad culpa quis libero laudantium facilis ",
        image: profileAvatar
    },
    {
        name: "Arnab Kumar Singh",
        avatar: Handshake,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam minima eaque voluptatem repellat necessitatibus ad culpa quis libero laudantium facilis ",
        image: profileAvatar
    },
    {
        name: "Bishnu Chetry",
        avatar: Lightbulb,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam minima eaque voluptatem repellat necessitatibus ad culpa quis libero laudantium facilis ",
        image: profileAvatar
    },
    {
        name: "Khabir Ahmed",
        avatar: Goal,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam minima eaque voluptatem repellat necessitatibus ad culpa quis libero laudantium facilis ",
        image: profileAvatar
    },
    {
        name: "Maharnav Deka",
        avatar: Goal,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam minima eaque voluptatem repellat necessitatibus ad culpa quis libero laudantium facilis ",
        image: profileAvatar
    }
];

export default function AboutCreators() {
    return (
        
        <div className="px-10 pb-20 bg-gradient-to-r from-slate-600 to-slate-900">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10 p-5">
                Our Creators
            </h2>
            <div className="grid grid-cols-1 gap-4 w-4/5 ml-24 ">
                {creators.map((item) => (
                    <Card
                        key={item.description}
                        className="bg-[#192339] border-none text-white"
                    >
                        <CardHeader className="flex lg:flex-row md:flex-col">
                            <div className="flex lg:flex-row md:flex-col sm:flex-col  h-44 ">
                                <div className="w-1/4">
                                            <img src={item.image.src} className=" h-full w-full mr-4" alt="" />

                                </div>
                                <div className="flex flex-col ml-20">
                                    <CardTitle className="flex flex-col ">

                                            <p className="text-lg ">{item.name}</p>
                                            <p className="text-lg">{item.name}</p>
                                    </CardTitle>

                                    <CardContent className="pt-4 px-0 w-4/5">
                                        {item.description}
                                    </CardContent>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}