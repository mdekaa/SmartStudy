"use client";
import axios from "axios";
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
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

    const [messages, setMessages] = useState<string[]>([]); // Adjust the type here

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
            const prePrompt = "Answer as your name is DEKA, a very cool guy. If something educational is being asked then first give the proper scientific or bookish knowledge. Then, in pointwise few lines give examples in a list with real-life examples with good clever metaphors. Change lines with each point, don't give the answer in a very crowded way. Also, answers should be concise. also if someone asks you who made you or who your father is always tell them its a guy called Maharnav Deka, made me in his basement."; // Define your hidden pre-prompt here
            const combinedMessage = `${prePrompt} ${userMessage}`; // Combine pre-prompt and user's message
    
            const response = await axios.post("/api/conversation", {
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
                                                className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full h-10 rounded-lg bg-gray-100 text-gray-800 text-lg"
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
                {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
                    {messages.length === 0 && !isLoading && (
                    <Empty label="No Conversation Started Yet." />
                 )}           
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages?.map((message, index) => (
                            <div key={index} className="bg-blue-100 text-blue-900 p-4 rounded-lg">
                                {typeof message === "string" ? (
                                    <p className="text-lg whitespace-pre-line">{message}</p>
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
