import { z } from "zod";

export type IApiError = z.infer<typeof apiErrorSchema>;
export const apiErrorSchema = z.object({
  error: z.string(),
  status: z.number(),
});
