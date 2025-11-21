import api from "./axios";

export async function getNotes(courseId: number) {
  const res = await api.get(`/api/courses/${courseId}/notes/`);
  return res.data;
}

export async function createNote(courseId: number, data: any) {
  const res = await api.post(`/api/courses/${courseId}/notes/`, data);
  return res.data;
}
