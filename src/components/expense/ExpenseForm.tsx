
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpenseFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newExpense: {
    description: string;
    category: string;
    amount: string;
    date: string;
    property: string;
  };
  setNewExpense: React.Dispatch<
    React.SetStateAction<{
      description: string;
      category: string;
      amount: string;
      date: string;
      property: string;
    }>
  >;
  handleAddExpense: () => void;
  selectedProperty: string;
  properties: { id: string; name: string }[];
  categories: string[];
}

export function ExpenseForm({
  open,
  setOpen,
  newExpense,
  setNewExpense,
  handleAddExpense,
  selectedProperty,
  properties,
  categories,
}: ExpenseFormProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Record a new expense for one of your properties.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  description: e.target.value,
                })
              }
              placeholder="Plumbing repair"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) =>
                setNewExpense({ ...newExpense, category: value })
              }
              value={newExpense.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              placeholder="0.00"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="property">Property</Label>
            <Select
              onValueChange={(value) =>
                setNewExpense({ ...newExpense, property: value })
              }
              value={newExpense.property}
              defaultValue={selectedProperty !== "all" ? selectedProperty : undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.name}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddExpense}>Add Expense</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
