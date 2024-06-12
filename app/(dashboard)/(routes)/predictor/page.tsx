"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Sgpa from "@/components/sgpa"
import { useState } from "react"

export default function TabsDemo() {
  const subjectCode = ['01', '02', '03', '04', '05', '06'];
  const credits = ['28', '27', '23', '24', '50', '6'];
  const [branchCode, setBranchCode] = useState('EC');
  const [year, setyear] = useState<number>(3);
  
  return (
    <Tabs defaultValue="sgpa" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sgpa">SGPA</TabsTrigger>
        <TabsTrigger value="cgpa">CGPA</TabsTrigger>


      </TabsList>
          <Sgpa subjectCode={subjectCode} branchCode={branchCode} year={year}/>
    </Tabs>
  )
}
