import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/register', userData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };
  
  const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createUser.fulfilled, (state) => {
          state.status = 'succeeded';
          state.error = null;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error;
        });
    },
  });

export default createUserSlice.reducer;