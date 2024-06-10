"use client";
import axios from "axios";
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import OpenAI from "openai/index.mjs";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { formSchema } from "./constants";

export default function ConversationPage() {
    const router = useRouter();

    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: " "
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt || " "
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages
            });

            console.log("Response from API:", response.data);

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error: any) {
            if (error.response?.status === 429) {
                alert("Quota exceeded. Please check your plan and billing details.");
            } else {
                console.log("Error in onSubmit:", error);
                alert("An error occurred. Please try again later.");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Doubt Solver AI"
                description="Solve your basic doubts in minutes!!!"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                disabled={isLoading}
                                                placeholder="What is Maxwell's 69th Law"
                                                className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isLoading}
                                className="col-span-12 lg:col-span-2 w-full"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages?.map((message, index) => (
                            <div key={index}>
                                {typeof message.content === "string" ? message.content : "Invalid content"}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
