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
  const subjectCode = ['EC-301', 'EC-302', 'EC-303', 'EC-304', 'EC-305', 'EC-306','EC-311','EC-312','EC-313'];
  const subcredits = [4,4,4,4,3,3,2,2,2];
  const [branchCode, setBranchCode] = useState('EC');
  const [year, setyear] = useState<number>(3);
  
  return (
    <Tabs defaultValue="sgpa" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sgpa">SGPA</TabsTrigger>
        <TabsTrigger value="cgpa">CGPA</TabsTrigger>


      </TabsList>
          <Sgpa subjectCode={subjectCode} branchCode={branchCode} subcredits={subcredits} year={year}/>
    </Tabs>
  )
}