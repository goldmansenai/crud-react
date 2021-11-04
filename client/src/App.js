import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieReviewList(response.data)
    })
  })

  const enviar = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert("successful insert");
    });
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
      {movieReviewList.map((val)=>{
        return <h1>MovieName: {val.movieName} | Moview Review: {val.movieReview}</h1>
      })}
    </div>
  );
}

export default App;
