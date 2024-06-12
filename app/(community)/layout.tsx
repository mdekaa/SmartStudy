import React from "react";
import Navbar from "@/components/navbar";

export default function LandingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto  h-full w-full">{children}</div>
    </main>
  );
}