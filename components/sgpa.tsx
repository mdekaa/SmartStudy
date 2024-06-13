import React, { use, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import BarChart from './barChart';
interface SgpaProps {
  subjectCode: string[];
  branchCode: string;
  year: number;
  subcredits:number[];
}


const Sgpa: React.FC<SgpaProps> = ({ subjectCode, branchCode,subcredits, year }) => {
  const [subs, setSubs] = useState(0);
  const [gradePoints, setGradePoints] = useState<number[]>(Array(subs).fill(0));
  const [sgpa, setSgpa] = useState(0);
  const [showSlider, setShowSlider] = useState(true);

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
    if(subs<=0)
      alert("Please add subjects to calculate SGPA");
  else{
    setSgpa(sgpa.toFixed(2) as unknown as number);
    alert(`Your SGPA is: ${sgpa.toFixed(2)}`);
  }
  };

  const handleSwitchChange = (checked: boolean) => {
    setShowSlider(checked);
  };

  
  return (
    <TabsContent value="sgpa">
      
      <div className='flex gap-10'>
      <div>
      <Card className='m-3'>
      <CardHeader>
          <CardTitle>Calculated SGPA for the sem</CardTitle>
          <CardDescription>SGPA is {sgpa} </CardDescription>
      </CardHeader>
    </Card>
      
    <Card className='m-3'>
        <CardHeader>
          <CardTitle>SGPA</CardTitle>
          <CardDescription>
            Make changes to your SGPA here. Click save when you are done.
          </CardDescription>

          <div className="flex items-center space-x-2">
          <Label htmlFor="Slider">Slider</Label>
          <Switch onCheckedChange={handleSwitchChange} checked={showSlider} />
          </div>
        </CardHeader>
        {[...Array(subs)].map((_, index) => (
          <CardContent key={index} className="space-y-2">
            <div className="space-y-1">
              {/* <Label htmlFor={`subject-${index}`}>{`${branchCode}-${year}${subjectCode[index]}`}</Label> */}
              <Label htmlFor={`subject-${index}`}>{subjectCode[index]}</Label>

              {(showSlider)?(
                <>
              <Slider
              defaultValue={[gradePoints[index]]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => handleGradePointChange(index, value[0])}/>
              <div>Grade: {gradePoints[index]}</div>
                </>
              ):(
              <Input
                id={`subject-${index}`}
                placeholder={`Enter the grade point for subject ${index + 1}`}
                type="number"
                value={gradePoints[index]}
                min={1}
                max={10}
                onChange={(e) => handleGradePointChange(index, parseFloat(e.target.value))}
              />
              )
              }
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
      </div>
      <BarChart title="SGPA" label={subjectCode} datas={gradePoints}/>
    </div>

    </TabsContent>
  );
};

export default Sgpa;
