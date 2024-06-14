interface CommentType {
    id: string;
    body: string;
    parentId: string | null;
    userId: string;
    username: string;
    createdAt: string;
  }
  
  export const createComment = async (
    text: string,
    parentId: string | null = null
  ): Promise<CommentType> => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "Anonymous",
      createdAt: new Date().toISOString(),
    };
  };
  
  export const updateComment = async (text: string): Promise<{ text: string }> => {
    return { text };
  };
  
  export const deleteComment = async (): Promise<{}> => {
    return {};
  };
  