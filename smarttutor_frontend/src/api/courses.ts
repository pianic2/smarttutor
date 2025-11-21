import api from "./axios";

export async function getCourses() {
  const res = await api.get("/api/courses/");
  return res.data;
}

export async function createCourse(data: any) {
  const res = await api.post("/api/courses/", data);
  return res.data;
}
