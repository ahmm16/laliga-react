import { setToken } from "../helpers/auth";
const URL = "https://reqres.in/api";

export const loginApi = async (data) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const { token } = result;
    token && (await setToken(token));
    return result;
  } catch (error) {
    return error.message + " - " + error.code;
  }
};
