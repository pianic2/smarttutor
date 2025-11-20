import api from "./axios";

export async function getNotes(courseId: number) {
  const res = await api.get(`/courses/${courseId}/notes/`);
  return res.data;
}

export async function createNote(courseId: number, data: any) {
  const res = await api.post(`/courses/${courseId}/notes/`, data);
  return res.data;
}
