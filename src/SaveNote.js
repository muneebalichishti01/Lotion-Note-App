import React from "react";
import { useNavigate } from 'react-router-dom';

function SaveNote({ activeNote, onDeleteNote, onEditNote, showSidebar }) {
  
  const navigate = useNavigate();

  const handleEditClick = () => {
    onEditNote(activeNote.id);
    navigate(`/notes/${activeNote.id}/edit`);
  }

  const handleDeleteNote = () => {
    navigate(`/notes/${onDeleteNote(activeNote.id)}`);
  }

  if (!activeNote) {
    return;
  }

  return (
    <div className={`app-main ${!showSidebar ? 'full-width' : ''}`}>

      <div className="note-header">
        <h1 className="preview-title">{activeNote.title}</h1>

        <div className="editor-toolbar">
          <button className="tools-preview" onClick={handleEditClick}>Edit</button>
        </div>

        <div className="editor-toolbar">
          <button className="tools-preview" onClick={handleDeleteNote}>Delete</button>
        </div>

      </div>

      <div className="timestamp">
        {activeNote && new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          hourCycle: "h24"
        })}
      </div>
      
      <div className="app-main-note-preview">
        <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: activeNote.body }}></div>
      </div>

    </div>
  );
}

export default SaveNote;
