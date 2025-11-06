import { toast } from "sonner";
import z from "zod";

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

import type { MutationConfig } from "./react-query";

export const emailSignInInputSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Please give a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\-_])[A-Za-z\d!@#\-_]/,
      "Password must include uppercase letters, lowercase letters, numbers, and special characters: !@#-_"
    ),
});

export type EmailLogIn = z.infer<typeof emailSignInInputSchema>;

export const emailLogIn = async (payload: EmailLogIn) => {
  const res = await api.post("/auth/email/login", payload);
  return res.data;
};

type EmailLoginOption = {
  mutationConfig?: MutationConfig<typeof emailLogIn>;
};

export const useEmailLogin = ({ mutationConfig }: EmailLoginOption = {}) => {
  const { onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onError: (err, ...rest) => {
      toast.error("Faild to login", {
        description: err.response?.data.msg,
      });
      onError?.(err, ...rest);
    },
    ...restConfig,
    mutationFn: emailLogIn,
  });
};
