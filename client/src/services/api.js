import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createNote = async (noteData) => {
  const response = await axios.post(`${API_BASE_URL}/notes`, noteData);
  return response.data;
};

export const updateNote = async (noteId, content) => {
  const response = await axios.put(`${API_BASE_URL}/notes/${noteId}`, { content });
  return response.data;
};

export const getNotesByRoom = async (room) => {
  const response = await axios.get(`${API_BASE_URL}/notes/${room}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const getUsersByRoom = async (room) => {
  const response = await axios.get(`${API_BASE_URL}/users/${room}`);
  return response.data;
};
