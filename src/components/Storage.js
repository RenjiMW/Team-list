import React, { useState, useEffect } from "react";

export default function RugbyStorage({ players }) {
  const [value, setValue] = useState("");

  // Load data from Local Storage when the component mounts
  useEffect(() => {
    const storedValue = localStorage.getItem("myValue");
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  // Save data to Local Storage whenever the value changes
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
