import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies/')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the movies!", error);
      });
  }, []);

  const handleMovieClick = (movieId) => {
    const movie = movies.find(movie => movie.id === movieId);
    setSelectedMovie(movie);
  };

  return (
    <div className="App" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519114056088-b877fe073a5e?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', minHeight: '100vh', backgroundAttachment: 'fixed' }}>
      <header className="bg-dark text-white text-center py-5">
        <h1>Movie Description App</h1>
      </header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="list-group" style={{ height: '300px', overflowY: 'scroll' }}>
              {movies.map(movie => (
                <button
                  key={movie.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  {movie.name}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-8">
            {selectedMovie && (
              <div className="card">
                <div className="card-body">
                  <h2>{selectedMovie.name}</h2>
                  <p>{selectedMovie.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
