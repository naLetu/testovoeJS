const signInBtn = document.querySelector(".signInBtn");
const pageSignUp = document.querySelector(".pageSignUp");
const pageSignIn = document.querySelector(".pageSignIn");
const signUpBtn = document.querySelector(".signUpBtn");
const forgetPasswordLink = document.querySelector(".forgetPasswordLink");
const pageForgetPassword = document.querySelector(".pageForgetPassword");
const enterOTPPage = document.querySelector(".enterOTPPage");
const arrowToBack = document.querySelector(".arrowToBack");
const success = document.querySelector(".success");
const resetPasswordPage = document.querySelector(".resetPasswordPage");
const arrowToBackOTP = document.querySelector(".arrowToBackOTP");
const arrowToBackReset = document.querySelector(".arrowToBackReset");

const hide = (el) => {
  el.style.display = "none";
};

const show = (el) => {
  el.style.display = "block";
};

const clearField = (item) => {
  item.forEach((field) => {
    field.value = "";
  });
};

const setElementHasError = (el, hasError) => {
  if (hasError) {
    el.classList.add("error");
    return;
  } else {
    el.classList.remove("error");
  }
};

const sliderBlockColor = (el, switched) => {
  if (switched.style.display === "block") {
    el.classList.add("sliderBlockColor");
  } else {
    el.classList.remove("sliderBlockColor");
  }
};
// переходы с страницы на страницу
signInBtn.addEventListener("click", () => {
  hide(pageSignUp);
  show(pageSignIn);
});

signUpBtn.addEventListener("click", () => {
  const signUpInput = document.querySelectorAll(".signUpInput");
  clearField(signUpInput);
  show(pageSignUp);
  hide(pageSignIn);
});

const forgetPage = document.querySelector(".forgetPage");
forgetPasswordLink.addEventListener("click", () => {
  hide(pageSignIn);
  show(pageForgetPassword);
  sliderBlockColor(forgetPage, pageForgetPassword);
});

// КЛИКАБЕЛЬНЫЕ СТРЕЛКИ
arrowToBack.addEventListener("click", () => {
  const signInInput = document.querySelectorAll(".signInInput");
  clearField(signInInput);
  hide(pageForgetPassword);
  show(pageSignIn);
});

arrowToBackOTP.addEventListener("click", () => {
  const signInInput = document.querySelectorAll(".signInInput");
  clearField(signInInput);
  hide(enterOTPPage);
  show(pageSignIn);
});

arrowToBackReset.addEventListener("click", () => {
  const signInInput = document.querySelectorAll(".signInInput");
  clearField(signInInput);
  hide(resetPasswordPage);
  show(pageSignIn);
});

// СОХРАНЕНИЕ ДАННЫХ ПО КНОПКЕ create account
const createAccountBtn = document.querySelector(".createAccountBtn");

createAccountBtn.addEventListener("click", function () {
  const userName = document.getElementById("userName").value.trim();
  const email = document.getElementById("emailOrPhone").value.trim();
  const password = document.getElementById("passwordField").value.trim();
  const checkbox = document.getElementById("checkboxInput");
  const signUpInput = document.querySelectorAll(".signUpInput");
  const emailField = document.getElementById("emailOrPhone");
  const passwordField = document.getElementById("passwordField");

  if (userName === "" || email === "" || password === "") {
    signUpInput.forEach((item) => {
      item.classList.add("error");
    });
    return;
  } else {
    signUpInput.forEach((item) => {
      item.classList.remove("error");
    });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    setElementHasError(emailField, true);
    return;
  } else {
    setElementHasError(emailField, false);
  }

  const passwordPattern = /[0-9a-zA-Z@#$%^&*]{8,16}/;
  if (!passwordPattern.test(password)) {
    setElementHasError(passwordField, true);
    return;
  } else {
    setElementHasError(passwordField, false);
  }

  if (!checkbox.checked) {
    return;
  } else {
  }

  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const dubicate = savedUsers.some((data) => {
    return data.email === email;
  });
  if (dubicate) {
    setElementHasError(emailField, true);
    return false;
  }
  const newUser = {
    userName: userName,
    email: email,
    password: password,
  };
  savedUsers.push(newUser);
  localStorage.setItem("userData", JSON.stringify(savedUsers));

  hide(pageSignUp);
  show(pageSignIn);
});

// СТРАНИЦА АВТОРИЗАЦИИ
const logInBtn = document.querySelector(".logInBtn");

logInBtn.addEventListener("click", function () {
  const email = document.querySelector(".emailSignIn").value;
  const password = document.querySelector(".signInPassword").value;
  const signInInput = document.querySelectorAll(".signInInput");
  const emailField = document.querySelector(".emailSignIn");
  const passwordField = document.querySelector(".signInPassword");
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];

  if (email === "" || password === "") {
    signInInput.forEach((item) => {
      item.classList.add("error");
    });
  } else {
    signInInput.forEach((item) => {
      item.classList.remove("error");
    });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    setElementHasError(emailField, true);
  } else {
    setElementHasError(emailField, false);
  }

  const findUser = savedUsers.find((user) => {
    return user.email === email && (user.password === password || !user.password);
  });

  if (!findUser) {
    setElementHasError(emailField, true);
    setElementHasError(passwordField, true);
    return;
  } else {
    setElementHasError(emailField, false);
  }

  localStorage.setItem("curUser", JSON.stringify(findUser));
  clearField(signInInput);
  hide(pageSignIn);
  show(success);
});

// СКРЫТЬ/ПОКАЗАТЬ ПАРОЛЬ
const passInp = document.querySelectorAll(".showHidePassword");
const passIc = document.querySelectorAll(".passwordControl");

