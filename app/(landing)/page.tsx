"use client";


import React from "react";

// import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";
// import LandingContent from "@/components/landing-content";
// import CommentPage from "@/components/commentPage";
import DiscussionPage from "@/components/discussion";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      {/* <LandingHero />
      <LandingContent /> */}
      {/* <CommentPage /> */}
      <DiscussionPage />
    </div>
  );
}