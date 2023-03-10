// function App() {
//   return <h1>Lotion</h1>;
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import NoteEditor from './EditNote';
import Sidebar from './RightMenu';
import Header from './header';
import NoteViewer from './SaveNote';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onPreviewNote = (noteId) => {
    setActiveNote(noteId);
  };

  const onEditNote = (noteId) => {
    setActiveNote(noteId);
  };

  const onAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "Untitled",
      body: "",
      lastModified: Date.now()
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    return newNote.id;
  };

  const onDeleteNote = (noteId, navigate) => {
    const confirmed = window.confirm("Are you sure? You won't be able to go back!");
    if (confirmed) {
      const newNotes = notes.filter(({ id }) => id !== noteId);
      setNotes(newNotes);

      if (activeNote === noteId) {
        const index = newNotes.findIndex(({ id }) => id === noteId);
        if (index === newNotes.length - 1) {
          const arr = newNotes[index - 1]?.id;
          setActiveNote(arr || false);
          return arr;
        } else {
          const arr2 = newNotes[index + 1]?.id;
          setActiveNote(arr2 || false);
          return arr2;
        }
      }
    }
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return activeNote ? notes.find(({ id }) => id === parseInt(activeNote)) : undefined;
  };


  return (
    <Router>
      <div>
        <Header toggleSidebar={toggleSidebar} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/notes" />}
          />
          <Route
            path="/notes"
            element={
              <Layout
                notes={notes}
                onAddNote={onAddNote}
                setActiveNote={setActiveNote}
                activeNote={activeNote}
                onEditNote={onEditNote}
                showSidebar={showSidebar}

              >
                <div className={`no-active-note ${!showSidebar ? 'full-width' : ''}`}>Select a note, or create a new one.</div>
              </Layout>
            }
          />
          <Route
            path="/notes/:index/edit"
            element={
              notes.length ? (
                <Layout
                  notes={notes}
                  onAddNote={onAddNote}
                  setActiveNote={setActiveNote}
                  activeNote={activeNote}
                  onEditNote={onEditNote}
                  showSidebar={showSidebar}
                >
                  {activeNote ? (
                    <NoteEditor
                      activeNote={getActiveNote()}
                      onUpdateNote={onUpdateNote}
                      onPreviewNote={onPreviewNote}
                      onDeleteNote={onDeleteNote}
                      showSidebar={showSidebar}
                    />
                  ) : (
                    <div className={`no-active-note ${!showSidebar ? 'full-width' : ''}`}>Select a note, or create a new one.</div>
                  )}
                </Layout>
              ) : (
                <Navigate to="/notes" />
              )
            }
          />
          <Route
            path="/notes/:index"
            element={
              notes.length ? (
                <Layout
                  notes={notes}
                  onAddNote={onAddNote}
                  setActiveNote={setActiveNote}
                  activeNote={activeNote}
                  onEditNote={onEditNote}
                  showSidebar={showSidebar}
                >
                  {activeNote ? (
                    <NoteViewer
                      activeNote={getActiveNote()}
                      onEditNote={onEditNote}
                      onDeleteNote={onDeleteNote}
                      showSidebar={showSidebar}
                    />
                  ) : (
                    <div className={`no-active-note ${!showSidebar ? 'full-width' : ''}`}>Select a note, or create a new one.</div>
                  )}
                </Layout>
              ) : (
                <Navigate to="/notes" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Layout({ notes, onAddNote, setActiveNote, onEditNote, children, activeNote, showSidebar }) {
  return (
    <div className={`App ${showSidebar ? 'sidebar' : ''}`}>
      {showSidebar && (
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          onEditNote={onEditNote}
        />
      )}
      {children}
    </div>
  );
}

export default App;

