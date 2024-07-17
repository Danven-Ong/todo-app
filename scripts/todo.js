import { renderList } from "./render-list.js";
import { allBtn, activebtn, activatedBtn } from "./filter-btn.js";
import { checkForDrags } from "./drag-drop.js";

export class Todo {
  static next_id = 1;
  taskId;
  content;
  isChecked;
  isDisplayed;

  constructor(
    content,
    taskId = Todo.next_id++,
    isChecked = false,
    isDisplayed = true
  ) {
    this.content = content;
    this.taskId = taskId;
    this.isChecked = isChecked;
    this.isDisplayed = isDisplayed;
  }
}

//Add a Todo function
export let todos = loadLocalStorage();

//Load local storage
function loadLocalStorage() {
  const localTodos = JSON.parse(localStorage.getItem("todo")) || [];
  if (localTodos.length) {
    const taskIds = localTodos.map((todo) => todo.taskId);
    Todo.next_id = Math.max(...taskIds) + 1;
  }
  return localTodos;
}

//Save to local storage
function saveToStorage() {
  localStorage.setItem("todo", JSON.stringify(todos));
}

//Add a Todo function
export function addTodo() {
  const taskContent = document.getElementById("textbox").value;
  todos.push(new Todo(taskContent));
  document.getElementById("textbox").value = "";
}

//Search a Todo function
function searchForTodo(taskId) {
  for (let i = 0; i < todos.length; i++) {
    if (taskId === todos[i].taskId) {
      return todos[i];
    }
  }
}

//Delete a Todo function
function checkForDeletes() {
  const deleteButton = document.querySelectorAll(".todo__delete--btn");

  deleteButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteTodo(parseInt(btn.id));
    });
  });
  function deleteTodo(taskId) {
    const todo = searchForTodo(taskId);
    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
    }
    renderList();
  }
}

//Complete a Todo function
function checkForCompletes() {
  const checkboxes = document.querySelectorAll(".todo__input--checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const taskId = parseInt(checkbox.dataset.taskId);
      completeTask(taskId);
    });
  });

  function completeTask(taskId) {
    document.getElementById(`svg-${taskId}`).classList.toggle("svg--hidden");
    document
      .getElementById(`text-${taskId}`)
      .classList.toggle("task--completed");
    const todo = searchForTodo(taskId);
    todo.isChecked = !todo.isChecked;
    renderList();
  }
}

//Check for task status function
export function checkStatus() {
  checkForCompletes();
  checkForDeletes();
  checkForDrags();
  saveToStorage();

  //Styling for task summary bar
  const noTaskDisplayed =
    document.querySelectorAll(".task--not-displayed").length === todos.length;

  const todoTaskSummary = document.querySelector(".todo__task-summary");

  todoTaskSummary.style.borderRadius = noTaskDisplayed ? "0.5rem" : "";
  todoTaskSummary.style.borderTop = noTaskDisplayed ? "none" : "";
}

//Check for no. of active tasks function
export function checkForActive() {
  let count = 0;
  todos.forEach((todo) => {
    if (!todo.isChecked) {
      count++;
    }
  });
  return count;
}

//Clear completed tasks function
export function clearCompleted() {
  todos = todos.filter((todo) => {
    return !todo.isChecked;
  });
  renderList();
}

//Get all tasks function
export function getAll() {
  todos.forEach((todo) => {
    todo.isDisplayed = true;
  });
  return todos;
}

//Get completed tasks function
export function getCompleted() {
  todos.forEach((todo) => {
    todo.isDisplayed = todo.isChecked;
  });
  return todos;
}

//Get active tasks function
export function getActive() {
  todos.forEach((todo) => {
    todo.isDisplayed = !todo.isChecked;
  });
  return todos;
}

//Get Todo List that is supposed to be rendered
export function getRenderedTodo() {
  const renderTodo =
    activatedBtn === allBtn
      ? getAll()
      : activatedBtn === activebtn
      ? getActive()
      : getCompleted();

  return renderTodo;
}

export function setTodo(tempTodos) {
  todos = tempTodos;
  saveToStorage();
}
