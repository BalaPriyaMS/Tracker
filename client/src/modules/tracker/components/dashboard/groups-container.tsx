import { Clock, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

import { groupsList } from "../data";

export const GroupsDashboard = () => {
  const navigate = useNavigate();
  const currencyCode = useAppSelector((state) => state.app.currencyCode);
  const locale = useAppSelector((state) => state.app.locale);

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div className="mx-auto p-6 container">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">My Groups</h1>
        <p className="text-muted-foreground">
          Manage and track expenses across all your groups
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {groupsList.map((group) => (
          <Card
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="mb-1 text-xl">{group.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{group.lastActivity}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-muted-foreground">
                  {group.membersCount} members
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex justify-center items-center bg-purple-100 rounded-full w-8 h-8">
                  <Wallet className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Total spent</p>
                  <p className="font-semibold">
                    {formatCurrency(group.totalSpent, currencyCode, locale)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t text-sm">
                <div
                  className={cn(
                    "flex justify-center items-center rounded-full size-8",
                    group.myBalance > 0
                      ? "bg-green-100"
                      : group.myBalance < 0
                      ? "bg-red-100"
                      : "bg-gray-100"
                  )}
                >
                  {group.myBalance > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : group.myBalance < 0 ? (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  ) : (
                    <Wallet className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">
                    {group.myBalance > 0
                      ? "You get back"
                      : group.myBalance < 0
                      ? "You owe"
                      : "Settled up"}
                  </p>
                  <p
                    className={cn(
                      "font-bold",
                      group.myBalance > 0
                        ? "text-green-600"
                        : group.myBalance < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    )}
                  >
                    {group.myBalance === 0
                      ? "All settled"
                      : formatCurrency(
                          Math.abs(group.myBalance),
                          currencyCode,
                          locale
                        )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
