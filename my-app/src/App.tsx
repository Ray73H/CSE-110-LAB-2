import React, { useState, useContext } from "react";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext } from "./themeContext";

function App() {
  const theme = useContext(ThemeContext);
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  function handleButtonClick(noteUpdate: Note) {
    const updatedNotes = notes.map((note) => {
      return note.id === noteUpdate.id
        ? { ...note, favorite: !note.favorite }
        : note;
    });
    setNotes(updatedNotes);
  }

  function createNoteHandler(e: React.FormEvent) {
    e.preventDefault();
    setNotes([...notes, createNote]);
  }

  function handleDelete(noteDelete: Note) {
    function checkNote(n: Note) {
      return n.id != noteDelete.id;
    }
    const updateNotes = notes.filter(checkNote);
    setNotes(updateNotes);
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
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>
          <div>
            <textarea
              placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <select
              name="label"
              id="label-select"
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.work}>Work</option>
              <option value={Label.study}>Study</option>
              <option value={Label.other}>Other</option>
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
                  onClick={() => handleDelete(note)}
                >
                  x
                </button>
              </div>
              <h2 contentEditable> {note.title} </h2>
              <p contentEditable> {note.content} </p>
              <p contentEditable> {note.label} </p>
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
