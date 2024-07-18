export const allBtn = document.querySelector(".btn--all");
export const activebtn = document.querySelector(".btn--active");
export const completedBtn = document.querySelector(".btn--completed");

const btns = [allBtn, activebtn, completedBtn];

export let activatedBtn = allBtn;

export function activateBtn(button) {
  btns.forEach((btn) => {
    btn.style.color =
      btn === button ? "var(--bright-blue)" : "var(--secondary-color)";
    if (btn === button) activatedBtn = btn;
  });
}
