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

export const Cgpa = () => {
    const { toast } = useToast()
    const [semester, setSemester] = useState(1)
    const [previousCgpa, setPreviousCgpa] = useState("")
    const [expectedCgpa, setExpectedCgpa] = useState("")

    const handleSemesterChange = (value) => {
        setSemester(parseInt(value, 10))
    }


    const handlePreviousCgpaChange = (e) => {
        setPreviousCgpa(e.target.value)
    }

    const handleExpectedCgpaChange = (e) => {
        setExpectedCgpa(e.target.value)
    }

    const calculateRequiredSgpa = () => {
        const Y = semester
        const Z = parseFloat(previousCgpa)
        const X = parseFloat(expectedCgpa)

        if (isNaN(Z) || Z < 0 || Z > 10) {
            console.log({
                variant: "destructive",
                title: "Invalid CGPA",
                description: "Please enter a valid CGPA between 0 and 10 for the previous semester.",
            })
            return
        }

        if (isNaN(X) || X < 0 || X > 10) {
            console.log({
                variant: "destructive",
                title: "Invalid Expected CGPA",
                description: "Please enter a valid expected CGPA between 0 and 10.",
            })
            return
        }

        const requiredSgpa = (6 * X - (Y - 1) * Z) / (7 - Y)
        if (requiredSgpa > 10) {
            console.log({
                variant: "destructive",
                title: "Sorry",
                description: `It is not possible to achieve CGPA of ${X} by having current CGPA of ${Z}`,

            })
            return
        }
        console.log({
            title: "Required SGPA",
            description: `To achieve an expected CGPA of ${X}, you need to maintain an SGPA of ${requiredSgpa.toFixed(2)} in the upcoming semesters.`,
        })
    }

    return (
        <div>
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
        </div>
    )
}


