"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const Chatbot = () => {
    useEffect(() => {
        Crisp.configure("aa21092e-147d-4eb9-85c0-e056849cb64a");

    }, []);

    return null;
}