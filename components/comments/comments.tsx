import React, { useState, useEffect } from "react";
import CommentForm from "./comment-form";
import Comment from "./comment";
import { 
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
 } from "@/app/api/comments/route";

interface CommentType {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  userId: string;
}

interface CommentsProps {
  commentsUrl: string;
  currentUserId: string;
}

interface ActiveComment {
  id: string;
  type: "editing" | "replying";
}

const Comments: React.FC<CommentsProps> = ({ commentsUrl, currentUserId }) => {
  const [backendComments, setBackendComments] = useState<CommentType[]>([]);
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId: string) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text: string, parentId: string | null) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);

  return (
    <div className="comments">
      <h2 className="text-center text-4xl text-white font-extrabold p-5">Ask your Doubts</h2>
      <br />
      <CommentForm submitLabel="comment" handleSubmit={(text) => addComment(text, null)} />
      <h2 className="text-center text-4xl text-white font-extrabold p-5">Top Questions</h2>
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
