import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Deve ser um e-mail"),
  name: z.string().nonempty("Senha é obrigatória"),
  telephone: z.string(),
});

export type ContactData = z.infer<typeof schema>;
