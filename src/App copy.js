import { useState } from "react";
import "./App.scss";

/////////////////////////////
/////////// APP /////////////

export default function App() {
  const [showAddPlayer, setshowAddPlayer] = useState(false);
  const [players, setPlayers] = useState([]);
  const [showNewPlayer, setShowNewPlayer] = useState(false);

  ////// pleayer fatures props - START
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageValue, setImageValue] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const defaultImage = "/assets/images/avatar.webp";
    setImage(event.target.value !== "" ? event.target.value : defaultImage);
  };

  const handleAddPlayer = (player) => {
    setImageValue(imageValue);
    setPlayers((players) => [...players, player]);
    console.log(players);
  };

  ////// pleayer fatures props - END

  function handleShowAddPlayer() {
    setshowAddPlayer((show) => !show);
  }

  // function handleAddPlayer(player) {
  //   setPlayers((players) => [...players, player]);
  //   console.log(players);
  // }

  /// showing on list
  function hadnelShowNewPlayer() {
    setShowNewPlayer((show) => !show);
  }

  return (
    <>
      <AppHeader />
      <div className="userInterface">
        <ActionBar
          name={name}
          image={image}
          imageValue={imageValue}
          onAddPlayer={handleShowAddPlayer}
          showAddPlayer={showAddPlayer}
          onConfirm={handleAddPlayer}
          onImageChange={handleImageChange}
          onNameChange={handleNameChange}
        />
        <PlayersList
          onAddNewPlayer={hadnelShowNewPlayer}
          name={name}
          image={image}
        />
        <SqadList />
        <img src="/assets/images/avatar.webp" alt="obraz" width="80"></img>
      </div>
    </>
  );
}

///////////////////////////////
/////////// HEADER ////////////

function AppHeader() {
  return (
    <div className="appHeader">
      <h1>Simple Rugby Team Manager</h1>
    </div>
  );
}

/////////////////////////////////////
/////////// ACTION BAR //////////////
function ActionBar({
  onAddPlayer,
  showAddPlayer,
  name,
  image,
  imageValue,
  onConfirm,
  onImageChange,
  onNameChange,
}) {
  return (
    <div className="actionBar">
      <h1>Action Bar</h1>
      <Button onClick={onAddPlayer}>Add new player</Button>
      <div className="playerPreview">
        {showAddPlayer && (
          <PlayerFeatures
            name={name}
            image={image}
            imageValue={imageValue}
            onConfirm={onConfirm}
            onImageChange={onImageChange}
            onNameChange={onNameChange}
          />
        )}
      </div>
    </div>
  );
}

///////////////////////////////////////
/////////// ACTION BUTTONS ////////////

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

///////////////////////////////////////////
/////////// PLAYER ADDING FORM ////////////

// Użyj kodu z linijki 146 do 188 z aplikacji eat-n-split

function PlayerFeatures({
  name,
  image,
  imageValue,
  onConfirm,
  onImageChange,
  onNameChange,
}) {
  return (
    <>
      <form className="form">
        <div>
          <label>Name/Nickname: </label>
          <input type="text" onChange={onNameChange}></input>
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" placeholder="url" onChange={onImageChange}></input>
        </div>
        <div>
          <button type="button" onClick={onConfirm}>
            CONFIRM
          </button>
          <button type="button">CANCEL</button>
        </div>
      </form>
    </>
  );
}

/*
jak dostanie confirm to powinien storzyć bloczek w 'Players list'
powinno być tam 
  - domyślny awatar anonimowego typa
  - Imię 
  - przycisk edit
  - przycisk usuń
  - przycisk Add to sqad list
*/

/*
//// można dodać jeszcze wiek
    <>
      <form className="form">
        <div>
          <label>Firs name: </label>
          <input type="text"></input>
        </div>
        <div>
          <label>Last name: </label>
          <input type="text"></input>
        </div>
        <div>
          <label>Nickname: </label>
          <input type="text"></input>
        </div>
        <div>
          <label>Height: </label>
          <input type="text" placeholder="cm"></input>
        </div>
        <div>
          <label>Weight: </label>
          <input type="text" placeholder="kg"></input>
        </div>
        <div>
          <label>Maches played: </label>
          <input type="text" placeholder="times"></input>
        </div>
        <div>
          <label>Started trining on: </label>
          <input type="text" placeholder="YYYY-MM-DD"></input>
        </div>
      </form>
      <p>BMI: </p>
      <p>Expirience: </p>
    </> */

/////////////////////////////////////
/////////// PLAYERS LIST ////////////

function PlayersList({ name, image }) {
  return (
    <div className="playersList">
      <h1>Players List</h1>
      <ul>
        <li>
          <Player name={name} image={image} />
        </li>
      </ul>
    </div>
  );
}

/////////////////////////////////////
/////////// PLAYER INFO ////////////

function Player({ name, image }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt="anonim" width="80"></img>
    </div>
  );
}

/////////////////////////////////////
/////////// SQUAD LIST //////////////
function SqadList() {
  return (
    <div className="sqadList">
      <h1>Sqad List</h1>
    </div>
  );
}

///////////

/*
- Przycisk Add Player musi znikać po pojawiniu się ankiety
- Po pojawiniu się ankiety musi pojawiać się możliwość wycofania lub potwierdzenia
- BMI musi obliczać się automatycznie

*/
