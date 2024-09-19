import { useState } from "react";

export default function SquadSlot({ player }) {
  return (
    <li className="squadSlot">
      <div>
        {player && player.id ? (
          <h3>{player.playerName}</h3>
        ) : (
          <h3>Empty Slot</h3> // Wyświetlamy "Empty Slot" dla pustych miejsc
        )}
      </div>
    </li>
  );
}
