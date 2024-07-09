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
      <h1>Action Bar</h1>
      <Button onClick={onAddPlayer}>Add new player</Button>
      <button
        type="button"
        onClick={() => {
          console.log(players);
        }}
      >
        Log players into dev console
      </button>
      <div className="playerPreview">
        {showAddPlayer && (
          <FormAddPlayer onConfirmNewPlayer={onConfirmNewPlayer} />
        )}
      </div>
    </div>
  );
}

///////////////////////////////////////////
/////////// PLAYER ADDING FORM ////////////

// Użyj kodu z linijki 146 do 188 z aplikacji eat-n-split

function FormAddPlayer({ onConfirmNewPlayer }) {
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
        <div>
          <label>Name/Nickname: </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            placeholder="url"
            onChange={(e) =>
              setAvatar(e.target.value !== "" ? e.target.value : avatar)
            }
          ></input>
        </div>
        <div>
          <button type="submit">CONFIRM</button>
          <button type="button">CANCEL</button>
        </div>
      </form>
    </>
  );
}
