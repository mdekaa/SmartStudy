//import React from 'react'
import * as React from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Cgpa } from "@/components/cgpa"




const page = () => {
    return (
        <Tabs defaultValue="sgpa" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="sgpa">SGPA</TabsTrigger>
                <TabsTrigger value="cgpa">CGPA</TabsTrigger>
            </TabsList>
            <TabsContent value="sgpa">
            </TabsContent>
            <TabsContent value="cgpa">
                <Cgpa />
            </TabsContent>
        </Tabs>

    )
}

export default page
