import { GET, POST, UPLOAD } from "./client";
import {
  TokenResSchema, UserOutSchema, AnalysisOutSchema, ReportSchema,
  type LoginReq, type RegisterReq, type TokenRes, type AnalysisOut, type Report,
} from "@/lib/schemas/api";
import { z } from "zod";

export const apiLogin      = async (d: LoginReq): Promise<TokenRes>     => TokenResSchema.parse(await POST("/auth/login", d));
export const apiRegister   = async (d: RegisterReq)                      => UserOutSchema.parse(await POST("/auth/register", d));
export const apiUpload     = async (f: File): Promise<AnalysisOut>      => AnalysisOutSchema.parse(await UPLOAD("/analysis/upload", f));
export const apiReport     = async (id: number): Promise<Report>        => ReportSchema.parse(await GET(`/analysis/${id}/report`));
export const apiAnalyses   = async (): Promise<AnalysisOut[]>           => z.array(AnalysisOutSchema).parse(await GET("/analysis/"));
