
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

// Sample data - in a real app, this would come from your database
const allExpenses = [
  {
    id: "1",
    description: "Plumbing repair",
    category: "Maintenance",
    amount: 120.00,
    date: "2023-05-10",
    property: "Beach House",
    propertyId: "1",
  },
  {
    id: "2",
    description: "New towels",
    category: "Supplies",
    amount: 65.50,
    date: "2023-05-08",
    property: "City Apartment",
    propertyId: "2",
  },
  {
    id: "3",
    description: "Cleaning service",
    category: "Cleaning",
    amount: 90.00,
    date: "2023-05-05",
    property: "Mountain Cabin",
    propertyId: "3",
  },
  {
    id: "4",
    description: "WiFi bill",
    category: "Utilities",
    amount: 59.99,
    date: "2023-05-01",
    property: "Beach House",
    propertyId: "1",
  },
  {
    id: "5",
    description: "New coffee maker",
    category: "Supplies",
    amount: 45.00,
    date: "2023-04-28",
    property: "Mountain Cabin",
    propertyId: "3",
  },
  {
    id: "6",
    description: "Property tax",
    category: "Taxes",
    amount: 850.00,
    date: "2023-04-15",
    property: "Beach House",
    propertyId: "1",
  },
];

interface RecentExpensesProps {
  propertyId?: string | null;
}

export function RecentExpenses({ propertyId }: RecentExpensesProps) {
  const [filteredExpenses, setFilteredExpenses] = useState(allExpenses);

  useEffect(() => {
    if (propertyId) {
      setFilteredExpenses(allExpenses.filter(expense => expense.propertyId === propertyId));
    } else {
      setFilteredExpenses(allExpenses);
    }
  }, [propertyId]);

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
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.slice(0, 4).map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  {expense.description}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {filteredExpenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  No expenses found for this property
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
