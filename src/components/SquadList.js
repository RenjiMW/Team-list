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
      <h1 className="source-code-pro-tableHeaders">Sqad list</h1>

      {/* Log to console 
      <Button
        onClick={() => {
          console.log(matchSquad);
        }}
      >
        Log squad to console
      </Button> 
      */}

      <ul className="squadList__list">
        {matchSquad.map((squadPlayer, index) =>
          // Sprawdzamy, czy squadPlayer jest pustym obiektem
          Object.keys(squadPlayer).length === 0 ? (
            <SquadSlot
              key={index}
              index={index}
              player={squadPlayer}
              onRemove={onRemove}
            /> // Renderujemy EmptySlot dla pustych miejsc
          ) : (
            <SquadPlayer
              player={squadPlayer}
              key={squadPlayer.id || index} // Zastosowanie index jako klucza rezerwowego
              index={index}
              onRemove={onRemove}
              onMove={onMove}
              matchSquad={matchSquad}
              matchSquadLength={matchSquad.length}
            />
          )
        )}
      </ul>
    </div>
  );
}

/*
- generalnie player powinien znikać z Listy dostępnych 
i pojawiać się na liście Squadu, może nawet powinna być
możliwa dokładnie taka sama edycja jak w Liście dostępnych

*/
