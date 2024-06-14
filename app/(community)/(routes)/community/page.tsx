"use client";

import React, { useState } from 'react';
// import PostList from '@/components/postList';
// import PostForm from '@/components/postForm';
import LandingNavbar from '@/components/landing-navbar';
import CommunityContent from '@/components/community-content';
import Comments from '@/components/comments/comments';


const DiscussionPage: React.FC = () => {
  const [posts, setPosts] = useState([]);

  const handleSubmitPost = (title: string, content: string) => {

    const newPost = {
      id: Date.now(),
      title,
      content,
    };
    // setPosts([...posts, newPost]);
  };

  return (
    <div className="h-full">
      <LandingNavbar />
      <div className="text-white font-bold py-20 text-center space-y-5 bg-gradient-to-r from-slate-600 to-slate-900">
        <h1 className="text-5xl font-bold">Community Discussion Page</h1>
        <CommunityContent />
        {/* <PostForm onSubmit={handleSubmitPost} />
        <PostList posts={posts} /> */}
        <Comments 
          commentsUrl="http://localhost:3004/comments"
          currentUserId="1"
        />
      </div>
    </div>
  );
};

export default DiscussionPage;
