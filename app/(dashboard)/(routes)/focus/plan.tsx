"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import TodoList from "./todo";
export default function Plan() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex justify-between">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow m-3"
      />
      <TodoList />
    </div>
  );
}
