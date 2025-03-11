import React, { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  
  const [notes, setNotes] = useState([]);

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
};
