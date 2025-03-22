
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PaperType, TreatmentOption, ElectroplatingOption } from '@/contexts/CartContext';
import { Check, SendIcon, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  message: z.string().optional(),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductQuoteDetails {
  productName: string;
  selectedQuantity: string;
  selectedSize: string;
  selectedGSM: string;
  selectedPaperType: PaperType;
  selectedFoilpress: TreatmentOption;
  selectedEmbossing: TreatmentOption;
  selectedEdgepaint: TreatmentOption;
  selectedElectroplatingFront: ElectroplatingOption;
  selectedElectroplatingBack: ElectroplatingOption;
  hasDesign: boolean;
  designType: 'upload' | 'expert';
  totalPrice: number;
}

interface RequestQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productDetails: ProductQuoteDetails;
}

export const RequestQuoteDialog: React.FC<RequestQuoteDialogProps> = ({
  open, 
  onOpenChange,
  productDetails
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      company: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Quote Request Data:', {
        ...data,
        productDetails
      });
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        onOpenChange(false);
        
        toast({
          title: "Quote request sent!",
          description: "We'll get back to you within 24 hours.",
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Something went wrong",
        description: "Your quote request couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatINR = (value: number) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  // Render success state
  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-center">Quote Request Sent!</h2>
            <p className="text-center text-muted-foreground mt-2">
              We'll get back to you within 24 hours with a custom quote.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Request Custom Quote
          </DialogTitle>
          <DialogDescription>
            Fill in your details and we'll send you a personalized quote for your custom business cards.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Summary Section */}
          <div className="bg-gray-50 dark:bg-navy-light p-4 rounded-md space-y-2 text-sm">
            <h4 className="font-medium text-base">Product Summary</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-muted-foreground">Product:</span>
              <span>{productDetails.productName}</span>
              
              <span className="text-muted-foreground">Quantity:</span>
              <span>{productDetails.selectedQuantity} cards</span>
              
              <span className="text-muted-foreground">Size:</span>
              <span>{productDetails.selectedSize}</span>
              
              <span className="text-muted-foreground">Paper:</span>
              <span>{productDetails.selectedGSM} GSM {productDetails.selectedPaperType}</span>
              
              {productDetails.selectedFoilpress !== 'none' && (
                <>
                  <span className="text-muted-foreground">Foilpress:</span>
                  <span>{productDetails.selectedFoilpress}</span>
                </>
              )}
              
              {productDetails.selectedEmbossing !== 'none' && (
                <>
                  <span className="text-muted-foreground">Embossing:</span>
                  <span>{productDetails.selectedEmbossing}</span>
                </>
              )}
              
              {productDetails.selectedEdgepaint !== 'none' && (
                <>
                  <span className="text-muted-foreground">Edgepaint:</span>
                  <span>Yes</span>
                </>
              )}
              
              {productDetails.selectedElectroplatingFront !== 'none' && (
                <>
                  <span className="text-muted-foreground">Electroplating Front:</span>
                  <span>{productDetails.selectedElectroplatingFront}</span>
                </>
              )}
              
              {productDetails.selectedElectroplatingBack !== 'none' && (
                <>
                  <span className="text-muted-foreground">Electroplating Back:</span>
                  <span>{productDetails.selectedElectroplatingBack}</span>
                </>
              )}
              
              <span className="text-muted-foreground">Design Service:</span>
              <span>{productDetails.hasDesign ? (productDetails.designType === 'expert' ? 'Yes' : 'Self-provided') : 'No'}</span>
              
              <span className="text-muted-foreground font-medium">Estimated Price:</span>
              <span className="font-medium">{formatINR(productDetails.totalPrice)}</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any special requirements or questions" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <SendIcon className="h-4 w-4" /> Request Quote
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
