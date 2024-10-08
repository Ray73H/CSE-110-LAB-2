import React, { useState, useContext } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ClickCounter from "./hooksExercise";
import { ThemeContext } from "./themeContext";
import ToggleTheme from "./toggleTheme";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const theme = useContext(ThemeContext);

  function handleButtonClick(noteUpdate: Note) {
    const updatedNotes = notes.map((note) => {
      return note.id === noteUpdate.id
        ? { ...note, favorite: !note.favorite }
        : note;
    });

    setNotes(updatedNotes);
  }

  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "10px 0 10px 0",
      }}
    >
      <div className="app-container">
        <form className="note-form">
          <div>
            <input placeholder="Note Title"></input>
          </div>
          <div>
            <textarea placeholder="Note Content"></textarea>
          </div>
          <div>
            <select name="label" id="label-select">
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button
              style={{ background: theme.foreground, color: theme.background }}
              type="submit"
            >
              Create Note
            </button>
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{ background: theme.foreground, color: theme.background }}
            >
              <div className="notes-header">
                <button
                  style={{
                    background: theme.foreground,
                    color: theme.background,
                    paddingBottom: note.favorite ? "3px" : 0,
                  }}
                  onClick={() => handleButtonClick(note)}
                >
                  {note.favorite ? "❤️" : "♡"}
                </button>
                <button
                  style={{
                    background: theme.foreground,
                    color: theme.background,
                  }}
                >
                  x
                </button>
              </div>
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
            </div>
          ))}
        </div>

        <div>
          <h2>List of favorites:</h2>
          {notes.map((note) => (
            <p>{note.favorite ? note.title : null}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
