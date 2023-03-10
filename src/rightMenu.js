import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function rightMenu({
  notes,
  onAddNote,
  activeNote,
  setActiveNote,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)
    .filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()));

  const navigate = useNavigate();

  const handleAddClick = () => {
    const newNoteId = onAddNote();
    setActiveNote(newNoteId);
    navigate(`/notes/${newNoteId}`);
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="app-sidebar">
      
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={handleAddClick}>+</button>
      </div>

      <div className="app-sidebar-search">
        <input type="text" placeholder="Search Notes" value={searchQuery} onChange={handleSearchChange}/>
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            key={id}
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => {
              navigate(`/notes/${id}`);
              setActiveNote(id);
            }}
            >

            <div className="sidebar-note-title"><b>{title}</b></div>
            <p>{body && `${(new DOMParser().parseFromString(body, 'text/html')).documentElement.innerText.substr(0, 25)}...`}</p>

            <small className="note-meta">
              Edited:{" "}
              {new Date(lastModified).toLocaleDateString("en-US", {
                month: "numeric",
                day: "2-digit",
                year: "numeric",
              })} At{" "}
              {new Date(lastModified).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </small>

          </div>
        ))}
      </div>

    </div>
  );
}

export default rightMenu;