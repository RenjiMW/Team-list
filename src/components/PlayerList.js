import { useState } from "react";
import Button from "./Button";
import Player from "./Player";

/////////////////////////////////////////////
/////////////// PLAYERS LIST ////////////////

export default function PlayersList({
  players,
  onRemove,
  onEdit,
  onMove,
  onAddToSquad,
  matchSquad,
}) {
  const filteredPlayers = players.filter(
    (player) => !matchSquad.some((squadPlayer) => squadPlayer.id === player.id)
  );

  return (
    <div className="playersList">
      <h1>Players List</h1>
      <Button
        onClick={() => {
          console.log(players);
        }}
      >
        Log to console
      </Button>
      <ul>
        {filteredPlayers.map((player, index) => (
          <Player
            player={player}
            key={player.id}
            onRemove={onRemove}
            onEdit={onEdit}
            players={players}
            onMove={onMove}
            index={index}
            playersLength={players.length}
            onAddToSquad={onAddToSquad}
          />
        ))}
      </ul>
    </div>
  );
}

/*
Po mojemu powinno to tak wyglądać, że 
- jeśli player.id === squadPlayer.id to wtedy nie pokazu
  - if (player.id === squadPlayer.id) 


*/
