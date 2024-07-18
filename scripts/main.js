import { addTodo, checkStatus, getAll } from "./todo.js";
import { renderList } from "./render-list.js";
import { allBtn, activebtn, completedBtn, activateBtn } from "./filter-btn.js";
import { themeBtn, changeTheme, loadTheme } from "./theme.js";

loadTheme();
renderList(getAll());
checkStatus();

const textbox = document.querySelector(".todo__input--text");

const createBtn = document.querySelector(".todo__create-btn");

createBtn.onclick = () => {
  addTodo();
  renderList();
};

textbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
    renderList();
  }
});

allBtn.onclick = () => {
  activateBtn(allBtn);
  renderList();
};

activebtn.onclick = () => {
  activateBtn(activebtn);
  renderList();
};

completedBtn.onclick = () => {
  activateBtn(completedBtn);
  renderList();
};

themeBtn.onclick = () => {
  changeTheme();
};
