import { useState } from "react";

export default function SquadSlot({ player, key, index, onRemove }) {
  return (
    <li className="squadSlot">
      <div className="squadSlot__div">
        <h3>Empty Slot </h3>
        <p className="squadSlot__div__number">{index + 1}</p>
      </div>
      <div className="squadSlot__action">
        {/* {index + 1 > 15 ? (
          <button type="button" onClick={() => onRemove(index)}>
            ❌
          </button>
        ) : (
          ""
        )} */}
      </div>
    </li>
  );
}
