import React from 'react';
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function EditChapter() {

    const { chapterId } = useParams();
    //const BASE_API = process.env.REACT_APP_API_BASE || "http://localhost:56100";

    const BOOKS_API_BASE = "http://localhost:56100/api/books/";
    const CHAPTER_API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:56100/api/chapters/";

    const [curChapter, setCurChapter] = useState({ chapterContent: '', chapterName: '' });

    const navigate = useNavigate();

    const fetchChapter = async (chapterId) => {
        try {
            const response = await axios.get(`${CHAPTER_API_BASE}updatechapter/${chapterId}`);
            setCurChapter(response.data);
        } catch (error) {
            console.error("Error fetching books in <EditChapter/> fetchChapter:", error);
        }
    };

    useEffect(() => {
        if (chapterId) {
            fetchChapter(chapterId);
        }
    }, [chapterId]);
    

    //这个函数在任何input被submit之后都会被调用，改书名，改书简洁，都会调用，就是讲curBook一整个作为一个JSON发送给api
    const updatechapter = async () => {
        const response = await axios
            .put(`${CHAPTER_API_BASE}updatechapter/${chapterId}`,curChapter);
        console.log(response.data);
    };

    return (
        <div>
            <h1>chapterId here{chapterId}</h1>
            <h2>{curChapter.chapterName}</h2>
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

export default EditChapter;