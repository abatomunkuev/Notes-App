import { initializeEditPage, generateLastEditedMessage } from "./view";
import { updateNote, removeNote } from "./notes";

let noteTitle = document.querySelector("#note-title");
let noteBody = document.querySelector("#note-body");
let removeButton = document.querySelector("#removeNote");
let saveButton = document.querySelector("#saveNote");
let updatedTime = document.querySelector("#time");
const noteID = location.hash.substring(1);

initializeEditPage(noteID);

noteTitle.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    title: e.target.value,
  });
  updatedTime.textContent = generateLastEditedMessage(note.updatedAt);
});

noteBody.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    body: e.target.value,
  });
  updatedTime.textContent = generateLastEditedMessage(note.updatedAt);
});

removeButton.addEventListener("click", () => {
  removeNote(noteID);
  //location.assign("./main.html");
  //location.assign(location.origin + "/main.html");
  setTimeout(function () {
    document.location.href = "main.html";
  }, 250);
});

saveButton.addEventListener("click", () => {
  //location.assign("./main.html");
  //location.assign(location.origin + "/main.html");
  setTimeout(function () {
    document.location.href = "main.html";
  }, 250);
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    initializeEditPage(noteID);
  }
});
