import React, { useState, useEffect } from "react";

// tworzę funkcję strzałkową która nie przyjmuje żadnuch parametrów
export default function RugbyStorage({ players }) {
  //deklaruję stan value, który domyślnie jest pustym stringiem
  const [value, setValue] = useState("");

  // Load data from Local Storage when the component mounts

  // używam React hook i jako argumenty podaję funckję strzałkową oraz pustą tablicę
  // ten hook powoduje, że przy każdym wyświetleniu komponentu
  // zdarzy się to co jest w funckji, ale tylko jeśli element zostanie
  // załadowany poraz pierwszy do drzewa DOM

  useEffect(() => {
    // deklaruję zmienną, kótra zawiera metodę użytą na localStorage
    // i pobiera ona wartość myValue
    const storedValue = localStorage.getItem("myValue");
    // używam twierdzenia warunkowego, które zadziała
    // jeśli storedValue zwiera prawdziwą wartość
    if (storedValue) {
      // używam funckji ustawiającej stan na wartość pobraną z localStorage
      setValue(storedValue);
    } // ta funckja zadziała zawsze, gdy element pojawi się poraz pierwszy w drzewie dom
  }, []);

  // Save data to Local Storage whenever the value changes

  // Używam hooka useEffect i powoduje to, że przy zmontowaniu elementu Storage
  // pojawią się dane pod adresem myValue i będą miały wartość value
  // celowo odbywa się to po pobraniu wartości bo gdy już istnieje
  // zostanie ustawiona ta sama wartość
  // jeśli nie istenieje, adres będzie pusty
  useEffect(() => {
    localStorage.setItem("myValue", value);
  }, [value]);

  return (
    <div>
      <form>
        <h1>Persistent Data Example</h1>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  );
}
