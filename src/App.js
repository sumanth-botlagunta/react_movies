import React, { useState, useEffect } from 'react';

import Movie from './Movie';

import './app.css';
import SearchIcon from './Searchicon.svg';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const baseURL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const App = () => {
    const [searchTerm, setsearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        searchMovies('batman')
    },[])
    const searchMovies = async (title) => {
        const response = await fetch(`${baseURL}s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    return (
        <div className='app'>
            <h1>GetMovie</h1>
            <div className="search">
                <input
                    value={searchTerm}
                    placeholder="Search for a movie"
                    onChange={(e) => { 
                        setsearchTerm(e.target.value);
                    }} />
                <img 
                src={SearchIcon} 
                alt="Search Icon"
                onClick={()=>{searchMovies(searchTerm)}} />

            </div>
            <div className="container">
                {movies.length > 0 ?(
                     movies.map((movie)=>(
                        <Movie movie={movie} key={movie.imdbID} />
                    ))
                ):(
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
                   }
            </div>
        </div>
    );
};

export default App;