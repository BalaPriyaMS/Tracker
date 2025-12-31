import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { useEmailInvite } from "../api/invite-emil";

const emailSignInInputSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Please give a valid email."),
});

type FormSchema = z.infer<typeof emailSignInInputSchema>;
const EmailInvite = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(emailSignInInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: emailInvite } = useEmailInvite();

  const handleInvite = async () => {
    const data = form.getValues();

    const payload = { email: data.email };
    await emailInvite(payload);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Invite</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite </DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to invite.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6">
          <Form {...form}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
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
              <Button onClick={handleInvite} className="w-full">
                Invite
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailInvite;
