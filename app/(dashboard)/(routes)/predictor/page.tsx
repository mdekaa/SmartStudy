//import React from 'react'
import * as React from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"




const page = () => {
    return (
        <Tabs defaultValue="SGPA" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="SGPA">SGPA</TabsTrigger>
                <TabsTrigger value="CGPA">CGPA</TabsTrigger>
            </TabsList>
            <TabsContent value="SGPA">
            </TabsContent>
            <TabsContent value="CGPA">
                Implementing soon.
            </TabsContent>
        </Tabs>

    )
}

export default page
