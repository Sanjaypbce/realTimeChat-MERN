import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const LoginUser = createAsyncThunk(
  "user/loginUser",
  async (loginForm) => {
    try {
      const response = await axios.post(`${url}/login`, loginForm);

      if (response.data) {
        return { ...response.data };
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error; // Throw the error to be handled by the rejected action
    }
  }
);

// New thunk to fetch user data using the token
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token) => {
    try {
      const response = await axios.get(`${url}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("here", { response });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Throw the error to be handled by the rejected action
    }
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = true;
      })
      // Handle fetchUserData actions
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { todoAdded, todoToggled } = UserSlice.actions;
export default UserSlice.reducer;
