import React, { useState } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchForm.scss';

interface IProps {
  searchHandler: (query: string) => void;
}

export default function SearchForm({ searchHandler }: IProps) {
  const [query, setQuery] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Nothing found, repeat search! 😊');
      return;
    }

    searchHandler(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="movieInput"
            type="text"
            name="movie"
            placeholder="Enter movie name..."
            autoComplete="off"
            onChange={handleInput}
            value={query}
          />
        </label>
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
      <ToastContainer
        transition={Zoom}
        autoClose={4000}
        toastStyle={{ backgroundColor: '#c0c0c0' }}
      />
    </>
  );
}
