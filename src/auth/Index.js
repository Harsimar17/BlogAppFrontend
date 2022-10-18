export const isLogin = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  }
  return true;
};

export const doLogin = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const doLogout = () => {
  localStorage.removeItem("data");
};

export const fetchDetails = () => {
  if (isLogin) {
    return JSON.parse(localStorage.getItem("data"));
  }
  return false;
};
