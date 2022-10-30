export const isLogin = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  }
  return true;
};

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

export const fetchDetails = () => {
  if (isLogin()) {
    return JSON.parse(localStorage.getItem("data")).u;
  }
  return false;
};
export const getToken = () => {
  if (isLogin()) {
    return JSON.parse(localStorage.getItem("data")).token;
  }
};
