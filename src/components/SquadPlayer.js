import { useState } from "react";

/////////////////////////////////////
/////////// SQUAD PLayer /////////////

export default function SquadPlayer({
  player,
  key,
  index,
  onRemove,
  onMove,
  matchSquad,
  matchSquadLength,
}) {
  const [isError, setIsError] = useState(false);

  return (
    <li className="squadPlayer">
      {/*==============================
      ----------- PLAYER INFO ----------
      {/*============================== */}
      <div className="squadPlayer__info">
        {/* ====== Player avatar ====== */}
        {isError ? (
          <img
            src="\assets\images\avatar 2.webp"
            alt="anonim"
            width="60"
            className="squadPlayer__info__img"
          ></img>
        ) : (
          <img
            src={player.image}
            onError={() => setIsError(true)}
            alt="anonim"
            width="60"
            className="squadPlayer__info__img"
          ></img>
        )}

        {/* ====== Player name ====== */}
        <h2 className="squadPlayer__info__name">{player.playerName}</h2>

        {/* ====== Position number ====== */}
        <h1 className="squadPlayer__info__number">{index + 1}</h1>
      </div>

      {/*==============================
      ----------- ACTION BAR ----------
      {/*============================== */}
      <div className="squadPlayer__action">
        <button onClick={() => onMove(index, index - 1)} disabled={index === 0}>
          🔼
        </button>
        <button type="button" onClick={() => onRemove(player.id)}>
          ❌
        </button>
        <button
          onClick={() => onMove(index, index + 1)}
          disabled={index === matchSquadLength - 1}
        >
          🔽
        </button>
      </div>
    </li>
  );
}
