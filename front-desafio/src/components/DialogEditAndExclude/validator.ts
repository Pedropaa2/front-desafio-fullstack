import { z } from "zod";

export const schema = z.object({
  email: z.string(),
  name: z.string(),
  telephone: z.string(),
});
export const contactSchemaUpdateRequest = schema.partial();
export type ContactDataUpdate = z.infer<typeof contactSchemaUpdateRequest>;
