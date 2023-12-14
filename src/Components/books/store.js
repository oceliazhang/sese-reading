import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksReducer";


const store = configureStore({
  reducer: {
    booksReducer
  }
});


export default store;