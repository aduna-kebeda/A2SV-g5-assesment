import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Author {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

interface Blog {
  _id: string;
  image: string;
  title: string;
  description: string;
  author: Author | null;
  isPending: boolean;
  tags: string[];
  likes: number;
  relatedBlogs: Blog[]; // Adjust based on related blogs structure if needed
  skills: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogState {
  blogs: Blog[];
  selectedBlog: Blog | null;
  relatedBlogs: Blog[]; // Add this to manage related blogs
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  selectedBlog: null,
  relatedBlogs: [], // Initialize related blogs state
  loading: false,
  error: null,
};

// Define a thunk for fetching blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await fetch('https://a2sv-backend.onrender.com/api/blogs');
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
});

// Define a thunk for fetching a single blog by ID
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id: string) => {
  const response = await fetch(`https://a2sv-backend.onrender.com/api/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
});

// Define a thunk for fetching related blogs by skills
export const fetchRelatedBlogsBySkills = createAsyncThunk(
  'blogs/fetchRelatedBlogsBySkills',
  async (skills: string[]) => {
    const response = await fetch('https://a2sv-backend.onrender.com/api/related-blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills })
    });
    if (!response.ok) throw new Error('Failed to fetch related blogs');
    return response.json();
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch blogs';
        state.loading = false;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.loading = false;
        // Fetch related blogs based on the skills of the selected blog
        if (state.selectedBlog) {
          state.relatedBlogs = state.blogs.filter(blog =>
            blog.skills.some(skill => state.selectedBlog!.skills.includes(skill))
          );
        }
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch blog';
        state.loading = false;
      })
      .addCase(fetchRelatedBlogsBySkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedBlogsBySkills.fulfilled, (state, action) => {
        state.relatedBlogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchRelatedBlogsBySkills.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch related blogs';
        state.loading = false;
      });
  },
});

export default blogSlice.reducer;