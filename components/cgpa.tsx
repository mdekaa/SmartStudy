"use client"

import * as React from "react"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export const Cgpa = () => {
    const { toast } = useToast()
    const [semester, setSemester] = useState(1)
    const [previousCgpa, setPreviousCgpa] = useState("")
    const [expectedCgpa, setExpectedCgpa] = useState("")
    const [message, setMessage] = useState({ title: "", description: "", variant: "" })

    const handleSemesterChange = (value: any) => {
        setSemester(parseInt(value, 10))
    }


    const handlePreviousCgpaChange = (e: React.ChangeEvent<any>) => {
        setPreviousCgpa(e.target.value)
    }

    const handleExpectedCgpaChange = (e: React.ChangeEvent<any>) => {
        setExpectedCgpa(e.target.value)
    }

    const calculateRequiredSgpa = () => {
        const Y = semester
        const Z = parseFloat(previousCgpa)
        const X = parseFloat(expectedCgpa)

        if (isNaN(Z) || Z < 0 || Z > 10) {
            setMessage({
                variant: "destructive",
                title: "Invalid CGPA",
                description: "Please enter a valid CGPA between 0 and 10 for the previous semester.",
            })
            return
        }

        if (isNaN(X) || X < 0 || X > 10) {
            setMessage({
                variant: "destructive",
                title: "Invalid Expected CGPA",
                description: "Please enter a valid expected CGPA between 0 and 10.",
            })
            return
        }

        const requiredSgpa = (6 * X - (Y - 1) * Z) / (7 - Y)
        if (requiredSgpa > 10) {
            setMessage({
                variant: "destructive",
                title: "Sorry",
                description: `It is not possible to achieve CGPA of ${X} by having current CGPA of ${Z}`,
            })
            return
        }

        setMessage({
            variant: "success",
            title: "Required SGPA",
            description: `To achieve an expected CGPA of ${X}, you need to maintain an SGPA of ${requiredSgpa.toFixed(2)} in the upcoming semesters.`,
        })
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Select onValueChange={handleSemesterChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1st Semester</SelectItem>
                    <SelectItem value="2">2nd Semester</SelectItem>
                    <SelectItem value="3">3rd Semester</SelectItem>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                </SelectContent>
            </Select>
            <div className="mt-4">
                <Input
                    type="text"
                    value={previousCgpa}
                    onChange={handlePreviousCgpaChange}
                    placeholder={`Enter CGPA for Semester ${semester - 1}`}
                    className="w-full"
                />
            </div>
            <div className="mt-4">
                <Input
                    type="text"
                    value={expectedCgpa}
                    onChange={handleExpectedCgpaChange}
                    placeholder="Enter expected CGPA at the end of 6th semester"
                    className="w-full"
                />
            </div>
            <Button className="mt-4" onClick={calculateRequiredSgpa}>
                Calculate Required SGPA
            </Button>
            {message.description && (
                <div className={cn(
                    "mt-4 p-4 rounded-lg border",
                    message.variant === "destructive" ? "border-red-500 bg-red-100 text-red-800" : "border-green-500 bg-green-100 text-green-800"
                )}>
                    <h2 className="font-bold text-lg">{message.title}</h2>
                    <p>{message.description}</p>
                </div>
            )}
        </div>
    )
}


