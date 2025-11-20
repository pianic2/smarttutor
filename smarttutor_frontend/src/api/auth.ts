import api from "./axios";

export async function login(username: string, password: string) {
  const res = await api.post("/api/auth/token/", { username, password });
  return res.data; // { access, refresh }
}

export async function registerUser({ username, email, password }: any) {
  const res = await api.post("/api/auth/register/", {
    username,
    email,
    password,
  });
  return res.data;
}

export async function getMe() {
  const res = await api.get("/api/auth/me/");
  return res.data; // user info
}
