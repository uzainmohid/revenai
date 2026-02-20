"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiLogin, apiRegister, apiUpload, apiReport, apiAnalyses } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import type { LoginReq, RegisterReq } from "@/lib/schemas/api";

export const QK = {
  analyses: ["analyses"] as const,
  report:   (id: number) => ["report", id] as const,
};

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password }: LoginReq) => ({ res: await apiLogin({ email, password }), email }),
    onSuccess: ({ res, email }) => { setAuth(res.access_token, email); router.push("/upload"); },
  });
}

export function useRegister() {
  return useMutation({ mutationFn: (d: RegisterReq) => apiRegister(d) });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const qc = useQueryClient();
  return () => { clearAuth(); qc.clear(); router.push("/login"); };
}

export function useAnalyses() {
  return useQuery({ queryKey: QK.analyses, queryFn: apiAnalyses, staleTime: 30_000 });
}

export function useReport(id: number | null) {
  return useQuery({
    queryKey: QK.report(id ?? 0),
    queryFn: () => apiReport(id!),
    enabled: id !== null,
    staleTime: Infinity,
  });
}

export function useUploadFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (f: File) => apiUpload(f),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.analyses }),
  });
}