passIc.forEach((item, index) => {
  item.addEventListener("click", () => {
    const inputType = passInp[index].type === "password" ? "text" : "password";
    passInp[index].type = inputType;
  });
});

passIc.forEach((item, index) => {
  item.addEventListener("click", function () {
    if (passInp[index].type === "text") {
      item.style.background = 'url("/images/passwordIconOn.svg") no-repeat';
    } else {
      item.style.background = 'url("/images/passwordIcon.svg") no-repeat';
    }
  });
});

// ВОССТАНОВЛЕНИЕ ПАРОЛЯ
const continueBtn = document.querySelector(".continueBtn");
const enterPage = document.querySelector(".enterPage");
const enterPageReplaceColor = document.querySelector(".enterPageReplaceColor");
// ПЕРЕМЕННАЯ ДЛЯ СОХРАНЕНИЯ EMAIL
let foundEmail = "";

continueBtn.addEventListener("click", function () {
  const email = document.getElementById("forgetEmail").value.trim();
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const forgetPasswordInput = document.querySelector(".forgetPasswordInput");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email === "") {
    setElementHasError(forgetPasswordInput, true);
    return;
  } else {
    setElementHasError(forgetPasswordInput, false);
  }

  if (!emailPattern.test(email)) {
    setElementHasError(forgetPasswordInput, true);
    return;
  } else {
    setElementHasError(forgetPasswordInput, false);
  }

  const savedEmail = savedUsers.find((user) => user.email === email && user);

  if (email === savedEmail.email) {
    hide(pageForgetPassword);
    show(enterOTPPage);
  } else {
    return;
  }

  // ЗАПРОС ДЛЯ ПОЛУЧЕНИЯ ПАРОЛЯ
  fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=10000&max=99999&count=1"
  )
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("code", data);
    });

  forgetPasswordInput.value = "";
  foundEmail = savedEmail;
  sliderBlockColor(enterPageReplaceColor, enterOTPPage);
});

// ВВОД ЦИФР В БЛОКИ
const boxCode = document.querySelectorAll(".boxCode");
boxCode.forEach((block, index) => {
  block.addEventListener("keyup", function () {
    const inpValue = block.value.trim();
    const onlyNumber = /^\d$/.test(inpValue);
    if (onlyNumber) {
      if (index < boxCode.length - 1) {
        boxCode[index + 1].focus();
      }
    } else {
      block.value = "";
    }
  });
});

const validateCodeBtn = document.querySelector(".validateCodeBtn");
const resetPageReplaceColor = document.querySelector(".resetPageReplaceColor");
const resetPage = document.querySelector(".resetPage");
const boxValue = [];
const getRandomCode = () => {
  return localStorage.getItem("code");
};

const resetFunction = () => {
  const randomCode = getRandomCode();
  boxCode.forEach((item) => {
    const value = item.value;
    if (item === "") {
      item.classList.add("error");
      return;
    } else {
      item.classList.remove("error");
    }

    if (!isNaN(value) && value.length === 1) {
      boxValue.push(value);
    }
  });

  if (randomCode === boxValue.join("")) {
    hide(enterOTPPage);
    show(resetPasswordPage);
    clearField(boxCode);
  } else {
    clearField(boxCode);
    return;
  }

  sliderBlockColor(resetPageReplaceColor, resetPasswordPage);
};

validateCodeBtn.addEventListener("click", resetFunction);

const resendOTP = document.querySelector(".resendOTP");
resendOTP.addEventListener("click", () => {
  fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=10000&max=99999&count=1"
  )
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("code", data);
    });
  clearField(boxCode);
  boxValue.splice(0, boxValue.length);
});

// ЗАМЕНА ПАРОЛЯ
const resetPasswordBtn = document.querySelector(".resetPasswordBtn");

resetPasswordBtn.addEventListener("click", function () {
  const resetPasswordFirst = document
    .querySelector(".resetPasswordFirst")
    .value.trim();
  const resetPasswordSecond = document
    .querySelector(".resetPasswordSecond")
    .value.trim();
  const resetInput = document.querySelectorAll(".resetInput");
  const errorBlock = document.querySelector(".errorBlock");
  const resetPasswordF = document.querySelector(".resetPasswordFirst");
  const passwordPattern = /[0-9a-zA-Z@#$%^&*]{8,16}/;
  const savedUsers = JSON.parse(localStorage.getItem('userData')) || []

  if (resetPasswordFirst === "" || resetPasswordSecond === "") {
    resetInput.forEach((item) => {
      item.classList.add("error");
    });
    return;
  } else {
    resetInput.forEach((item) => {
      item.classList.remove("error");
    });
  }

  if (foundEmail.password === resetPasswordFirst) {
    setElementHasError(resetPasswordF, true);
    show(errorBlock);
    return;
  } else {
    resetInput.forEach((item) => {
      item.classList.remove("error");
    });
    hide(errorBlock);
  }

  if (
    foundEmail.password !== resetPasswordFirst &&
    passwordPattern.test(resetPasswordFirst)
  ) {
    foundEmail.password = resetPasswordFirst;
    localStorage.setItem("userData", JSON.stringify(foundEmail));
    hide(resetPasswordPage);
    show(pageSignIn);
  }

  const userIndex = savedUsers.findIndex(user => user.email === foundEmail.email)
  savedUsers[userIndex] = {
    userName: foundEmail.userName,
    email: foundEmail.email,
    password: foundEmail.password
  }
  localStorage.setItem('userData', JSON.stringify(savedUsers))


  clearField(resetInput);
});

success.addEventListener("click", () => {
  const signUpInput = document.querySelectorAll(".signUpInput");
  hide(success);
  show(pageSignUp);
  clearField(signUpInput);
});
