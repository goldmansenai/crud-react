import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const enviar = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="filme"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={enviar}>Carregar</button>
      </div>
      {movieReviewList.map((val) => {
        return (
          <div className="card">
            <h1>{val.movieName}</h1>
            <p>Moview Review: {val.movieReview}</p>
            <button
              onClick={() => {
                deleteReview(val.movieName);
              }}
            >
              Deletar
            </button>
            <input
              type="text"
              id="updateInput"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateReview(val.movieName);
              }}
            >
              Atualizar
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
