
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";
import { ExpenseTable } from "@/components/expense/ExpenseTable";
import { ExpenseForm } from "@/components/expense/ExpenseForm";
import { PropertyFilter } from "@/components/expense/PropertyFilter";

// Data types
type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  property: string;
};

// Sample data
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

const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

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
  const { propertyId } = useParams();
  const { selectedProperty, hasSelectedProperty, setSelectedProperty } = useProperty();
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
  const navigate = useNavigate();
  
  // Handle propertyId from URL
  useEffect(() => {
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property.name, propertyId);
        setPropertyFilter(property.name);
      }
    }
  }, [propertyId, setSelectedProperty]);

  // Update filtered expenses when selection changes
  useEffect(() => {
    if (selectedProperty !== "all") {
      setFilteredExpenses(expenses.filter((expense) => expense.property === selectedProperty));
    } else if (propertyFilter !== "all") {
      setFilteredExpenses(expenses.filter((expense) => expense.property === propertyFilter));
    } else {
      setFilteredExpenses(expenses);
    }
  }, [selectedProperty, expenses, propertyFilter]);

  // Redirect if no property selected
  useEffect(() => {
    if (!hasSelectedProperty && !propertyId) {
      navigate("/properties");
    }
  }, [hasSelectedProperty, propertyId, navigate]);

  if (!hasSelectedProperty && !propertyId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
        <h2 className="text-2xl font-semibold mb-2">Please Select a Property</h2>
        <p className="text-muted-foreground mb-4">
          You need to select a property to view expenses.
        </p>
        <Button onClick={() => navigate("/properties")}>
          Go to Properties
        </Button>
      </div>
    );
  }

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
    
    // Update filtered expenses based on current filters
    if (selectedProperty !== "all") {
      if (expense.property === selectedProperty) {
        setFilteredExpenses([...filteredExpenses, expense]);
      }
    } else if (propertyFilter !== "all") {
      if (expense.property === propertyFilter) {
        setFilteredExpenses([...filteredExpenses, expense]);
      }
    } else {
      setFilteredExpenses(updatedExpenses);
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
      if (selectedProperty !== "all") {
        setFilteredExpenses(expenses.filter(expense => expense.property === selectedProperty));
      } else {
        setFilteredExpenses(expenses);
      }
    } else {
      setFilteredExpenses(expenses.filter((expense) => expense.property === value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex space-x-2">
          {selectedProperty === "all" && (
            <PropertyFilter 
              propertyFilter={propertyFilter}
              handleFilterChange={handleFilterChange}
              properties={properties}
            />
          )}

          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      <ExpenseTable 
        filteredExpenses={filteredExpenses}
        selectedProperty={selectedProperty}
        propertyFilter={propertyFilter}
      />

      <ExpenseForm
        open={open}
        setOpen={setOpen}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        handleAddExpense={handleAddExpense}
        selectedProperty={selectedProperty}
        properties={properties}
        categories={categories}
      />
    </div>
  );
};

export default Expenses;
