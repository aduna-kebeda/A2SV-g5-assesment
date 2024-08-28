interface Blog {
    _id: string;
    image: string;
    title: string;
    description: string;
    author:  {
      image: string;
      name: string;
      role: string;
      email:string;
    } | null;
    createdAt: string;
    skills: string[];
    likes: number;
    tags:string[];
  }
export default Blog;