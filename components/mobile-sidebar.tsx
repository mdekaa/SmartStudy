"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

export default function MobileSidebar() {
    const [isMounted, setIsMounted] = useState(false);

//Fixed Hydration error lol, this took me 1 hour to get around 

    useEffect(() => {

      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar  />
      </SheetContent>
    </Sheet>
  );
}