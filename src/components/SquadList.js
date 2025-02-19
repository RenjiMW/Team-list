import { useState } from "react";
import Button from "./Button";
import Player from "./Player";
import SquadPlayer from "./SquadPlayer";
import SquadSlot from "./SquadSlot";

/////////////////////////////////////
/////////// SQUAD LIST //////////////

export default function SqadList({ players, onRemove, onMove, matchSquad }) {
  const initialFirst = matchSquad.slice(0, 12);
  const initialSecond = matchSquad.slice(12, 15);
  const substitutePlayers = matchSquad.slice(15, 23);

  const squadPlyersNumber = matchSquad.filter(
    (player) => Object.keys(player).length > 0
  );

  return (
    <div className="squadList">
      <h1 className="source-code-pro-tableHeaders">
        Sqad list <span>[{squadPlyersNumber.length}]</span>
      </h1>

      <div className="squadList__startingSquad squadList__startingSquad-1">
        <ul className="squadList__startingSquad__List">
          {initialFirst.map((squadPlayer, index) =>
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

      <div className="squadList__startingSquad squadList__startingSquad-2">
        <ul className="squadList__startingSquad__List">
          {initialSecond.map((squadPlayer, index) =>
            // Sprawdzamy, czy squadPlayer jest pustym obiektem
            Object.keys(squadPlayer).length === 0 ? (
              <SquadSlot
                key={index}
                index={index + 12}
                player={squadPlayer}
                onRemove={onRemove}
              /> // Renderujemy EmptySlot dla pustych miejsc
            ) : (
              <SquadPlayer
                player={squadPlayer}
                key={squadPlayer.id || index} // Zastosowanie index jako klucza rezerwowego
                index={index + 12}
                onRemove={onRemove}
                onMove={onMove}
                matchSquad={matchSquad}
                matchSquadLength={matchSquad.length}
              />
            )
          )}
        </ul>
      </div>

      <div className="squadList__substitutePlayers">
        <h2>Substitute players list</h2>
        <ul className="squadList__substitutePlayers__List">
          {substitutePlayers.map((squadPlayer, index) =>
            // Sprawdzamy, czy squadPlayer jest pustym obiektem
            Object.keys(squadPlayer).length === 0 ? (
              <SquadSlot
                key={index}
                index={index + 15}
                player={squadPlayer}
                onRemove={onRemove}
              /> // Renderujemy EmptySlot dla pustych miejsc
            ) : (
              <SquadPlayer
                player={squadPlayer}
                key={squadPlayer.id || index + 15} // Zastosowanie index jako klucza rezerwowego
                index={index + 15}
                onRemove={onRemove}
                onMove={onMove}
                matchSquad={matchSquad}
                matchSquadLength={matchSquad.length}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

/*
- generalnie player powinien znikać z Listy dostępnych 
i pojawiać się na liście Squadu, może nawet powinna być
możliwa dokładnie taka sama edycja jak w Liście dostępnych
*/

// return (
//   <div className="sqadList">
//     <h1 className="source-code-pro-tableHeaders">Sqad list</h1>
//     {/* Log to console
//     <Button
//       onClick={() => {
//         console.log(matchSquad);
//       }}
//     >
//       Log squad to console
//     </Button>
//     */}
//     <div className="squadList__startingSquad">
//       <ul className="squadList__startingSquadList">
//         {/* {matchSquad.map((squadPlayer, index) =>
//           // Sprawdzamy, czy squadPlayer jest pustym obiektem
//           Object.keys(squadPlayer).length === 0 ? (
//             <SquadSlot
//               key={index}
//               index={index}
//               player={squadPlayer}
//               onRemove={onRemove}
//             /> // Renderujemy EmptySlot dla pustych miejsc
//           ) : (
//             <SquadPlayer
//               player={squadPlayer}
//               key={squadPlayer.id || index} // Zastosowanie index jako klucza rezerwowego
//               index={index}
//               onRemove={onRemove}
//               onMove={onMove}
//               matchSquad={matchSquad}
//               matchSquadLength={matchSquad.length}
//             />
//           )
//         )} */}
//         {matchSquad.map((squadPlayer, index) =>
//           // Sprawdzamy, czy squadPlayer jest pustym obiektem
//           Object.keys(squadPlayer).length === 0 ? (
//             <SquadSlot
//               key={index}
//               index={index}
//               player={squadPlayer}
//               onRemove={onRemove}
//             /> // Renderujemy EmptySlot dla pustych miejsc
//           ) : (
//             <SquadPlayer
//               player={squadPlayer}
//               key={squadPlayer.id || index} // Zastosowanie index jako klucza rezerwowego
//               index={index}
//               onRemove={onRemove}
//               onMove={onMove}
//               matchSquad={matchSquad}
//               matchSquadLength={matchSquad.length}
//             />
//           )
//         )}
//       </ul>
//     </div>

//     <div className="squadList__substitutepPlayers">
//       <ul className="squadList__substitutepPlayersList">
//         Substitute players list
//       </ul>
//     </div>
//   </div>
// );
