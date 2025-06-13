
export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export interface CreateBlogFormData {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface UpdateBlogFormData extends CreateBlogFormData {
  id: string;
}
