import { useState } from "react";
import Button from "./Button";

/////////////////////////////////////////////
/////////////// PLAYERS LIST ////////////////

export default function PlayersList({ players, onRemove, onEdit }) {
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
        {players.map((player) => (
          <Player
            player={player}
            key={player.id}
            onRemove={onRemove}
            onEdit={onEdit}
            players={players}
          />
        ))}
      </ul>
    </div>
  );
}

/////////////////////////////////////
/////////// PLAYER INFO ////////////

function Player({ players, player, onRemove, onEdit }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const toggleDopdown = () => setShowOptions(!showOptions);

  function handleShowEditForm() {
    setShowEditForm((show) => !show);
  }

  return (
    <li className="player">
      <div className="player__info">
        {isError ? (
          <img
            src="\assets\images\avatar 2.webp"
            alt="anonim"
            width="60"
            className="player__info__img"
          ></img>
        ) : (
          <img
            src={player.image}
            onError={() => setIsError(true)}
            alt="anonim"
            width="60"
            className="player__info__img"
          ></img>
        )}
        <h2 className="player__info__header">{player.playerName}</h2>
      </div>

      {showEditForm && (
        <EditForm
          player={player}
          players={players}
          onEdit={onEdit}
          onConfirm={handleShowEditForm}
        />
      )}

      <div className="player__action">
        <button>🔼</button>
        <button onClick={toggleDopdown}>OPTIONS</button>

        <button>🔽</button>
      </div>
      {showOptions && (
        <>
          <div className="player__action__propperties"></div>
          <div>
            <ul>
              <li>
                {/*Remove button */}
                <button
                  type="button"
                  onClick={() => onRemove(player.id)}
                  className="player__action__button"
                >
                  Remove
                </button>
              </li>

              <li>
                {/*Hide button */}
                <button type="button" className="player__action__button">
                  Hide
                </button>
              </li>

              <li>
                {/*Edit button */}
                <button
                  type="button"
                  onClick={handleShowEditForm}
                  className="player__action__button"
                >
                  Edit
                </button>
              </li>

              <li>
                {/*Add to squad button */}
                <button type="button" className="player__action__button">
                  Add to sqad
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </li>
  );
}

/////////////////////////////////////////
/////////// EDIT PLAYER FORM ////////////
function EditForm({ onEdit, players, player, onConfirm }) {
  const [avatar, setAvatar] = useState(
    player.image || "/assets/images/avatar.webp"
  );
  const [position, setPosition] = useState(player.position || "");
  const [age, setAge] = useState(player.age || "");
  const [weight, setWeight] = useState(player.weight || "");
  const [height, setHeight] = useState(player.height || "");
  const [matches, setMatches] = useState(player.matches || "");

  function handleSubmit(e) {
    e.preventDefault();

    const updatedPlayer = {
      ...player,
      image: avatar,
      position,
      age,
      weight,
      height,
      matches,
    };

    onEdit(player.id, updatedPlayer);
    onConfirm();
  }

  return (
    <div className="player__editForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="player__editForm__label">Photo</label>
          <input
            id="photo"
            className="player__editForm__inputField"
            type="text"
            placeholder="url"
            onChange={(e) =>
              setAvatar(e.target.value !== "" ? e.target.value : avatar)
            }
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Position</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Age</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Weight</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Height</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Matches played</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={matches}
            onChange={(e) => setMatches(e.target.value)}
          ></input>
        </div>

        <div>
          <button type="submit">CONFIRM</button>
        </div>
      </form>
      <Button
        onClick={() => {
          console.log(player);
        }}
      >
        {`Log ${player.playerName} to console`}
      </Button>
    </div>
  );
}
