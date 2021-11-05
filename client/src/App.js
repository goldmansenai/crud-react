import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  //useState = Defini o estado de uma variável, portanto
  const [movieName, setMovieName] = useState(""); //movieName = ""
  const [review, setReview] = useState(""); //review = ""
  const [movieReviewList, setMovieReviewList] = useState([]); //movieReviewList = []
  const [newReview, setNewReview] = useState(""); //newReview = ""

  useEffect(() => {
    //Utilizamos o Axios mas dava pra usar o fetch()
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data); //movieReviewList = "Dado que o get encontrou no banco"
    });
  }, []);

  const enviar = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    //Dentro da array movieReviewList você tem: [ movieName="x", movieReview="Y" ]
    setMovieReviewList([
      //Os "..." antes do movieReviewList significa que estamos recriando um objeto 
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
      <nav className="navbar navbar-dark bg-dark text-white justify-content-center">
        CRUD APP
      </nav>
      <div>
        <form>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="filme"
              className="form-control"
              //Toda vez que o valor do input mudar, o movieName será: "valor do input"
              onChange={(e) => {
                setMovieName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <input
              type="text"
              name="review"
              className="form-control"
              //Toda vez que o valor do input mudar, o review será: "valor do input"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
          </div>
        </form>
        <button onClick={enviar} className="btn btn-primary">
          Carregar
        </button>
      </div>
      {movieReviewList.map((val) => {
        return (
          <div className="card text-center">
            <div className="card-header">
              <h1>{val.movieName}</h1>
            </div>
            <div className="card-body">
              <img src="" />
              <p>Análise do Filme:</p>
              <p>{val.movieReview}</p>
            </div>
            <div className="card-footer text-muted">
              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
                className="btn btn-primary"
              >
                Deletar
              </button>
              <input
                type="text"
                id="updateInput"
                className="form-control"
                placeholder="Atualizar a análise do filme"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
                className="btn btn-primary"
              >
                Atualizar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
