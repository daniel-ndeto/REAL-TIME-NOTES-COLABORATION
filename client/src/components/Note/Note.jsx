import React from 'react';
import './Note.css';

const Note = ({ note }) => {

  if (!note) return <p>Loading note...</p>;

  return (

    <div className="note">
      <h2>{note.title}</h2>

      <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
      
      <small>
        Last updated: {new Date(note.updatedAt).toLocaleString()}
        {note.lastEditedBy && ` by ${note.lastEditedBy}`}
      </small>
    </div>
  );
};

export default Note;
