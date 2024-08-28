import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Blog from '../../type/blog';


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
  const response = await fetch('http://blogapp.tryasp.net/api/blogs');
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
});

// Define a thunk for fetching a single blog by ID
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id: string) => {
  const response = await fetch(`http://blogapp.tryasp.net/api/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
});

// Define a thunk for fetching related blogs by skills
export const fetchRelatedBlogsBySkills = createAsyncThunk(
  'blogs/fetchRelatedBlogsBySkills',
  async (skills: string[]) => {
    const response = await fetch('http://blogapp.tryasp.net/api/related-blogs', {
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
  reducers: {
    filterBlogs: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.blogs = state.blogs.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
  },
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


export const { filterBlogs } = blogSlice.actions;
export default blogSlice.reducer;