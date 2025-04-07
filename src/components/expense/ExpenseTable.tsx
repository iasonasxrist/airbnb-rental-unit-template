
import React from "react";
import {
  Card,
  CardContent,
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

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  property: string;
}

interface ExpenseTableProps {
  filteredExpenses: Expense[];
  selectedProperty: string;
  propertyFilter: string;
}

export function ExpenseTable({
  filteredExpenses,
  selectedProperty,
  propertyFilter,
}: ExpenseTableProps) {
  const title = 
    selectedProperty !== "all" 
      ? propertyFilter === "all" 
        ? `Expenses for ${selectedProperty}`
        : `${propertyFilter} Expenses for ${selectedProperty}`
      : propertyFilter === "all"
      ? "All Expenses"
      : `Expenses for ${propertyFilter}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  {expense.description}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.property}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {filteredExpenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
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
