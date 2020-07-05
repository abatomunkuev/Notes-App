import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./view";

renderNotes();

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderNotes();
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  setFilters({
    sortBy: e.target.value,
  });
  renderNotes();
});

document.querySelector("#create_note").addEventListener("click", (e) => {
  const id = createNote();
  location.assign(`./edit.html?#${id}`);
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    renderNotes();
  }
});
