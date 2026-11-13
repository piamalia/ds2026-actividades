import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().transform((val, ctx) => {
    const parsed = Number(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El ID debe ser un número válido"
      });
      return z.NEVER;
    }
    return parsed;
  })
});
