import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params: SearchPizzaParams) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
        `https://66c9fd0759f4350f064e1891.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    
    return data as Pizza[]
});