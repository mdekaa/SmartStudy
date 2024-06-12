import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast"

interface SgpaProps {
  subjectCode: string[];
  branchCode: string;
  year: number;
  subcredits:number[];
}

const Sgpa: React.FC<SgpaProps> = ({ subjectCode, branchCode,subcredits, year }) => {
  const [subs, setSubs] = useState(0);
  const [gradePoints, setGradePoints] = useState<number[]>(Array(subs).fill(0));
  const { toast } = useToast()

  const incrementSubs = () => {
    if (subs < 9) {
      setSubs(subs + 1);
      setGradePoints([...gradePoints, 0]);
    }
  };

  const decrementSubs = () => {
    if (subs > 0) {
      setSubs(subs - 1);
      setGradePoints(gradePoints.slice(0, -1));
    }
  };

  const handleGradePointChange = (index: number, value: number) => {
    const newGradePoints = [...gradePoints];
    newGradePoints[index] = value;
    setGradePoints(newGradePoints);
  };

  const handleCalculate = () => {
    // Calculate the SGPA based on the grade points
    var sum = 0,creds=0;
    for (let i = 0; i < subs; i++) {
      sum += gradePoints[i]*subcredits[i];
      creds+=subcredits[i];
    }
    // console.log(sum,creds);
    const sgpa = sum/creds; // Assuming subs > 0 to avoid division by zero
    alert(`Your SGPA is: ${sgpa.toFixed(2)}`);
    toast({
      description: `Your SGPA is: ${sgpa.toFixed(2)}`,
    })
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
        {[...Array(subs)].map((_, index) => (
          <CardContent key={index} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor={`subject-${index}`}>{`${branchCode}-${year}${subjectCode[index]}`}</Label>
              <Input
                id={`subject-${index}`}
                placeholder={`Enter the grade point for subject ${index + 1}`}
                type="number"
                value={gradePoints[index]}
                onChange={(e) => handleGradePointChange(index, parseFloat(e.target.value))}
              />
            </div>
          </CardContent>
        ))}
        <CardFooter className="flex gap-4">
          <Button onClick={incrementSubs} disabled={subs >= 9}>
            Add Subjects
          </Button>
          {subs > 0 && (
            <Button onClick={decrementSubs}>
              Delete
            </Button>
          )}
          <Button onClick={handleCalculate}>Calculate</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default Sgpa;
