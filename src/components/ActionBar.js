import { useState } from "react";
import Button from "./Button";

/////////////////////////////////////
/////////// ACTION BAR //////////////
export default function ActionBar({
  onAddPlayer,
  showAddPlayer,
  onConfirmNewPlayer,
  players,
}) {
  return (
    <div className="actionBar">
      <button onClick={onAddPlayer} class="actionBar__buttonAdd">
        <span className="actionBar__btnText">ADD NEW PLAYER</span>
        <span className="actionBar__btnIcon">&nbsp;</span>
      </button>

      <div className="actionBar__appDescription">
        <h3 className="actionBar__appDescription__mainTitle">
          App description
        </h3>

        <h4 className="actionBar__appDescription__secondTitle">
          This is a simple rugby squad builder. You can use it to:
        </h4>

        <ul className="actionBar__appDescription__list">
          <li>
            Add a player's name to the list along with a URL to their photo
          </li>
          <li>Manage the display order on the list or remove players</li>
          <li>Add information about players</li>
          <li>Move players to the squad and manage positions</li>
        </ul>
      </div>

      <div className="playerPreview">
        {showAddPlayer && (
          <FormAddPlayer
            onAddPlayer={onAddPlayer}
            onConfirmNewPlayer={onConfirmNewPlayer}
          />
        )}
      </div>
    </div>
  );
}

///////////////////////////////////////////
/////////// PLAYER ADDING FORM ////////////

function FormAddPlayer({ onAddPlayer, onConfirmNewPlayer }) {
  const [playerName, setPlayerName] = useState("");
  const [avatar, setAvatar] = useState("/assets/images/avatar.webp");

  function handleSubmit(e) {
    e.preventDefault();

    if (!playerName) return;

    const id = crypto.randomUUID();
    const newPlayer = {
      id,
      playerName,
      image: avatar,
    };

    onConfirmNewPlayer(newPlayer);
    console.log(newPlayer);
    setPlayerName("");
    setAvatar("/assets/images/avatar.webp");
  }

  return (
    <>
      <form className="form-add-player" onSubmit={handleSubmit}>
        <div className="form-add-player__inputs">
          <label>Name/Nickname: </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        </div>
        <div className="form-add-player__inputs">
          <label>Image URL: </label>
          <input
            type="text"
            placeholder="url"
            onChange={(e) =>
              setAvatar(e.target.value !== "" ? e.target.value : avatar)
            }
          ></input>
        </div>
        <div className="centered">
          <button className="form-add-player__button" type="submit">
            Ok
          </button>
          <button
            className="form-add-player__button"
            onClick={onAddPlayer}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
