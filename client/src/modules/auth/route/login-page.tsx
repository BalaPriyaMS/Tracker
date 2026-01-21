import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAppDispatch } from "@/app/store/hook";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";
import { updateUserInfo } from "@/features/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";

import { emailSignInInputSchema, useEmailLogin } from "../api/emial.login";
import { useValidateContact } from "../api/validate-contact";

const mobileSignInInputSchema = z.object({
  mobile: z
    .string()
    .min(1, "Please enter your mobile number.")
    .refine((value) => /^\d{10}$/.test(value), {
      message: "Please give a valid mobile number.",
    }),
  otp: z
    .string()
    .min(1, "Please enter your OTP.")
    .max(6, "OTP should be 6 digits."),
});

const formSchema = z
  .object({
    contact: z.string({ message: "Contact is required" }).refine(
      (value: string) => {
        return (
          z.string().email().safeParse(value).success || /^\d{10}$/.test(value)
        );
      },
      { message: "Please enter a valid email or 10-digit mobile number" },
    ),
  })
  .merge(emailSignInInputSchema)
  .merge(mobileSignInInputSchema);

type FormSchema = z.infer<typeof formSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [stepNo, setStepNo] = useState(1);
  const [contactType, setContactType] = useState("email");

  const { mutateAsync: validateContact } = useValidateContact();
  const { mutateAsync: emailLogin } = useEmailLogin();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      email: "",
      password: "",
      mobile: "",
      otp: "",
    },
  });

  const handleContinue = async () => {
    const isValid = await form.trigger("contact");
    if (!isValid) return;
    const contact = form.getValues("contact");

    const res = await validateContact({ contact });

    if (res.isActive) {
      setStepNo(2);
      if (res.type === "mobile") {
        setContactType("mobile");
      }
      if (res.type === "email") {
        setContactType("email");
      }
    } else form.setError("contact", { message: "user not fount" });
  };

  const handleLogin = async () => {
    const data = form.getValues();
    if (contactType === "email") {
      console.log(data.email, "mail");

      const payload = { email: data.contact, password: data.password };
      try {
        await emailLogin(payload);
        const res = {
          contact: data.contact,
        };

        dispatch(updateUserInfo(res));

        form.reset();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else form.setError("password", { message: "Invalid Password" });
  };

  return (
    <div className="flex justify-center bg-white rounded-lg w-1/2">
      <Card className="bg-linear-to-br from-[#fef2f2] via-[#ffedd4] to-[#ffc9c9] shadow-none m-1 p-10 border-none w-full h-96">
        <p className="font-bold text-3xl">Welcome !</p>
        <div className="flex flex-col items-center space-y-6">
          <Form {...form}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 w-full"
            >
              {stepNo === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Mobile Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <Button onClick={handleContinue} className="w-full">
                    Continue
                  </Button>
                </>
              )}
              {stepNo === 2 && (
                <>
                  {contactType === "email" ? (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              value={field.value}
                              onChange={field.onChange}
                              autoComplete="off"
                              autoFocus
                            />
                          </FormControl>
                          <FormMessage />
                          <Link to="../forgot-password">Forgot Password ?</Link>
                        </FormItem>
                      )}
                    ></FormField>
                  ) : (
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-Time Password</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup className="gap-2">
                                {[...Array(6)].map((_, index) => (
                                  <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="bg-white w-14"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <Button
                              type="button"
                              variant="link"
                              className="p-0"
                            >
                              Resend OTP
                            </Button>

                            <p className="text-muted-foreground text-sm">
                              time
                            </p>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  )}
                  <Button className="w-full" onClick={handleLogin}>
                    Log In
                  </Button>
                </>
              )}
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};
