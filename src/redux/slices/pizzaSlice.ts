import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";
import { Sort } from "./filterSlice";

export type SearchPizzaParams = {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: string
}

type Pizza = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params: SearchPizzaParams) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
        `https://66c9fd0759f4350f064e1891.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    
    return data as Pizza[]
});

const pizzaSlice = createSlice({
    name: "pizza",
    initialState: initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = Status.ERROR
                state.items = []
            });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;