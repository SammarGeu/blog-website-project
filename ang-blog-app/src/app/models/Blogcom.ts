export interface BlogComment{
    id?: string;
    postID: string;
    username: string;
    content: string;
    createdAt: Date;
    parentId: string|null;
  }