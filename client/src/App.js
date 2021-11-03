import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <div>
        <label>Nome</label>
        <input type="text" name="filme"/>
        <label>Review</label>
        <input type="text" name="review"/>
        <button>Carregar</button>
      </div>
    </div>
  );
}

export default App;
