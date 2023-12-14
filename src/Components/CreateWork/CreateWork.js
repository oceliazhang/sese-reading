import React, { useState } from 'react';
import DefaultImage from '../ToolImages/defaultimage.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './CreateWork.css';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [coverImage, setCoverImage] = useState(DefaultImage);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      introduction,
      coverImage
    };

    axios.post('http://localhost:56100/books', data)
      .then(() => {
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='create-book-container'>
      <h1 className='create-book-title'>Create Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="image-upload-container">
          <label htmlFor="cover-image-upload" className="upload-label">
            <img src={coverImage} alt="Cover" className="cover-image-preview" />
          </label>
          <input
            type="file"
            id="cover-image-upload"
            name="coverImage"
            accept="image/*"
            className="cover-image-input"
            onChange={handleImageChange}
          />
        </div>

        {/* Title Input */}
        <div className='input-container'>
          <label className='input-label'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='text-input'
            placeholder='Enter book title, within 15 words, please do not add special symbols such as book titles.'
          />
        </div>

        {/* Author Input */}
        <div className='input-container'>
          <label className='input-label'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='text-input'
            placeholder='Enter author name'
          />
        </div>

        {/* Introduction Input */}
        <div className='input-container'>
          <label className='input-label'>Introduction</label>
          <input
            type='text'
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className='text-input'
            placeholder='Enter introduction, within 500 words.'
          />
        </div>

        {/* <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            placeholder='Enter publish year'
          />
        </div> */}

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
