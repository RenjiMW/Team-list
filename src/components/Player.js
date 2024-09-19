import { useState } from "react";
import Button from "./Button";

/////////////////////////////////////
/////////// PLAYER INFO ////////////

export default function Player({
  players,
  player,
  onRemove,
  onEdit,
  onMove,
  index,
  playersLength,
  onAddToSquad,
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPropperties, setShowPropperties] = useState(false);
  const toggleDopdown = () => setShowOptions(!showOptions);

  /// ------------- ///
  // from Edit form

  const [avatar, setAvatar] = useState(
    player.image || "/assets/images/avatar.webp"
  );
  const [position, setPosition] = useState(player.position || "");
  const [age, setAge] = useState(player.age || "");
  const [weight, setWeight] = useState(player.weight || "");
  const [height, setHeight] = useState(player.height || "");
  const [matches, setMatches] = useState(player.matches || "");

  const handleEditSubmit = (updatedPlayer) => {
    onEdit(player.id, updatedPlayer);
    setShowEditForm(false);
    setShowPropperties(true);
  };

  /// ------------- ///
  // from Player

  function handleShowEditForm() {
    setShowEditForm((show) => !show);
  }

  function handleShowPropperties() {
    setShowPropperties((show) => !show);
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

      <div className="player__action">
        <button onClick={() => onMove(index, index - 1)} disabled={index === 0}>
          🔼
        </button>
        <div className="player__action__mainBtns">
          <button
            onClick={() => {
              if (showOptions || showPropperties === true) {
                setShowOptions(false);
                setShowPropperties(false);
                setShowEditForm(false);
              } else {
                handleShowPropperties();
                toggleDopdown();
                setShowEditForm(false);
              }
            }}
          >
            🔧
          </button>

          <button onClick={() => onAddToSquad(player)}>➕</button>
        </div>

        <button
          onClick={() => onMove(index, index + 1)}
          disabled={index === playersLength - 1}
        >
          🔽
        </button>
      </div>

      {showEditForm && (
        <EditForm
          player={player}
          players={players}
          onEdit={onEdit}
          onAvatarChange={(newAvatar) => setAvatar(newAvatar)}
          onPositionChange={(newPosition) => setPosition(newPosition)}
          onAgeChange={(newAge) => setAge(newAge)}
          onWeightChange={(newWeight) => setWeight(newWeight)}
          onHeightChange={(newHeight) => setHeight(newHeight)}
          onMatchesChange={(newMatches) => setMatches(newMatches)}
          avatar={avatar}
          position={position}
          age={age}
          weight={weight}
          height={height}
          matches={matches}
          onSubmit={handleEditSubmit}
        />
      )}

      {showPropperties && (
        <div className="player__action__propperties">
          <div className="player__action__propperties__names">
            <p>position:</p>
            <p>age:</p>
            <p>weight:</p>
            <p>height:</p>
            <p>matches:</p>
          </div>
          <div className="player__action__propperties__values">
            <p>{position}</p>
            <p>{age}</p>
            <p>{weight}</p>
            <p>{height}</p>
            <p>{matches}</p>
          </div>
        </div>
      )}

      {showOptions && (
        <>
          <div className="player__action__options">
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
                  onClick={() => {
                    handleShowPropperties();
                    handleShowEditForm();
                  }}
                  className="player__action__button"
                >
                  Edit
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
function EditForm({
  player,
  onAvatarChange,
  onPositionChange,
  onAgeChange,
  onWeightChange,
  onHeightChange,
  onMatchesChange,
  avatar,
  position,
  age,
  weight,
  height,
  matches,
  onSubmit,
}) {
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

    onSubmit(updatedPlayer);
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
            onChange={(e) => onAvatarChange(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Position</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Age</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Weight</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Height</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
          ></input>
        </div>

        <div>
          <label className="player__editForm__label">Matches played</label>
          <input
            className="player__editForm__inputField"
            type="text"
            value={matches}
            onChange={(e) => onMatchesChange(e.target.value)}
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
