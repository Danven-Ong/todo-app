import {
  todos,
  checkStatus,
  checkForActive,
  clearCompleted,
  getRenderedTodo,
} from "./todo.js";

//Print Todo list function
export function renderList(list = getRenderedTodo()) {
  let todoListHTML = "";

  list.forEach((todo) => {
    todoListHTML += `
      <div class="todo__task ${
        todo.isDisplayed ? "task--displayed" : "task--not-displayed"
      }" draggable="true"">
        <div class="todo__checkbox-container">
          <input
            class="todo__input todo__input--checkbox"
            type="checkbox"
            ${todo.isChecked ? "checked" : ""}
            name="task"
            data-task-id="${todo.taskId}"
          />
          <span class="todo__checked-icon">
            <svg
              class="todo__checked-icon--svg 
              ${todo.isChecked ? "" : "svg--hidden"}"
              id="svg-${todo.taskId}"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
            >
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </span>
        </div>
        <p 
          class="todo__task-text 
          ${todo.isChecked ? "task--completed" : ""}" 
          id="text-${todo.taskId}"
          data-id="${todo.taskId}"
        >
        ${todo.content}
        </p>
        ${addDeleteButton(todo.taskId)}
      </div>

    `;
  });
  //For mobile version
  const todoList = document.querySelector(".todo__list");
  todoList.innerHTML = todoListHTML;

  const todoSummary = document.querySelector(".todo__task-summary");
  todoSummary.innerHTML = `${addTaskSummary()}`;

  todoSummary.style.display = todoSummary.innerHTML ? "flex" : "none";
  todoSummary.style.borderTop = todoSummary.innerHTML ? "" : "none";

  //For desktop version
  const todoItemsLeftText = document.querySelectorAll(
    ".todo__items-left-text"
  )[1];

  if (todoItemsLeftText) todoItemsLeftText.innerHTML = todoItemsLeftTextHTML();

  styleBorder();
  checkStatus();
  const clearCompletedBtns = document.querySelectorAll(
    ".todo__clear-completed-btn"
  );

  if (!clearCompletedBtns) return;

  clearCompletedBtns.forEach((clearCompletedBtn) => {
    clearCompletedBtn.addEventListener("click", () => {
      clearCompleted();
    });
  });
}

function addDeleteButton(taskId) {
  return `<button 
            class="btn todo__delete--btn"
            id="${taskId}"
          >
            <svg
              class="todo__crossed-icon--svg"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
            >
              <path
                fill="#494C6B"
                fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </button>`;
}

function addTaskSummary() {
  return todos.length == 0
    ? ""
    : `
        ${todoItemsLeftTextHTML()}
        ${todoClearCompletedBtnHTML()}
      `;
}

function todoItemsLeftTextHTML() {
  const itemsLeft = checkForActive();
  return `
          <p class="todo__items-left-text">
            ${
              itemsLeft == 0
                ? todos.length === 0
                  ? "No more tasks!"
                  : "All completed!"
                : `${itemsLeft} item${itemsLeft > 1 ? "s" : ""} left`
            } 
          </p>
          `;
}

function todoClearCompletedBtnHTML() {
  return `
          <button class="btn todo__clear-completed-btn">
            Clear completed
          </button>
          `;
}

export function styleBorder() {
  const displayedTasks = document.querySelectorAll(".task--displayed");
  const currentNoBorder = document.querySelector(".no-border");
  if (currentNoBorder) currentNoBorder.classList.remove("no-border");
  if (displayedTasks.length !== 0) displayedTasks[0].classList.add("no-border");
}
