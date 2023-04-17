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

// переходы с страницы на страницу
signInBtn.addEventListener("click", () => {
  pageSignUp.style.display = "none";
  pageSignIn.style.display = "block";
});

signUpBtn.addEventListener("click", () => {
  pageSignUp.style.display = "block";
  pageSignIn.style.display = "none";
});

const forgetPage = document.querySelector(".forgetPage");
forgetPasswordLink.addEventListener("click", () => {
  pageSignIn.style.display = "none";
  pageForgetPassword.style.display = "block";
  if (pageForgetPassword.style.display === "block") {
    forgetPage.style.backgroundColor = "#3461FD";
  } else {
    forgetPage.style.backgroundColor = "#D6DFFF";
  }
});

// КЛИКАБЕЛЬНЫЕ СТРЕЛКИ
arrowToBack.addEventListener("click", () => {
  pageForgetPassword.style.display = "none";
  pageSignIn.style.display = "block";
});

arrowToBackOTP.addEventListener("click", () => {
  enterOTPPage.style.display = "none";
  pageSignIn.style.display = "block";
});

arrowToBackReset.addEventListener("click", () => {
  resetPasswordPage.style.display = "none";
  pageSignIn.style.display = "block";
});

// СОХРАНЕНИЕ ДАННЫХ ПО КНОПКЕ create account

const CreateAccountBtn = document.querySelector(".CreateAccountBtn");

CreateAccountBtn.addEventListener("click", function () {
  const userName = document.getElementById("userName").value.trim();
  const email = document.getElementById("emailOrPhone").value.trim();
  const password = document.getElementById("passwordField").value.trim();
  const checkbox = document.getElementById("checkboxInput");
  const emailField = document.getElementById("emailOrPhone");
  const passwordField = document.getElementById("passwordField");
  const SignUpInput = document.querySelectorAll(".SignUpInput");

  if (userName === "" || email === "" || password === "") {
    SignUpInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    SignUpInput.forEach((item) => {
      item.style.backgroundColor = "#F5F9FE";
    });
  }

  const emailPattern = /[a-z][0-9]{3,15}@[a-z]{3,10}\.[a-z]{2,4}/;
  if (!emailPattern.test(email)) {
    emailField.style.backgroundColor = "#EB5757";
    return;
  } else {
    emailField.style.backgroundColor = "#F5F9FE";
  }

  const passwordPattern = /[0-9a-zA-Z@#$%^&*]{6,16}/;
  if (!passwordPattern.test(password)) {
    passwordField.style.backgroundColor = "#EB5757";
    return;
  } else {
    passwordField.style.backgroundColor = "#F5F9FE";
  }

  if (!checkbox.checked) {
    return;
  } else {
  }

  const userData = {
    userName: userName,
    email: email,
    password: password,
  };
  localStorage.setItem("userData", JSON.stringify(userData));

  const savedData = localStorage.getItem("userData");
  if (savedData.email === email) {
    emailField.style.backgroundColor = "#EB5757";
    return;
  } else {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  pageSignUp.style.display = "none";
  pageSignIn.style.display = "block";
});

// СТРАНИЦА АВТОРИЗАЦИИ

const logInBtn = document.querySelector(".logInBtn");
logInBtn.addEventListener("click", function () {
  const email = document.querySelector(".emailSignIn").value;
  const password = document.querySelector(".signInPassword").value;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const signInInput = document.querySelectorAll(".signInInput");

  if (email === "" || password === "") {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
  } else {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#F5F9FE";
    });
  }

  const emailPattern = /[a-z][0-9]{3,15}@[a-z]{3,10}\.[a-z]{2,4}/;
  if (!emailPattern.test(email)) {
  }

  if (userData.email === email && userData.password === password) {
    pageSignIn.style.display = "none";
    success.style.display = "block";
    return;
  }

  if (userData.email !== email) {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#F5F9FE";
    });
  }

  if (userData.password !== password) {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    signInInput.forEach((item) => {
      item.style.backgroundColor = "#F5F9FE";
    });
  }
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
continueBtn.addEventListener("click", function () {
  const email = document.getElementById("forgetEmail").value.trim();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const forgetPasswordInput = document.querySelector(".forgetPasswordInput");
  const emailPattern = /[a-z][0-9]{3,15}@[a-z]{3,10}\.[a-z]{2,4}/;

  if (email === "") {
    forgetPasswordInput.style.backgroundColor = "#EB5757";
    return;
  } else {
    forgetPasswordInput.style.backgroundColor = "#F5F9FE";
  }

  if (!emailPattern.test(email)) {
    forgetPasswordInput.style.backgroundColor = "#EB5757";
    return;
  } else {
    forgetPasswordInput.style.backgroundColor = "#F5F9FE";
  }

  if (userData.email === email) {
    pageForgetPassword.style.display = "none";
    enterOTPPage.style.display = "block";
  }

  if (enterOTPPage.style.display === "block") {
    enterPageReplaceColor.style.backgroundColor = "#3461FD";
    forgetPage.style.backgroundColor = "#D6DFFF";
  }
  // ЗАПРОС ДЛЯ ПОЛУЧЕНИЯ ПАРОЛЯ
  fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=10000&max=99999&count=1"
  )
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("code", data);
    });
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

