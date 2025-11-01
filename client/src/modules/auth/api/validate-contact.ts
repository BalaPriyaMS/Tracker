import { toast } from "sonner";
import z from "zod";

import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

import type { MutationConfig } from "./react-query";

export const validateContactInputSchema = z.object({
  contact: z.string().min(1, "Please enter your contact"),
});

export type ValidateContactInput = z.infer<typeof validateContactInputSchema>;
export const validateContact = async (
  payload: ValidateContactInput
): Promise<ValidateContactResponse> => {
  const res = await api.post("/auth/check", payload);
  return res.data;
};

type UserValidateContactOption = {
  mutationConfig?: MutationConfig<typeof validateContact>;
};

export const useValidateContact = ({
  mutationConfig,
}: UserValidateContactOption = {}) => {
  const { onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onError: (err, ...rest) => {
      toast.error("Failed to validate contact!", {
        description: err.response?.data.msg,
      });
      onError?.(err, ...rest);
    },
    ...restConfig,
    mutationFn: validateContact,
  });
};
