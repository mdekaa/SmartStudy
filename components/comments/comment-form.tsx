import React, { useState, FormEvent, ChangeEvent } from "react";

interface CommentFormProps {
  handleSubmit: (text: string) => void;
  submitLabel: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
  initialText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="text-sm text-gray-900 bg-gray-50 border w-3/4 resize-none"
        placeholder="type your doubts here..." 
        value={text}
        onChange={onChange}
      />
      <button className="py-2.5 px-5 me-2 mb-2 rounded-full bg-gradient-to-r from-blue-950 to-pink-600 text-white float-right" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
