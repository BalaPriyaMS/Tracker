import { toast } from "sonner";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

import type { MutationConfig } from "./react-query";

export const forgotPasswordInputSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Please give a valid email."),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;

export const forgotPassword = async (payload: ForgotPasswordInput) => {
  const res = await api.post("/auth/forget-password", payload);
  return res.data;
};

type UserForgotPasswordOptions = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({
  mutationConfig,
}: UserForgotPasswordOptions = {}) => {
  const { onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onError: (err, ...rest) => {
      toast.error("Failed to send forgot password email!", {
        description: err.response?.data.msg,
      });
      onError?.(err, ...rest);
    },
    ...restConfig,
    mutationFn: forgotPassword,
  });
};
