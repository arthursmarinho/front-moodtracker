import axios from "axios";
import { PostMoodDto } from "./dto/mood.dto";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("api: ", API_URL);

export const MoodService = {
  async getAll(startDate?: string, endDate?: string) {
    const res = await axios.get(`${API_URL}/mood`, {
      params: { startDate, endDate },
    });
    return res.data;
  },

  async createPost(data: PostMoodDto) {
    try {
      const res = await axios.post(`${API_URL}/mood`, data);
      return { ok: true, data: res.data };
    } catch (error: any) {
      return { ok: false, data: error?.response?.data || error.message };
    }
  },

  async deletePost(id: number) {
    const res = await axios.delete(`${API_URL}/mood/${id}`);
    return res.data;
  },
};
