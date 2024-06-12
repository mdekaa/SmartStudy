import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {TabsContent} from "@/components/ui/tabs"
interface SgpaProps {
    subjectCode: string[];
    branchCode: string;
    year: number;
  }

const Sgpa: React.FC<SgpaProps> = ({ subjectCode, branchCode, year }) => {
    const [subs,setSubs] = useState(0);
    const incrementSubs = () => {
        if (subs < 6) {
          setSubs(subs + 1);
        }
      };
      const decrementSubs = () => {
        if (subs > 0) {
          setSubs(subs - 1);
        }
      };
  return (
    <TabsContent value="sgpa">
    <Card>
      <CardHeader>
        <CardTitle>SGPA</CardTitle>
        <CardDescription>
          Make changes to your SGPA here. Click save when you are done.
        </CardDescription>
      </CardHeader>
        {
        [...Array(subs)].map((_, index) => (
          <CardContent key={index} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor={`subject-${index}`}>{`${branchCode}-${year}${subjectCode[index]}`}</Label>
              <Input id={`subject-${index}`} placeholder={`Enter the grade point for subject ${index + 1}`} />
            </div>
          </CardContent>
        ))}
      <CardFooter className="flex gap-4"> 
      <Button onClick={incrementSubs} disabled={subs >= 6}>
          Add Subjects
        </Button>
        {subs > 0 && (
          <Button onClick={decrementSubs}>
            Delete 
            {/* <IconDelete className="ml-1" /> */}
          </Button>
        )}
        <Button>Calculate</Button>
      </CardFooter>
    </Card>
  </TabsContent>
  )
}

export default Sgpa