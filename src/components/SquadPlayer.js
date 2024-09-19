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
      <div className="squadPlayer__info">
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
        <div className="squadPlayer__info__header"></div>
        <h2>{player.playerName}</h2>
        <h1 className="squadPlayer__number">{index + 1}</h1>
      </div>

      <div className="player__action">
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
