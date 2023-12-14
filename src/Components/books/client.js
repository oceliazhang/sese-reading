import axios from "axios";

//const BASE_API = "http://localhost:56100"; 
//const BASE_API = process.env.REACT_APP_API_BASE || "http://localhost:56100";
export const BASE_API ='https://sese-reading-node.onrender.com';

const BOOKS_API = `${BASE_API}/api/books`;


export const createBook = async (book) => {
  try {
    const response = await axios.post(`${BOOKS_API}`, book);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const findAllBooks = async () => {
  try {
    const response = await axios.get(`${BOOKS_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const findBookById = async (bookId) => {
  try {
    const response = await axios.get(`${BOOKS_API}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    throw error;
  }
};

export const updateBook = async (bookId, updatedBook) => {
  try {
    const response = await axios.put(`${BOOKS_API}/${bookId}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${bookId}:`, error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${BOOKS_API}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${bookId}:`, error);
    throw error;
  }
};

export const fetchBooksByAuthor = async (authorId) => {
  try {
    const response = await axios.get(`${BOOKS_API}/author/${authorId}`);
    console.log("response",response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by author with ID ${authorId}:`, error);
    throw error;
  }
}