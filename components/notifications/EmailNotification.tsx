"use client"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Payment {
  id: string;
  guest: string;
  property: string;
  amount: number;
  dueDate: string;
  bookingDate: string;
  status: string;
  contactInfo: string;
  email: string;
}

interface EmailNotificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

export function EmailNotification({ open, onOpenChange, payment }: EmailNotificationProps) {
  const { toast } = useToast();
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate default email subject and content when payment changes
  useState(() => {
    if (payment) {
      setEmailSubject(`Upcoming booking reminder for ${payment.property}`);
      setEmailContent(
        `Dear ${payment.guest},\n\nThis is a friendly reminder about your upcoming booking at ${payment.property} on ${payment.bookingDate}.\n\nPlease ensure your payment of $${payment.amount.toFixed(2)} is completed before your arrival.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nAirbnb Property Management`
      );
    }
  });

  const handleSendEmail = async () => {
    if (!payment) return;

    setIsLoading(true);
    
    // In a real application, this would be integrated with an email service API
    // For now, we'll simulate sending an email with a timeout
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Email notification sent",
        description: `Booking reminder email sent to ${payment.guest} at ${payment.email}`,
      });
    }, 1500);
  };

  // If no payment is selected, don't render the dialog
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Booking Reminder</DialogTitle>
          <DialogDescription>
            Send an email notification to remind the guest about their upcoming booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              value={payment.email}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={10}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
