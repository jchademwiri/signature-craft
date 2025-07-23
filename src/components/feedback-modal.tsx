import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

type FeedbackType = 'success' | 'error' | 'info';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: FeedbackType;
  showContactForm?: boolean;
  onSubmitFeedback?: (email: string, message: string) => void;
}

export function FeedbackModal({
  open,
  onOpenChange,
  title,
  description,
  type = 'info',
  showContactForm = false,
  onSubmitFeedback,
}: FeedbackModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !message) return;

    setIsSubmitting(true);
    try {
      if (onSubmitFeedback) {
        await onSubmitFeedback(email, message);
      }
      // Reset form
      setEmail('');
      setMessage('');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-12 w-12 text-blue-500" />;
    }
  };

  const getHeaderClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className={`-m-6 mb-6 p-6 flex items-center gap-4 ${getHeaderClass()}`}>
          {getIcon()}
          <DialogHeader className="flex-1">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        </div>

        {showContactForm && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us what you think..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {showContactForm && (
            <Button onClick={handleSubmit} disabled={isSubmitting || !email || !message}>
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
