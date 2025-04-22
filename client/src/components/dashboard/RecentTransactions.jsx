import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentTransactions() {
    const transactions = useMemo(
        () => [
            {
                id: "1",
                name: "John Doe",
                email: "john.doe@example.com",
                amount: 125.99,
                status: "completed",
                date: "2023-06-10",
            },
            {
                id: "2",
                name: "Jane Smith",
                email: "jane.smith@example.com",
                amount: 89.5,
                status: "pending",
                date: "2023-06-09",
            },
            {
                id: "3",
                name: "Robert Johnson",
                email: "robert.j@example.com",
                amount: 255.0,
                status: "completed",
                date: "2023-06-08",
            },
            {
                id: "4",
                name: "Emily Wilson",
                email: "emily.w@example.com",
                amount: 44.95,
                status: "failed",
                date: "2023-06-07",
            },
            {
                id: "5",
                name: "Michael Brown",
                email: "m.brown@example.com",
                amount: 199.99,
                status: "completed",
                date: "2023-06-07",
            },
        ],
        []
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "success";
            case "pending":
                return "warning";
            case "failed":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        Your latest financial activities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.name}`}
                                            />
                                            <AvatarFallback>
                                                {getInitials(transaction.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">
                                                {transaction.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {transaction.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ${transaction.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getStatusColor(
                                                transaction.status
                                            )}
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(
                                            transaction.date
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}
