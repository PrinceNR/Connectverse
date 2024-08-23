import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const mainAPI = "http://localhost:4000/admin"


export const createUser = createAsyncThunk( "admin/", async(data) => {
    console.log(data);
    const response = await axios(`${mainAPI}/signup`, data)
    return response.data
})
export const loginUser = createAsyncThunk( "admin/", async(data) => {
    const response = await axios(`${mainAPI}/login`, data)
    return response.data
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        token: '',
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logOut: (state) => {
            state.name = ''
            state.email = ''
            state.token = ''
            state.isLoggedIn = false
        },
    },
    extraReducers: {
        
    },
})