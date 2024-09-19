import { useState, useEffect } from "react";
import "./App.scss";

import ActionBar from "./components/ActionBar";
import PlayersList from "./components/PlayerList";
import SqadList from "./components/SquadList";
// import RugbyStorage from "./components/Storage";

/////////////////////////////
/////////// APP /////////////

export default function App() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });
  const [matchSquad, setMatchSquad] = useState(() => {
    const savedSquad = localStorage.getItem("matchSquad");
    return savedSquad
      ? JSON.parse(savedSquad)
      : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("matchSquad", JSON.stringify(matchSquad));
  }, [matchSquad]);

  const handleConfirmNewPlayer = (player) => {
    setPlayers((players) => [...players, player]);
  };

  const handleAddPlayerToSquad = (squadPlayer) => {
    // Sprawdzamy, czy zawodnik już jest w składzie
    if (matchSquad.some((player) => player.id === squadPlayer.id)) return;

    // Znajdź pierwsze puste miejsce w składzie (obiekt bez id)
    const firstEmptySlotIndex = matchSquad.findIndex((player) => !player.id);

    if (firstEmptySlotIndex !== -1) {
      // Wstaw zawodnika w pierwsze wolne miejsce
      setMatchSquad((squadPlayers) => {
        const newSquad = [...squadPlayers];
        newSquad[firstEmptySlotIndex] = squadPlayer;
        return newSquad;
      });

      // Usuń zawodnika z listy dostępnych
      setPlayers((players) =>
        players.filter((player) => player.id !== squadPlayer.id)
      );
    }
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

  /// MOVING ITEMS IN ARRAY
  const moveItem = (fromIndex, toIndex) => {
    setPlayers((prevItems) => {
      const updatedItems = [...prevItems];
      const itemToMove = updatedItems.splice(fromIndex, 1)[0];
      updatedItems.splice(toIndex, 0, itemToMove);
      return updatedItems;
    });
  };

  const moveItemInSquad = (fromIndex, toIndex) => {
    setMatchSquad((prevItems) => {
      const updatedItems = [...prevItems];
      const itemToMove = updatedItems.splice(fromIndex, 1)[0];
      updatedItems.splice(toIndex, 0, itemToMove);
      return updatedItems;
    });
  };

  const handleRemovePlayer = (id) => {
    if (window.confirm("Are you sure you want to remove this player?")) {
      setPlayers((players) => players.filter((player) => player.id !== id));
    } else {
      return;
    }
  };

  const handleRemoveFromSquad = (id) => {
    // Znajdź zawodnika, który ma zostać usunięty ze składu
    const playerToRemove = matchSquad.find((player) => player.id === id);

    // Przywróć zawodnika na listę dostępnych
    setPlayers((players) => [...players, playerToRemove]);

    // Ustaw miejsce po usuniętym zawodniku na puste (obiekt bez id)
    setMatchSquad((matchSquad) =>
      matchSquad.map((squadPlayer) =>
        squadPlayer.id === id ? {} : squadPlayer
      )
    );
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
          matchSquad={matchSquad}
          onEdit={handleEditPlayer}
          onRemove={handleRemovePlayer}
          onMove={moveItem}
          onAddToSquad={handleAddPlayerToSquad}
        />
        <SqadList
          players={players}
          matchSquad={matchSquad}
          onRemove={handleRemoveFromSquad}
          onMove={moveItemInSquad}
        />
      </div>
    </>
  );
}
