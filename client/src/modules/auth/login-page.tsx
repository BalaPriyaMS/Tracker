import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const LoginPage = () => {
  return (
    <Card className="flex justify-center items-center shadow-none p-4 border-none w-3/5 h-96">
      <p className="font-bold text-3xl">Welcome !</p>
      <Button>login</Button>
    </Card>
  );
};
