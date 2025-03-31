
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - in a real app, this would come from your database
const initialExpenses = [
  {
    id: "1",
    description: "Plumbing repair",
    category: "Maintenance",
    amount: 120.0,
    date: "2023-05-10",
    property: "Beach House",
  },
  {
    id: "2",
    description: "New towels",
    category: "Supplies",
    amount: 65.5,
    date: "2023-05-08",
    property: "City Apartment",
  },
  {
    id: "3",
    description: "Cleaning service",
    category: "Cleaning",
    amount: 90.0,
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
  {
    id: "5",
    description: "New coffee maker",
    category: "Supplies",
    amount: 45.0,
    date: "2023-04-28",
    property: "Mountain Cabin",
  },
  {
    id: "6",
    description: "Property tax",
    category: "Taxes",
    amount: 850.0,
    date: "2023-04-15",
    property: "Beach House",
  },
  {
    id: "7",
    description: "Deep cleaning",
    category: "Cleaning",
    amount: 150.0,
    date: "2023-04-10",
    property: "City Apartment",
  },
  {
    id: "8",
    description: "Furniture repair",
    category: "Maintenance",
    amount: 75.0,
    date: "2023-04-05",
    property: "Mountain Cabin",
  },
];

// Sample properties for the dropdown
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

// Expense categories
const categories = [
  "Cleaning",
  "Maintenance",
  "Supplies",
  "Utilities",
  "Taxes",
  "Insurance",
  "Other",
];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses);
  const [open, setOpen] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
    property: "",
  });
  const { toast } = useToast();

  const handleAddExpense = () => {
    if (
      !newExpense.description ||
      !newExpense.category ||
      !newExpense.amount ||
      !newExpense.date ||
      !newExpense.property
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const expense = {
      id: (expenses.length + 1).toString(),
      description: newExpense.description,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
      property: newExpense.property,
    };

    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    
    // Apply current filter to the updated expenses
    if (propertyFilter === "all") {
      setFilteredExpenses(updatedExpenses);
    } else {
      setFilteredExpenses(
        updatedExpenses.filter((exp) => exp.property === propertyFilter)
      );
    }

    setNewExpense({
      description: "",
      category: "",
      amount: "",
      date: "",
      property: "",
    });
    setOpen(false);

    toast({
      title: "Expense added",
      description: `A new expense of $${parseFloat(newExpense.amount).toFixed(
        2
      )} has been recorded`,
    });
  };

  const handleFilterChange = (value: string) => {
    setPropertyFilter(value);
    
    if (value === "all") {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(expenses.filter((expense) => expense.property === value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Property</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={propertyFilter}
                onValueChange={handleFilterChange}
              >
                <DropdownMenuRadioItem value="all">
                  All Properties
                </DropdownMenuRadioItem>
                {properties.map((property) => (
                  <DropdownMenuRadioItem
                    key={property.id}
                    value={property.name}
                  >
                    {property.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                    <SelectContent>
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
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
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
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {propertyFilter === "all"
              ? "All Properties"
              : `Expenses for ${propertyFilter}`}
          </CardTitle>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
