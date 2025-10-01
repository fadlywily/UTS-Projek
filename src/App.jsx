import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/games") // ini akan otomatis proxy ke FreeToGame
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error: " + res.status);
        }
        return res.json();
      })
      .then((data) => setGames(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🎮 PlayStation Store</h1>
      <h2>Latest Games</h2>

      <input
        type="text"
        placeholder="Search game..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filteredGames.map((game) => (
          <div key={game.id} className="card">
            <img src={game.thumbnail} alt={game.title} />
            <div className="card-body">
              <h3>{game.title}</h3>
              <p>{game.release_date}</p>
              <button
                onClick={() => window.open(game.game_url, "_blank")}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;