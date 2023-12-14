import axios from "axios";

const BASE_API = "http://localhost:56100"; 

const COMMENTS_API = `${BASE_API}/api/comments`;

export const addComment = async (comment) => {
  try {
    const response = await axios.post(`${COMMENTS_API}`, comment);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export const findAllComments = async () => {
  try {
    const response = await axios.get(`${COMMENTS_API}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const findCommentByUserId = async (readerId) => {
  try {
    console.log(readerId)
    const response = await axios.get(`${COMMENTS_API}/user`, { params: { readerId: readerId } });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments with user's ID ${readerId}:`, error);
    throw error;
  }
};

export const findCommentByBookId = async (bookId) => {
    try {
    const response = await axios.get(`${COMMENTS_API}/book`, { params: { bookId: bookId } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching comment with book's ID ${bookId}:`, error);
      throw error;
    }
  };

export const deleteComment = async (commentId) => {
  try {
    // api/comment/123
    const response = await axios.delete(`${COMMENTS_API}/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment with ID ${commentId}:`, error);
    throw error;
  }
};