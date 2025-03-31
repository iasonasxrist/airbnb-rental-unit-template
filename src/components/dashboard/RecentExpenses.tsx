
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app, this would come from your database
const recentExpenses = [
  {
    id: "1",
    description: "Plumbing repair",
    category: "Maintenance",
    amount: 120.00,
    date: "2023-05-10",
    property: "Beach House",
  },
  {
    id: "2",
    description: "New towels",
    category: "Supplies",
    amount: 65.50,
    date: "2023-05-08",
    property: "City Apartment",
  },
  {
    id: "3",
    description: "Cleaning service",
    category: "Cleaning",
    amount: 90.00,
    date: "2023-05-05",
    property: "Mountain Cabin",
  },
  {
    id: "4",
    description: "WiFi bill",
    category: "Utilities",
    amount: 59.99,
    date: "2023-05-01",
    property: "Beach House",
  },
];

export function RecentExpenses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Property</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  {expense.description}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.property}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
