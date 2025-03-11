import React from 'react';
import Note from '../Note/Note';
import './NotesList.css';

const NotesList = ({ note }) => {
  
  return (
    <div className="notes-list">
      {note ? <Note note={note} /> : <p>Loading note...</p>}
    </div>
  );
};

export default NotesList;
