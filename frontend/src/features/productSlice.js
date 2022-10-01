import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    error: null
};

export const productsFetch = createAsyncThunk(
    'products/productsFetch',
    async (id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5001/products");
            return response?.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = 'loading';
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export default productSlice.reducer;