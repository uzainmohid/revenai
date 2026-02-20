import axios, { type AxiosError } from "axios";
import { useAuthStore } from "@/store/auth";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

function detail(data: unknown): string {
  if (data && typeof data === "object" && "detail" in data) return String((data as Record<string, unknown>).detail);
  return "An unexpected error occurred";
}

export const http = axios.create({ baseURL: BASE, timeout: 60_000 });

http.interceptors.request.use((cfg) => {
  if (typeof window !== "undefined") {
    const token = useAuthStore.getState().token;
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

http.interceptors.response.use(
  (r) => r,
  (err: AxiosError) => {
    const status = err.response?.status ?? 0;
    if (status === 401 && typeof window !== "undefined") {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
      throw new ApiError(401, "Session expired");
    }
    throw new ApiError(status, detail(err.response?.data));
  }
);

export async function GET<T>(url: string): Promise<T> {
  return (await http.get<T>(url)).data;
}
export async function POST<T>(url: string, data?: unknown): Promise<T> {
  return (await http.post<T>(url, data)).data;
}
export async function UPLOAD<T>(url: string, file: File): Promise<T> {
  const f = new FormData();
  f.append("file", file);
  return (await http.post<T>(url, f, { headers: { "Content-Type": "multipart/form-data" } })).data;
}
