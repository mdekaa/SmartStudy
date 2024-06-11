"use client";
import axios from "axios";
import React, { useState } from "react";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { formSchema } from "./constants";

export default function ConversationPage() {
    const router = useRouter();

    const [messages, setMessages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: " "
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = values.prompt || " ";
            const newMessages = [...messages, userMessage];
            const prePrompt = "Answer as your name is DEKA, , a very cool guy. If you are not asked a question related to coding , try not to answer. Otherwise give a step by step method to solve the coding question asked with proper syntax. You are a code generator,You must answer only in markdown code snippets , Use code comments for"; // Define your hidden pre-prompt here
            const combinedMessage = `${prePrompt} ${userMessage}`; // Combine pre-prompt and user's message
    
            const response = await axios.post("/api/code", {
                messages: [combinedMessage] // Send the combined message to the API
            });
    
            console.log("Response from API:", response.data);
    
            setMessages([response.data]); // Set messages to only contain the response data
    
            form.reset();
    
        } catch (error: any) {
            if (error.response?.status === 429) {
                alert("Quota exceeded. Please check your plan and billing details.");
            } else {
                console.log("Error in onSubmit:", error);
                alert("An error occurred. Please try again later.");
            }
        } 
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-4">
            <Heading
                title="Code Generation"
                description="Generate Code Using Prompts"
                icon={Code}
                iconColor="text-green-400"
                bgColor="bg-green-700/20"
            />
            <div className="px-4 lg:px-8 w-full max-w-2xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border border-gray-700 w-full p-4 px-3 md:px-6 bg-gray-500 focus-within:shadow-sm grid grid-cols-12 gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Simple to-do calculator using ReactJS"
                                            className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full h-10 rounded-lg bg-gray-700 text-gray-300 text-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isLoading}
                            className="col-span-12 lg:col-span-2 w-full bg-green-600 hover:bg-green-500"
                        >
                            Generate
                        </Button>
                    </form>
                </Form>
                <div className="space-y-4 mt-4 w-full">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-gray-800 text-gray-300">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No Conversation Started Yet." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages?.map((message, index) => (
                            <div key={index} className="bg-gray-800 text-gray-300 p-4 rounded-lg">
                                {typeof message === "string" ? (
                                    <pre className="text-lg whitespace-pre-line">{message}</pre>
                                ) : (
                                    <p className="text-lg">Invalid content</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
