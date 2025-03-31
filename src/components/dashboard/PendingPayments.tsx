
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample data - in a real app, this would come from your database
const pendingPayments = [
  {
    id: "1",
    guest: "John Smith",
    property: "Beach House",
    amount: 850.00,
    dueDate: "2023-05-15",
    bookingDate: "2023-05-20",
    status: "pending",
  },
  {
    id: "2",
    guest: "Jane Doe",
    property: "City Apartment",
    amount: 600.00,
    dueDate: "2023-05-20",
    bookingDate: "2023-05-25",
    status: "pending",
  },
  {
    id: "3",
    guest: "Bob Johnson",
    property: "Mountain Cabin",
    amount: 1200.00,
    dueDate: "2023-05-12",
    bookingDate: "2023-05-18",
    status: "pending",
  },
];

export function PendingPayments() {
  const { toast } = useToast();

  const handleMarkAsPaid = (id: string) => {
    toast({
      title: "Payment marked as paid",
      description: `Payment ID: ${id} has been marked as paid`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.guest}</TableCell>
                <TableCell>{payment.property}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>{payment.bookingDate}</TableCell>
                <TableCell className="text-right">
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkAsPaid(payment.id)}
                  >
                    Mark as Paid
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
