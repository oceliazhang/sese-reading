import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  books: [],
  book: { name: "New Module 123", description: "New Description", author: "Author" },
};


const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books = [action.payload, ...state.books];
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload
      );
    },
    updateBook: (state, action) => {
      state.books = state.books.map((book) => {
        if (book._id === action.payload._id) {
          return action.payload;
        } else {
          return book;
        }
      });
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
  },
});


export const { addBook, deleteBook, updateBook, setBooks, setBook} = booksSlice.actions;
export default booksSlice.reducer;