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

const setElementHasError = (el, hasError) => {};
// переходы с страницы на страницу
signInBtn.addEventListener("click", () => {
  hide(pageSignUp);
  show(pageSignIn);
});

signUpBtn.addEventListener("click", () => {
  show(pageSignUp);
  hide(pageSignIn);
});

const forgetPage = document.querySelector(".forgetPage");
forgetPasswordLink.addEventListener("click", () => {
  hide(pageSignIn);
  show(pageForgetPassword);
  if (show(pageForgetPassword)) {
    forgetPage.style.backgroundColor = "#3461FD";
  } else {
    forgetPage.style.backgroundColor = "#D6DFFF";
  }
});

// КЛИКАБЕЛЬНЫЕ СТРЕЛКИ
arrowToBack.addEventListener("click", () => {
  hide(pageForgetPassword);
  show(pageSignIn);
});

arrowToBackOTP.addEventListener("click", () => {
  hide(enterOTPPage);
  show(pageSignIn);
});

arrowToBackReset.addEventListener("click", () => {
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
  const emailField = document.getElementById("emailOrPhone");
  const passwordField = document.getElementById("passwordField");
  const signUpInput = document.querySelectorAll(".signUpInput");

  if (userName === "" || email === "" || password === "") {
    signUpInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    signUpInput.forEach((item) => {
      item.style.backgroundColor = "#F5F9FE";
    });
  }

  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  if (!emailPattern.test(email)) {
    emailField.style.backgroundColor = "#EB5757";
    return;
  } else {
    emailField.style.backgroundColor = "#F5F9FE";
  }

  const passwordPattern = /[0-9a-zA-Z@#$%^&*]{8,16}/;
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

  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const dubicate = savedUsers.some((data) => {
    return data.email === email;
  });
  if (dubicate) {
    // добавить красный фон поля емайл
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

  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  if (!emailPattern.test(email)) {
  }

  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const findUser = savedUsers.find((data) => {
    return data.email === email;
  });

  if (!findUser) {
    alert("dasdsa");
    return false;
  }

  localStorage.setItem("curUser", JSON.stringify(findUser));
  hide(pageSignIn);
  show(success);
  // if (userData.email === email && userData.password === password) {
  //   hide(pageSignIn);
  //   show(success);
  //   return;
  // }

  // if (userData.email !== email) {
  //   signInInput.forEach((item) => {
  //     item.style.backgroundColor = "#EB5757";
  //   });
  //   return;
  // } else {
  //   signInInput.forEach((item) => {
  //     item.style.backgroundColor = "#F5F9FE";
  //   });
  // }

  // if (userData.password !== password) {
  //   signInInput.forEach((item) => {
  //     item.style.backgroundColor = "#EB5757";
  //   });
  //   return;
  // } else {
  //   signInInput.forEach((item) => {
  //     item.style.backgroundColor = "#F5F9FE";
  //   });
  // }
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

let foundEmail = "";

continueBtn.addEventListener("click", function () {
  const email = document.getElementById("forgetEmail").value.trim();
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const forgetPasswordInput = document.querySelector(".forgetPasswordInput");
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

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

  const savedEmail = savedUsers.find((user) => user.email === email && user);

  if (email === savedEmail.email) {
    hide(pageForgetPassword);
    show(enterOTPPage);
  } else {
    return;
  }

  if (show(enterOTPPage)) {
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

  foundEmail = savedEmail;
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
    hide(enterOTPPage);
    show(resetPasswordPage);
  } else {
    clearField();
    return;
  }

  if (show(resetPasswordPage)) {
    resetPageReplaceColor.style.backgroundColor = "#3461FD";
  }
};
// доделать эту ебанину

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
  boxValue.splice(0, boxValue.length);
});

// ЗАМЕНА ПАРОЛЯ
// const inputReset = document.querySelector(".reset");
// inputReset.addEventListener("keydown", function (e) {
//   const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
//   const newPassword = e.target.value;
//   const findUserPassword = savedUsers.map((user) => {
//     if (user.email === foundEmail) {
//       return { ...user, password: newPassword };
//     }
//   });
//   localStorage.setItem("userData", findUserPassword);
// });

const resetPasswordBtn = document.querySelector(".resetPasswordBtn");

resetPasswordBtn.addEventListener("click", function (e) {
  const resetPasswordFirst = document
    .querySelector(".resetPasswordFirst")
    .value.trim();
  const resetPasswordSecond = document
    .querySelector(".resetPasswordSecond")
    .value.trim();
  const resetInput = document.querySelectorAll(".resetInput");
  const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  const errorBlock = document.querySelector(".errorBlock");
  const resetPasswordF = document.querySelector(".resetPasswordFirst");
  const resetPasswordS = document.querySelector(".resetPasswordSecond");

  // const newPassword = e.target.value;
  // const findUserPassword = savedUsers.map((user) => {
  //   if (user.email === foundEmail) {
  //     return { ...user, password: newPassword };
  //   }
  // });
  //   return (
  //     data.password === resetPasswordFirst ||
  //     data.password === resetPasswordSecond
  //   );
  // });

  // localStorage.setItem("userData", findUserPassword);
  const userIndex = savedUsers.findIndex((data) => {
    return data.email === foundEmail;
  });
  if (resetPasswordFirst === "" || resetPasswordSecond === "") {
    resetInput.forEach((item) => {
      item.style.backgroundColor = "#EB5757";
    });
    return;
  } else {
    resetPasswordF.style.backgroundColor = "#F5F9FE";
    resetPasswordS.style.backgroundColor = "#F5F9FE";
  }

  if (savedUsers[userIndex].password === resetPasswordFirst) {
    resetPasswordF.style.backgroundColor = "#EB5757";
    show(errorBlock);
    return;
  } else {
    resetPasswordF.style.backgroundColor = "#F5F9FE";
    resetPasswordS.style.backgroundColor = "#F5F9FE";
    hide(errorBlock);
  }

  if (userIndex) {
    savedUsers[userIndex].password = newPassword;
    localStorage.setItem("userData", JSON.stringify(savedUsers));
    hide(resetPasswordPage);
    show(pageSignIn);
  }
  // if (
  //   resetPasswordFirst !== resetPasswordSecond ||
  //   savedUsers.password === resetPasswordFirst
  // ) {
  //   resetPasswordF.style.backgroundColor = "#EB5757";
  //   show(errorBlock);
  //   return;
  // } else {
  //   resetPasswordF.style.backgroundColor = "#F5F9FE";
  //   resetPasswordS.style.backgroundColor = "#F5F9FE";
  //   hide(errorBlock);
  //   savedUsers.password = resetPasswordFirst;
  //   localStorage.setItem("userData", JSON.stringify(userData));
  // }

  // hide(resetPasswordPage);
  // show(pageSignIn);
});

success.addEventListener("click", () => {
  hide(success);
  show(pageSignUp);
});
