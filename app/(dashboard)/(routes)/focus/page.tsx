"use client";

import * as React from "react";

import StopWatch from "./stopwatch";
import Plan from "./plan";
export default function FocusMode() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div>
      <StopWatch />
      <Plan />
    </div>
  );
}
