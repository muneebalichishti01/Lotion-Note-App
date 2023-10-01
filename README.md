# Lotion-Note-App
In this project, I created a Notion-like application named Lotion with HTML, CSS, and React.

Check it out here: [LOTION APP](https://muneebali-lotion-app.netlify.app/notes)

Note: [Netlify](https://www.netlify.com/) was used to deploy the application

## :foot: Steps
- Clone the repo
- Make sure you're inside the root directory of the repo and then run `npm install` to install all the necessary packages
- Run `npm start` and you should be able to see the page open up on your default browser

---

## :page_with_curl: Notes
- Three external libraries were used for the application:
    - `react-router-dom` for front-end routing, (installed by running `npm install react-router-dom`)
    - `react-quill` for the editor, (installed by running `npm install react-quill`)
    - `uuid` for generating universally unique identifiers, (installed by running `npm install uuid`)
- There's no backend or database for the application. However, the data persists in the browser. `localStorage` was used to implement this
- Three different React hooks were used to build the application:
    - [`useState`](https://masoudkarimif.github.io/posts/react-101/#usestate)
    - [`useEffect`](https://masoudkarimif.github.io/posts/react-101/#useeffect)
- Used page parameter to pass the note id to the component: `/notes/1`, `/notes/2/edit`
- Used the `useParams` and `useOutletContext` hooks from the `react-router-dom` library to access the page parameters and the data passed to the children of the Layout component
- Used the `useNavigate` hook from the `react-router-dom` library to navigate to a different page at times (hint: when you edit a note and hit save, you navigate from the edit path `/notes/note-id/edit` to the view path `/notes/note-id`)
- The prompt you get when click on the Delete button is implemented using the `window.confirm` method. It returns `true` if the user confirms, and `false` if they don't
- [Tags]. Notes are searchable. That is, when a user is picking a tag for a note, the application suggests similar tags
- Sorting and searching for the notes is implemented

