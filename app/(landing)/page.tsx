"use client";


import React from "react";

import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";
import LandingContent from "@/components/landing-content";
// import DiscussionPage from "@/components/discussion";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      {/* <DiscussionPage /> */}
    </div>
  );
}