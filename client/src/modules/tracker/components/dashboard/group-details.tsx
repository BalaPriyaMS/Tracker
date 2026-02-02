import {
  ArrowLeft,
  Calendar,
  Clock,
  IndianRupee,
  Receipt,
  Settings,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector } from "@/app/store/hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency } from "@/lib/utils";

import {
  activityLog,
  balances,
  expenses,
  groupDetails,
  groupsList,
} from "../data";

export const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const currencyCode = useAppSelector((state) => state.app.currencyCode);
  const locale = useAppSelector((state) => state.app.locale);

  // Find the group from groupsList
  const group = groupsList.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="mb-2 font-bold text-2xl">Group not found</h2>
          <Button onClick={() => navigate("/")}>Back to Groups</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-background to-accent/20 min-h-screen">
      {/* Header Section */}
      <div className="top-0 z-10 sticky bg-background shadow-sm border-b">
        <div className="mx-auto px-6 py-4 container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-bold text-2xl">{group.name}</h1>
                <p className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Calendar className="w-3 h-3" />
                  Created on {new Date(group.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <UserPlus className="mr-2 w-4 h-4" />
                Invite
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mx-auto px-6 py-6 container">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Members</p>
                  <p className="font-bold text-2xl">{group.membersCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-purple-100 rounded-full w-10 h-10">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total Spent</p>
                  <p className="font-bold text-2xl">
                    {formatCurrency(group.totalSpent, currencyCode, locale)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex justify-center items-center rounded-full w-10 h-10",
                    group.myBalance > 0
                      ? "bg-green-100"
                      : group.myBalance < 0
                      ? "bg-red-100"
                      : "bg-gray-100"
                  )}
                >
                  {group.myBalance > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : group.myBalance < 0 ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <Wallet className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    {group.myBalance > 0
                      ? "You get back"
                      : group.myBalance < 0
                      ? "You owe"
                      : "Balance"}
                  </p>
                  <p
                    className={cn(
                      "font-bold text-2xl",
                      group.myBalance > 0
                        ? "text-green-600"
                        : group.myBalance < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    )}
                  >
                    {group.myBalance === 0
                      ? "Settled"
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

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-orange-100 rounded-full w-10 h-10">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Last Activity</p>
                  <p className="font-semibold text-sm">{group.lastActivity}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="justify-start gap-6 bg-transparent p-0 border-b rounded-none w-full h-auto">
            <TabsTrigger
              value="expenses"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 border-transparent data-[state=active]:border-primary border-b-2 rounded-none"
            >
              <Receipt className="mr-2 w-4 h-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="balances"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 border-transparent data-[state=active]:border-primary border-b-2 rounded-none"
            >
              <IndianRupee className="mr-2 w-4 h-4" />
              Balances
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 border-transparent data-[state=active]:border-primary border-b-2 rounded-none"
            >
              <Users className="mr-2 w-4 h-4" />
              Details
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 border-transparent data-[state=active]:border-primary border-b-2 rounded-none"
            >
              <Clock className="mr-2 w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="mt-6">
            <div className="space-y-3">
              {expenses.map((expense) => (
                <Card
                  key={expense.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center bg-purple-100 rounded-full w-12 h-12">
                          <Receipt className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {expense.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Paid by {expense.paidBy} •{" "}
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">
                          {formatCurrency(expense.amount, currencyCode, locale)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {expense.splitType === "equal"
                            ? "Split equally"
                            : "Custom split"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Balances Tab */}
          <TabsContent value="balances" className="mt-6">
            <div className="space-y-3">
              {balances.map((balance, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center bg-green-100 rounded-full w-12 h-12">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {balance.fromUser}{" "}
                            <span className="font-normal text-muted-foreground">
                              owes
                            </span>{" "}
                            {balance.toUser}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Settlement pending
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-green-600 text-xl">
                          {formatCurrency(balance.amount, currencyCode, locale)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>
                  {groupDetails.members.length} people in this group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groupDetails.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 hover:bg-accent p-3 rounded-lg transition-colors"
                    >
                      <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-full w-10 h-10 font-semibold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {member.id === "u1" ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-6">
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary mt-2 rounded-full w-2 h-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="mt-1 text-muted-foreground text-xs">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
