import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaSliceState, Status, SearchPizzaParams, Pizza } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
};

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;