const ResetPasswordBtn = document.querySelector(".ResetPasswordBtn");
const resetPageReplaceColor = document.querySelector(".resetPageReplaceColor");
const boxValue = [];
const getRandomCode = () => {
  return localStorage.getItem("code");
};

const resetFunction = () => {
  const randomCode = getRandomCode();
  boxCode.forEach((item) => {
    const value = item.value;
    if (item === "") {
      item.style.backgroundColor = "#EB5757";
      return;
    } else {
      item.style.backgroundColor = "#F5F9FE";
    }

    if (!isNaN(value) && value.length === 1) {
      boxValue.push(value);
    }
  });

  // clear field if false
  const clearField = () => {
    boxCode.forEach((field) => {
      field.value = "";
    });
  };

  if (randomCode === boxValue.join("")) {
    enterOTPPage.style.display = "none";
    resetPasswordPage.style.display = "block";
  } else {
    clearField();
    return;
  }

  if (resetPasswordPage.style.display === "block") {
    resetPageReplaceColor.style.backgroundColor = "#3461FD";
  }
};
// доделать эту ебанину

ResetPasswordBtn.addEventListener("click", resetFunction);

const resendOTP = document.querySelector(".resendOTP");
resendOTP.addEventListener("click", () => {
  fetch(
    "https://www.randomnumberapi.com/api/v1.0/random?min=10000&max=99999&count=1"
  )
    .then((Response) => Response.json())
    .then((data) => {
      localStorage.setItem("code", data);
    });
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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const errorBlock = document.querySelector(".errorBlock");
  const resetPasswordF = document.querySelector(".resetPasswordFirst");
  const resetPasswordS = document.querySelector(".resetPasswordSecond");
  if (resetPasswordFirst === "" || resetPasswordSecond === "") {
    resetInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    resetPasswordF.style.backgroundColor = "#F5F9FE";
    resetPasswordS.style.backgroundColor = "#F5F9FE";
  }

  if (
    resetPasswordFirst !== resetPasswordSecond ||
    userData.password === resetPasswordFirst
  ) {
    resetPasswordF.style.backgroundColor = "#EB5757";
    errorBlock.style.display = "block";
    return;
  } else {
    resetPasswordF.style.backgroundColor = "#F5F9FE";
    resetPasswordS.style.backgroundColor = "#F5F9FE";
    errorBlock.style.display = "none";
    userData.password = resetPasswordFirst;
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  resetPasswordPage.style.display = "none";
  pageSignIn.style.display = "block";
});

success.addEventListener("click", () => {
  success.style.display = "none";
  pageSignUp.style.display = "block";
});
