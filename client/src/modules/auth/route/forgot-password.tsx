import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPassword,
  type ForgotPasswordInput,
} from "../api/forgot-password";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "please enter your email")
    .email("please give a valid email"),
});

type FormSchema = z.infer<typeof formSchema>;

export const ForgotPassword = () => {
  const [isSend, setIsSend] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const isValid = await form.trigger("email");
    if (!isValid) return;
    setIsSend(true);
    await forgotPassword(data);
  };

  return (
    <div className="flex justify-center bg-white rounded-lg w-1/2">
      <Card className="bg-linear-to-br from-[#fef2f2] via-[#ffedd4] to-[#ffc9c9] shadow-none m-1 p-10 border-none w-full h-96">
        <p className="font-bold text-3xl">Forged PassWord </p>
        {isSend ? (
          <div className="flex flex-col items-center space-y-6">
            <p> You will receive a reset link shortly.</p>
            <div className="mt-6 w-full">
              <Link to="../login">
                <Button className="w-full">Go to Log In</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                      <Link to="../login">Go to Log in</Link>
                    </FormItem>
                  )}
                ></FormField>

                <Button className="w-full">Send Reset Link</Button>
              </form>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};
