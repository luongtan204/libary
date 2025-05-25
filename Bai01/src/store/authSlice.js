import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async thunk for login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Validate input
    if (!credentials.email || !credentials.password) {
      throw new Error('Vui lòng nhập đầy đủ email và mật khẩu');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Email không hợp lệ');
    }

    // Validate password length
    if (credentials.password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
    }
    
    // Fetch users from db.json
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    
    // Find user by email first
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống');
    }

    // Then check password
    if (user.password !== credentials.password) {
      throw new Error('Mật khẩu không chính xác');
    }

    // If all validations pass, create token and login
    const token = `token-${user.id}-${Date.now()}`;
    dispatch(loginSuccess({ token, user }));
    
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer; 