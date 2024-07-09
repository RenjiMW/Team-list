import { useState, useEffect } from "react";
import "./App.scss";

import ActionBar from "./components/ActionBar";
import PlayersList from "./components/PlayerList";
import SqadList from "./components/SquadList";
// import RugbyStorage from "./components/Storage";

/////////////////////////////
/////////// APP /////////////

/* Opis funckji
#Funkja gówna 
- zawiera 3 kawałki stanu
  - showAddPlayer, który ma wartość booleon i 
    pozwala wyświetlić ankietę dotyczącą dodawania nowego gracza
  - players, który odpala funkcję, która przypisuje do zmiennej savedPlayers
    zawartość localStorage przypisaną pod kluczem "players" 
    oraz zawsze zwraca wartość przypisną pod savedPlayers, 
    chyba że taka nie istenije, i w takim wypadku zwraca pustą tablię

- funkcja odpala React Hook - UseEffect, który powoduje odpalenie 
  zawartej funkcji za każdym razem, gdy nastąpo zmiana w stanie "players"
*/
export default function App() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  ////// pleayer fatures props - START
  /* Opis 'handleConfirmNewPlayer'
    - to zmienna do której przypisana jest funkcja, która 
      przyjmuje parametr 'player'
    - używa funkcji zmienniającej kawałek stanu, która 
      dodaje do tablicy nowy element
   */

  const handleConfirmNewPlayer = (player) => {
    setPlayers((players) => [...players, player]);
  };

  ///// --- EDIT PLAYER --- /////
  const handleEditPlayer = (id, newValues) => {
    setPlayers((players) =>
      players.map((player) =>
        player.id === id
          ? {
              ...player,
              ...newValues,
              positon: newValues.positon || player.positon,
              age: newValues.age || player.age,
              weight: newValues.weight || player.weight,
              height: newValues.height || player.height,
              matches: newValues.matches || player.matches,
            }
          : player
      )
    );
  };

  const handleRemovePlayer = (id) => {
    if (window.confirm("Are you sure you want to remove this player?")) {
      setPlayers((players) => players.filter((player) => player.id !== id));
    } else {
      return;
    }
  };

  function handleShowAddPlayer() {
    setShowAddPlayer((show) => !show);
  }

  return (
    <>
      <div className="appHeader">
        <h1>Simple Rugby Team Manager</h1>
      </div>
      <div className="userInterface">
        <ActionBar
          onAddPlayer={handleShowAddPlayer}
          showAddPlayer={showAddPlayer}
          onConfirmNewPlayer={handleConfirmNewPlayer}
          players={players}
        />
        <PlayersList
          players={players}
          onEdit={handleEditPlayer}
          onRemove={handleRemovePlayer}
        />
        <SqadList players={players} />
      </div>
    </>
  );
}
