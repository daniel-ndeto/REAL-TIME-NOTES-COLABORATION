import React, { useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import './Editor.css';

const Editor = ({ note, setNote }) => {

  const socket = useContext(SocketContext);

  const { user } = useContext(UserContext);
  
  // Create a ref for the contentEditable div
  const editorRef = useRef(null);

  // When the note changes, initialize the editor's content without re-rendering on every keystroke.
  useEffect(() => {

    if (note && editorRef.current) {
      editorRef.current.innerHTML = note.content || '';
    }
  }, [note]);

  // Handler for the Save button. Reads the current content from the ref and sends it to the server.
  const handleSave = async () => {
    if (!editorRef.current || !note) return;
    
    const newContent = editorRef.current.innerHTML;
    
    // checking if the content changed
    if (newContent === note.content) return;
    
    try {
      // Updating note in the DB
      const res = await axios.put(`http://localhost:5000/api/notes/${note._id}`, {
        content: newContent,
        lastEditedBy: user.username, 
      });
      setNote(res.data);

      // Emiting the update so other clients get notified
      socket.emit('editNote', {
        noteId: note._id,
        content: newContent,
        room: note.room,
        lastEditedBy: user.username,
      });
    } 
    
    catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Helper function for formatting commands using execCommand
  const applyFormat = (command) => {

    document.execCommand(command, false, null);
  };

  return (
    <div className="editor">
      
      {/* Formatting toolbar */}
      <div className="editor-toolbar">
        <button onClick={() => applyFormat('bold')}><b>B</b></button>
        <button onClick={() => applyFormat('italic')}><i>I</i></button>
        <button onClick={() => applyFormat('underline')}><u>U</u></button>
      </div>

      {/* Uncontrolled contentEditable div for typing */}
      <div
        className="editor-content"
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        style={{ direction: 'ltr', textAlign: 'left' }}
      />

      {/* Save button */}
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Editor;
