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

  /* ===================================
  ------- ADDING PLAYER TO SQUAD -------
  =====================================*/

  const handleAddPlayerToSquad = (squadPlayer) => {
    // Sprawdzamy, czy zawodnik już jest w składzie
    if (matchSquad.some((player) => player.id === squadPlayer.id)) return;

    // Znajdź pierwsze puste miejsce w składzie (obiekt bez id)
    const firstEmptySlotIndex = matchSquad.findIndex((player) => !player.id);

    // Jeżeli jest puste miejsce, wstaw zawodnika w to miejsce
    if (firstEmptySlotIndex !== -1) {
      setMatchSquad((squadPlayers) => {
        const newSquad = [...squadPlayers];
        newSquad[firstEmptySlotIndex] = squadPlayer;
        return newSquad;
      });

      setPlayers((players) =>
        players.filter((player) => player.id !== squadPlayer.id)
      );
    }

    // Jeżeli nie ma pustego miejsca i liczba zawodników jest poniżej 23, dodaj nowe miejsce
    else if (matchSquad.length < 23) {
      setMatchSquad((squadPlayers) => [...squadPlayers, squadPlayer]);
      setPlayers((players) =>
        players.filter((player) => player.id !== squadPlayer.id)
      );
    }
  };

  ///////////////////////////////////////////
  ///////////////////////////////////////////

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

  /* ===================================
  ----- REMOVING PLAYER FROM SQUAD -----
  =====================================*/

  const handleRemoveFromSquad = (id) => {
    if (id > 13 && id < 23) {
      console.log(
        `Deleting empty slot (between 16 to 23) and it's exact number is ${
          id + 1
        }`
      );

      setMatchSquad((matchSquad) => {
        const updatedSquad = matchSquad.filter((player, index) => index !== id);
        return updatedSquad;
      });
    } else {
      const playerToRemove = matchSquad.find((player) => player.id === id);
      const indexPlayerToRemove = matchSquad.indexOf(playerToRemove);

      console.log(`index to remove ${indexPlayerToRemove}`);
      console.log(`Removerd player name ${playerToRemove.playerName}`);

      if (!playerToRemove) {
        console.log("Player not found in the squad");
        return;
      }

      // Przywróć zawodnika na listę dostępnych
      setPlayers((players) => {
        if (Object.keys(playerToRemove).length === 0) {
          return players;
        }
        return [...players, playerToRemove];
      });

      setMatchSquad((matchSquad) => {
        let updatedSquad;

        if (indexPlayerToRemove <= 14) {
          updatedSquad = matchSquad.map((squadPlayer) =>
            squadPlayer.id === id ? {} : squadPlayer
          );
        } else if (matchSquad.length >= 16 && indexPlayerToRemove > 14) {
          console.log(matchSquad.length);
          updatedSquad = matchSquad.filter(
            (player, index) => index !== indexPlayerToRemove
          );
          console.log(matchSquad.length);
        }

        return updatedSquad;
      });

      console.log(" ========== end of function ========== ");
    }
  };

  //////////////////////////////////////////
  //////////////////////////////////////////

  function handleShowAddPlayer() {
    setShowAddPlayer((show) => !show);
  }

  return (
    <>
      <div className="userInterface">
        <div className="appHeader">
          <h1 className="appHeader__mainHeader">
            Squad
            <br />
            assembler
          </h1>
          <h2 className="appHeader__secondaryHeader">
            Simple Rugby Team Manager
          </h2>
        </div>

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
