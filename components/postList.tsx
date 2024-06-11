// components/PostList.tsx

import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="text-white font-bold py-30 text-center space-y-5 bg-gradient-to-r from-slate-600 to-slate-900">
      <h2 className="text-3xl font-bold">Recent Posts</h2>
      <ul>
        {posts.map(post => (
          <li className="flex items-center flex-1" key={post.id}>
            <h3 className='text-3xl font-bold dark:text-black'>{post.title}</h3>
            <br />
            <p className='text-3xl font-bold dark:text-black'>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
