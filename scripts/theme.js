export const themeBtn = document.querySelector(".header__button");

export function loadTheme() {
  const theme = JSON.parse(localStorage.getItem("theme")) || "";
  if (theme) changeTheme();
}

export function changeTheme() {
  const theme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = !theme ? "light" : "";

  saveToStorage();

  //Toggling theme icon
  document.querySelector(
    `${!theme ? ".icon--sun" : ".icon--moon"}`
  ).style.display = "none";

  document.querySelector(
    `${!theme ? ".icon--moon" : ".icon--sun"}`
  ).style.display = "block";

  //Toggling background img
  document.querySelector(
    `${!theme ? ".bg--dark" : ".bg--light"}`
  ).style.display = "none";

  document.querySelector(
    `${!theme ? ".bg--light" : ".bg--dark"}`
  ).style.display = "block";
}

function saveToStorage() {
  localStorage.setItem(
    "theme",
    JSON.stringify(document.documentElement.dataset.theme)
  );
}
