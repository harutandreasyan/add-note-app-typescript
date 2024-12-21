import axios from "axios";
import { InputNote, INote } from "../types";

const Axios = axios.create({
  baseURL: "http://localhost:4000",
});

export const getAllNotes = async (): Promise<INote[]> => {
  const response = await Axios.get("/notes");
  return response.data;
};

export const addNote = async (body: InputNote): Promise<INote> => {
  const response = await Axios.post("/notes", body);
  return response.data;
};

export const editNote = async (id: string, body: InputNote): Promise<INote> => {
  const response = await Axios.put(`/notes/${id}`, body);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await Axios.delete(`/notes/${id}`);
};

export const updateNote = async (id: string, body: Partial<INote>): Promise<INote> => {
  const response = await Axios.put(`/notes/${id}`, body);
  return response.data;
};