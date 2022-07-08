import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://igti-react-backend-dp3-acanuto.glitch.me';
	

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url: string) {
  const { data } = await axiosInstance.get(url);
  return data;
}
