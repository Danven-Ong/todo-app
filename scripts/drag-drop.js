import { Todo, setTodo } from "./todo.js";
import { styleBorder } from "./render-list.js";

export function checkForDrags() {
  const tasks = document.querySelectorAll(".todo__task");
  let draggingTask = null;

  tasks.forEach((task) => {
    // Mouse events
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragend", handleDragEnd);
    task.addEventListener("dragover", handleDragOver);

    // Touch events
    task.addEventListener("touchstart", handleTouchStart);
    task.addEventListener("touchmove", handleTouchMove);
    task.addEventListener("touchend", handleTouchEnd);
  });

  function handleDragStart() {
    draggingTask = this;
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  }

  function handleDragEnd() {
    setTimeout(() => {
      this.classList.remove("dragging");
      draggingTask = null;
    }, 0);
    saveTaskOrder();
  }

  function handleDragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(this.parentElement, e.clientY);
    const container = this.parentElement;
    if (
      afterElement == null ||
      afterElement.classList.contains("todo__task-summary")
    ) {
      container.appendChild(draggingTask);
    } else {
      container.insertBefore(draggingTask, afterElement);
    }
  }

  function handleTouchStart(e) {
    draggingTask = this;
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const afterElement = getDragAfterElement(this.parentElement, touch.clientY);
    const container = this.parentElement;
    if (
      afterElement == null ||
      afterElement.classList.contains("todo__task-summary")
    ) {
      container.appendChild(draggingTask);
    } else {
      container.insertBefore(draggingTask, afterElement);
    }
  }

  function handleTouchEnd() {
    setTimeout(() => {
      this.classList.remove("dragging");
      draggingTask = null;
    }, 0);
    saveTaskOrder();
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".todo__task:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function saveTaskOrder() {
    const taskElements = document.querySelectorAll(".todo__task-text");
    const tempTodos = [];
    taskElements.forEach((task) => {
      tempTodos.push(
        new Todo(
          task.innerHTML.replace(/[\n\s]/g, ""),
          parseInt(task.dataset.id),
          task.classList.contains("task--completed")
        )
      );
    });
    styleBorder();
    setTodo(tempTodos);
  }
}
