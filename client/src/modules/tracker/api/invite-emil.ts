import { toast } from "sonner";
import z from "zod";

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

import type { MutationConfig } from "@/modules/auth/api/react-query";
export const emailSignInInputSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Please give a valid email."),
});

export type EmailInvite = z.infer<typeof emailSignInInputSchema>;

export const emailInvite = async (payload: EmailInvite) => {
  const res = await api.post("/auth/sent-invite", payload);
  return res.data;
};

type EmailInviteOption = {
  mutationConfig?: MutationConfig<typeof emailInvite>;
};

export const useEmailInvite = ({ mutationConfig }: EmailInviteOption = {}) => {
  const { onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onError: (err, ...rest) => {
      toast.error("Faild to login", {
        description: err.response?.data.msg,
      });
      onError?.(err, ...rest);
    },
    ...restConfig,
    mutationFn: emailInvite,
  });
};
