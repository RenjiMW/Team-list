import { useState } from "react";
import Button from "./Button";
import Player from "./Player";
import SquadPlayer from "./SquadPlayer";
import SquadSlot from "./SquadSlot";

/////////////////////////////////////
/////////// SQUAD LIST //////////////

export default function SqadList({ players, onRemove, onMove, matchSquad }) {
  return (
    <div className="sqadList">
      <h1>Sqad List</h1>
      <Button
        onClick={() => {
          console.log(matchSquad);
        }}
      >
        Log squad to console
      </Button>
      <ul>
        {matchSquad.map((squadPlayer, index) => (
          <SquadPlayer
            player={squadPlayer}
            key={squadPlayer.id}
            index={index}
            onRemove={onRemove}
            onMove={onMove}
            matchSquad={matchSquad}
            matchSquadLength={matchSquad.length}
          />
        ))}
      </ul>
    </div>
  );
}

/*
- generalnie player powinien znikać z Listy dostępnych 
i pojawiać się na liście Squadu, może nawet powinna być
możliwa dokładnie taka sama edycja jak w Liście dostępnych

*/
