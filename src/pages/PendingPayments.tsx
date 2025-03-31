import { useState, useEffect } from "react";
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
import { PlusCircle, Phone, Mail } from "lucide-react";
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
import { EmailNotification } from "@/components/notifications/EmailNotification";
import { useProperty } from "@/contexts/PropertyContext";

const initialPayments = [
  {
    id: "1",
    guest: "John Smith",
    property: "Beach House",
    amount: 850.00,
    dueDate: "2023-05-15",
    bookingDate: "2023-05-20",
    status: "pending",
    contactInfo: "+1 (555) 123-4567",
    email: "john.smith@example.com",
  },
  {
    id: "2",
    guest: "Jane Doe",
    property: "City Apartment",
    amount: 600.00,
    dueDate: "2023-05-20",
    bookingDate: "2023-05-25",
    status: "pending",
    contactInfo: "+1 (555) 987-6543",
    email: "jane.doe@example.com",
  },
  {
    id: "3",
    guest: "Bob Johnson",
    property: "Mountain Cabin",
    amount: 1200.00,
    dueDate: "2023-05-12",
    bookingDate: "2023-05-18",
    status: "pending",
    contactInfo: "+1 (555) 456-7890",
    email: "bob.johnson@example.com",
  },
];

const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

const PendingPayments = () => {
  const { selectedProperty } = useProperty();
  const [payments, setPayments] = useState(initialPayments);
  const [filteredPayments, setFilteredPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<typeof initialPayments[0] | null>(null);
  const [newPayment, setNewPayment] = useState({
    guest: "",
    property: "",
    amount: "",
    dueDate: "",
    bookingDate: "",
    contactInfo: "",
    email: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (selectedProperty === "all") {
      setFilteredPayments(payments);
    } else {
      setFilteredPayments(payments.filter((payment) => payment.property === selectedProperty));
    }
  }, [selectedProperty, payments]);

  const handleMarkAsPaid = (id: string) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === id ? { ...payment, status: "paid" } : payment
    );
    setPayments(updatedPayments);
    
    if (selectedProperty === "all") {
      setFilteredPayments(updatedPayments);
    } else {
      setFilteredPayments(updatedPayments.filter((payment) => payment.property === selectedProperty));
    }
    
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
      !newPayment.bookingDate ||
      !newPayment.contactInfo ||
      !newPayment.email
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
      bookingDate: newPayment.bookingDate,
      status: "pending",
      contactInfo: newPayment.contactInfo,
      email: newPayment.email,
    };

    const updatedPayments = [...payments, payment];
    setPayments(updatedPayments);
    
    if (selectedProperty === "all") {
      setFilteredPayments(updatedPayments);
    } else {
      setFilteredPayments(updatedPayments.filter((payment) => payment.property === selectedProperty));
    }
    
    setNewPayment({
      guest: "",
      property: "",
      amount: "",
      dueDate: "",
      bookingDate: "",
      contactInfo: "",
      email: "",
    });
    setOpen(false);

    toast({
      title: "Payment added",
      description: `A new pending payment for ${payment.guest} has been added`,
    });
  };

  const handleSendNotification = (payment: typeof initialPayments[0]) => {
    setSelectedPayment(payment);
    setEmailDialogOpen(true);
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
                  defaultValue={selectedProperty !== "all" ? selectedProperty : undefined}
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
                <Label htmlFor="bookingDate">Booking Date</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={newPayment.bookingDate}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, bookingDate: e.target.value })
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
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPayment.email}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      email: e.target.value,
                    })
                  }
                  placeholder="guest@example.com"
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
          <CardTitle>
            {selectedProperty !== "all"
              ? `Telephone Bookings - Pending Payments for ${selectedProperty}`
              : "Telephone Bookings - Pending Payments"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
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
                  <TableCell>{payment.bookingDate}</TableCell>
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
                    <div className="flex justify-end gap-2">
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendNotification(payment)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No pending payments found for this property
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EmailNotification 
        open={emailDialogOpen} 
        onOpenChange={setEmailDialogOpen}
        payment={selectedPayment}
      />
    </div>
  );
};

export default PendingPayments;
