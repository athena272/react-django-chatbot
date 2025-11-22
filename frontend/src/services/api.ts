import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Message {
  id: number
  user: 'A' | 'B'
  content: string
  response: string
  created_at: string
}

export interface CreateMessageRequest {
  user: 'A' | 'B'
  content: string
}

export const messageService = {
  async createMessage(data: CreateMessageRequest): Promise<Message> {
    const response = await api.post<Message>('/messages/', data)
    return response.data
  },

  async getMessages(user?: 'A' | 'B'): Promise<Message[]> {
    const params = user ? { user } : {}
    const response = await api.get<Message[]>('/messages/', { params })
    return response.data
  },
}

export default api

