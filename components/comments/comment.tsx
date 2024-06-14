import React from "react";
import CommentForm from "./comment-form";
import Profile from "./profile.png"

interface CommentProps {
  comment: {
    id: string;
    body: string;
    username: string;
    createdAt: string;
    userId: string;
  };
  replies: CommentProps["comment"][];
  setActiveComment: (comment: ActiveComment | null) => void;
  activeComment: ActiveComment | null;
  updateComment: (text: string, commentId: string) => void;
  deleteComment: (commentId: string) => void;
  addComment: (text: string, parentId: string | null) => void;
  parentId?: string | null;
  currentUserId: string | null;
}

interface ActiveComment {
  id: string;
  type: "editing" | "replying";
}

const Comment: React.FC<CommentProps> = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 ;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="flex mb-7">
      <div className=" ml-3 mt-3 w-1/12 ">
        <img src={Profile.src} className=" rounded-xl w-1/3 ml-12"/>
      </div>
      <div className="w-full ">
        <div className="flex">
          <div className="m-2 mx-3 text-lg">{comment.username}</div>
          <div className="m-2 ml-10">{createdAt}</div>
        </div>
        {!isEditing && <div className="m-1 mx-3 flex text-lg  ">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text: string) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}

        <div className="flex text-base cursor-pointer mt-2">
          {canReply && (
            <div
              className=" mx-3 hover:underline"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className=" mx-3 hover:underline"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className=" mx-3 hover:underline"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text: string) => addComment(text, replyId)}
          />
        )}
        <hr className="text-sm from-slate-600 to-slate-900"/>
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
