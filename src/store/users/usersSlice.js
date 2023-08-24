import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
}
const url = 'https://randomuser.me/api/?results=5';

const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
  try {
    const resp = await axios(url);
    return resp.data.results
  } catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Sorry, something went wrong!';
      })
  }
})

export { fetchUsers }

export default usersSlice.reducer;