import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes } from "./notes";
import { getNotes } from "./notes";
// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteElement = document.createElement("a");
  const textElement = document.createElement("span");
  const bodyContainer = document.createElement("div");
  const bodyElement = document.createElement("p");
  const statusEl = document.createElement("p");
  // const button = document.createElement('button');

  // Setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed note";
  }
  textElement.classList.add("list-item__title");
  noteElement.appendChild(textElement);

  // Setup the link

  noteElement.href = `./edit.html?#${note.id}`;
  noteElement.classList.add("list-item");

  // Setup the note body text

  if (note.body.length > 0) {
    bodyElement.textContent = note.body;
  } else {
    bodyElement.textContent = "No content";
  }
  bodyContainer.classList.add("list-item__body_container");
  bodyElement.classList.add("list-item__body");
  bodyContainer.appendChild(bodyElement);
  noteElement.appendChild(bodyContainer);

  // Setup the status message

  statusEl.textContent = generateLastEditedMessage(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteElement.appendChild(statusEl);

  return noteElement;
};

const generateContentDOM = (note) => {
  const listTitle = document.createElement("li");
  const titleEl = document.createElement("a");
  //const title = document.createElement("h5");
  titleEl.textContent = note.title;
  titleEl.href = `./edit.html#${note.id}`;
  //titleEl.appendChild(title);
  listTitle.appendChild(titleEl);
  return listTitle;
};

const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const contentsEl = document.querySelector("#contents");
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  notesEl.innerHTML = "";
  contentsEl.innerHTML = "";
  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteElement = generateNoteDOM(note);
      const noteContent = generateContentDOM(note);
      contentsEl.appendChild(noteContent);
      notesEl.appendChild(noteElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    const emptyContents = document.createElement("p");
    emptyContents.textContent = "No notes";
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    emptyContents.classList.add("empty-content"); // Style in CSS
    notesEl.appendChild(emptyMessage);
    contentsEl.appendChild(emptyContents);
  }
};

const initializeEditPage = (noteID) => {
  let noteTitle = document.querySelector("#note-title");
  let noteBody = document.querySelector("#note-body");
  let updatedTime = document.querySelector("#time");
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteID);
  if (!note) {
    // Truthy or falsy value
    setTimeout(function () {
      document.location.href = "main.html";
    }, 250);
  }
  noteTitle.value = note.title;
  noteBody.value = note.body;
  updatedTime.textContent = generateLastEditedMessage(note.updatedAt);
};

const generateLastEditedMessage = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export {
  generateNoteDOM,
  renderNotes,
  generateLastEditedMessage,
  initializeEditPage,
};
