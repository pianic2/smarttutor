import api from "./axios";

export async function getCourses() {
  const res = await api.get("/courses/");
  return res.data;
}

export async function createCourse(data: any) {
  const res = await api.post("/courses/", data);
  return res.data;
}
