
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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Phone } from "lucide-react";
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

// Sample data - in a real app, this would come from your database
const initialPayments = [
  {
    id: "1",
    guest: "John Smith",
    property: "Beach House",
    amount: 850.00,
    dueDate: "2023-05-15",
    status: "pending",
    contactInfo: "+1 (555) 123-4567",
  },
  {
    id: "2",
    guest: "Jane Doe",
    property: "City Apartment",
    amount: 600.00,
    dueDate: "2023-05-20",
    status: "pending",
    contactInfo: "+1 (555) 987-6543",
  },
  {
    id: "3",
    guest: "Bob Johnson",
    property: "Mountain Cabin",
    amount: 1200.00,
    dueDate: "2023-05-12",
    status: "pending",
    contactInfo: "+1 (555) 456-7890",
  },
];

// Sample properties for the dropdown
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

const PendingPayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    guest: "",
    property: "",
    amount: "",
    dueDate: "",
    contactInfo: "",
  });
  const { toast } = useToast();

  const handleMarkAsPaid = (id: string) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: "paid" } : payment
      )
    );
    toast({
      title: "Payment marked as paid",
      description: `Payment ID: ${id} has been marked as paid`,
    });
  };

  const handleAddPayment = () => {
    if (
      !newPayment.guest ||
      !newPayment.property ||
      !newPayment.amount ||
      !newPayment.dueDate ||
      !newPayment.contactInfo
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const payment = {
      id: (payments.length + 1).toString(),
      guest: newPayment.guest,
      property: newPayment.property,
      amount: parseFloat(newPayment.amount),
      dueDate: newPayment.dueDate,
      status: "pending",
      contactInfo: newPayment.contactInfo,
    };

    setPayments([...payments, payment]);
    setNewPayment({
      guest: "",
      property: "",
      amount: "",
      dueDate: "",
      contactInfo: "",
    });
    setOpen(false);

    toast({
      title: "Payment added",
      description: `A new pending payment for ${payment.guest} has been added`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pending Payments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Pending Payment</DialogTitle>
              <DialogDescription>
                Record a new pending payment from a telephone booking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="guest">Guest Name</Label>
                <Input
                  id="guest"
                  value={newPayment.guest}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, guest: e.target.value })
                  }
                  placeholder="John Smith"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property">Property</Label>
                <Select
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, property: value })
                  }
                  value={newPayment.property}
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
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newPayment.dueDate}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  value={newPayment.contactInfo}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      contactInfo: e.target.value,
                    })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPayment}>Add Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Telephone Bookings - Pending Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.guest}</TableCell>
                  <TableCell>{payment.property}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      {payment.contactInfo}
                    </div>
                  </TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell className="text-right">
                    ${payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        payment.status === "pending"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.status === "pending" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsPaid(payment.id)}
                      >
                        Mark as Paid
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Paid
                      </Button>
                    )}
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

export default PendingPayments;
