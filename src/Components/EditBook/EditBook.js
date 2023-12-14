import React from 'react';
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function EditBook() {

    const { bookId } = useParams();
    console.log(bookId);

    const BOOKS_API_BASE = "http://localhost:56100/api/books/";
    const CHAPTER_API_BASE = "http://localhost:56100/api/chapters/";

    const [account, setAccount] = useState(null);
    const [curBook, setCurBook] = useState({ name: '', description: '' });

    const [chaptersList, setChaptersList] = useState([]);
    const navigate = useNavigate();

    const fetchAccount = async () => {
        const curAccount = await client.account();
        setAccount(curAccount);
    };

    const fetchBook = async (bookId) => {
        try {
            const response = await axios.get(`${BOOKS_API_BASE}${bookId}`);
            setCurBook(response.data);
        } catch (error) {
            console.error("Error fetching books in <EditBook/> fetchBook:", error);
        }
    };

    //allchaptersinbooksorted/:bookId"
    const fetchChapters = async (bookId) => {
        try {
            const response = await axios.get(`${CHAPTER_API_BASE}allchaptersinbooksorted/${bookId}`);
            setChaptersList(response.data);
        } catch (error) {
            console.error("Error fetching books in <EditBook/> fetchChapters:", error);
        }
    };

    useEffect(() => {
        if (bookId) {
            fetchAccount();
            fetchBook(bookId);
            fetchChapters(bookId);
        }
    }, [bookId]);
    

    //这个函数在任何input被submit之后都会被调用，改书名，改书简洁，都会调用，就是讲curBook一整个作为一个JSON发送给api
    const updateBook = async () => {
        const response = await axios
            .put(`${BOOKS_API_BASE}${bookId}`,curBook);
        console.log(response.data);
    };

    return (
        <div>
            <h1>bookId here{bookId}</h1>
            <h2>{curBook.title}</h2>
            <p>{curBook.introduction}</p>


            <input
                onChange={(e) => setCurBook({ ...curBook, introduction: e.target.value })}
                className="form-control" type="text" value={curBook.introduction} />
            <button onClick={updateBook}
                className="w-100 btn btn-danger mb-2">
                change book introduction
            </button>


            <h2>{JSON.stringify(curBook)}</h2>
            {/* <h2>{JSON.stringify(chaptersList)}</h2> */}
            <div className="list-group">

                {chaptersList
                    .map((chapter, index) => (
                        <div key={index} className="list-group-item list-group-item-secondary align-items-center mb-4">
                            <h3>{chapter.chapterName}</h3>
                            <p>{chapter.chapterContent}</p>
                            <p>look!!!!!!!!!!!!!</p>
                            <button>work on it</button>
                        </div>
                    ))}
            </div>
            <button>creat new work</button>
        </div>
    );
}

export default EditBook;