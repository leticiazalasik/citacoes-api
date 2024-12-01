import axios from "axios";

// Configurando a API do JSONPlaceholder
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export async function getPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>("/posts");
  return response.data;
}

export async function getPost(id: number): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
}

// Configurando a API ZenQuotes
const apiQuotes = axios.create({
  baseURL: "https://api.allorigins.win/raw?url=https://zenquotes.io/api",
});

export interface Quote {
  id?: number; // Como ZenQuotes não retorna um ID, esse campo pode ser opcional
  q: string; // Texto da citação
  a: string; // Autor da citação
}

export async function getRandomQuote(): Promise<Quote> {
  try {
    const response = await apiQuotes.get<Quote[]>("/random"); // ZenQuotes retorna uma lista
    return response.data[0]; // Retorna apenas o primeiro item da lista
  } catch (error) {
    console.error("Erro ao buscar citação:", error);
    throw new Error("Não foi possível obter a citação. Tente novamente mais tarde.");
  }
}

export async function getQuotes(): Promise<Quote[]> {
  try {
    const response = await apiQuotes.get<Quote[]>("/quotes"); // Caso o endpoint `/quotes` exista
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar citações:", error);
    throw new Error("Não foi possível obter as citações. Tente novamente mais tarde.");
  }
}
