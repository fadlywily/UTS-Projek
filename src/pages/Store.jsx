import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://api.sampleapis.com/playstation/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <h1>🎮 PlayStation Games</h1>
      <div className="grid">
        {games.slice(0, 12).map((game, index) => (
          <div key={index} className="card">
            {/* Karena API ga ada gambar → pakai fallback */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/07/PlayStation_logo.svg"
              alt={game.name}
              className="thumbnail"
            />
            <div className="info">
              <h3>{game.name}</h3>
              <p>{game.releaseDates?.[0] || "Unknown release date"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;