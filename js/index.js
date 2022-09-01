"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {
      alert("Форма отправлена");
      form.reset();
    } else {
      alert("Заполните обязательные поля");
    }
  }

  const formValidate = (form) => {
    let error = 0;
    let formRequired = document.querySelectorAll(".required");

    for (let i = 0; i < formRequired.length; i++) {
      const input = formRequired[i];
      formRemoveError(input);

      if (input.classList.contains("email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  };

  const formAddError = (input) => {
    input.classList.add("error");
  };
  const formRemoveError = (input) => {
    input.classList.remove("error");
  };
  const emailTest = (input) => {
    return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value);
  };
});

// ---------------------------

const onEntry = (entry) => {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("show_cookies");
    }
  });
};

let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".main__cookies");

for (let elm of elements) {
  observer.observe(elm);
}

const cookiesAlert = document.getElementById("cookies");

const closedCookies = () => {
  cookiesAlert.remove();
};
