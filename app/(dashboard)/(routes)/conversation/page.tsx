"use client"
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

    const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]); // Update type here

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
            const prePrompt = "Answer as your name is DEKA, a very cool guy. If something educational is being asked then first give the proper scientific or bookish knowledge. Then, in pointwise few lines give examples in a list with real-life examples with good clever metaphors. Change lines with each point, don't give the answer in a very crowded way. Also, answers should be concise. also if someone asks you who made you or who your father is always tell them its a guy called Maharnav Deka, made me in his basement."; // Define your hidden pre-prompt here
            const combinedMessage = `${prePrompt} ${userMessage}`; // Combine pre-prompt and user's message
    
            // Clear previous messages
            setMessages([]);
    
            const response = await axios.post("/api/conversation", {
                messages: [combinedMessage] // Send the combined message to the API
            });
    
            console.log("Response from API:", response.data);
    
            // Update messages state with the response data
            setMessages([{ question: userMessage, answer: response.data }]);
    
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
                                className="col-span-12 lg:col-span-2 w-full bg-gradient-to-r from-slate-900 to-slate-500"
                            >
                                Ask Me
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-500 ">
              <Loader />
            </div>
          )}
                    {messages.length === 0 && !isLoading && (
                    <Empty label="No Conversation Started Yet." />
                 )}           
                    <div className="flex flex-col-reverse gap-y-8">
                        {messages?.map(({ question, answer }, index) => (
                            <><div key={index} className="flex items-start">
                                <img src="/useravatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                <div className="max-w-md rounded-lg overflow-hidden bg-gray-800 text-gray-200 ml-2">
                                    <p className="text-lg px-4 py-2"><strong>You asked :</strong> {question}</p>
                                </div>
                            </div><div className="flex items-start ml-10">
                                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                                    <div className="max-w-2xl rounded-lg overflow-hidden bg-indigo-700 text-indigo-200 mt-2">
                                        {answer.split('\n').map((line, i) => (
                                            <p key={i} className="text-lg px-4 py-2">{line}</p>
                                        ))}
                                    </div>
                                </div></>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
