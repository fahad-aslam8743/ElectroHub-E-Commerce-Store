import { z } from "zod";
export const checkoutSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters" }),
  phone: z
    .string()
    .regex(/^\d{10,}$/, { message: "Phone number must be at least 10 digits" }),
});