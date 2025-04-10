import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: "New Note",
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, newText) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app">
      <h1>Sticky Notes</h1>
      <button onClick={addNote}>+ Add Note</button>
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

function Note({ note, updateNote, deleteNote }) {
  return (
    <div className="note">
      <textarea
        value={note.text}
        onChange={(e) => updateNote(note.id, e.target.value)}
      />
      <button className="delete-btn" onClick={() => deleteNote(note.id)}>
        🗑
      </button>
    </div>
  );
}

export default App;
