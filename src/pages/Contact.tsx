
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="h1 text-navy dark:text-white">Contact Us</h1>
            <p className="body-text text-gray-500 dark:text-gray-300 max-w-3xl mx-auto mt-4">
              Have questions about our products or services? Need a custom quote? 
              Our team is here to help you create the perfect business cards for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-cyan" />
                </div>
                <h3 className="font-semibold text-navy dark:text-white text-lg mb-2">Our Office</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  123 Business Park, Sector 5<br />
                  Navi Mumbai, Maharashtra 400614<br />
                  India
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-cyan" />
                </div>
                <h3 className="font-semibold text-navy dark:text-white text-lg mb-2">Phone & Email</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-1">
                  +91 1234 567 890
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  info@cardcraft.in
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-cyan" />
                </div>
                <h3 className="font-semibold text-navy dark:text-white text-lg mb-2">Working Hours</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday: 10AM - 4PM<br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-navy dark:text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Send us a message and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy dark:text-white">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy dark:text-white">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-navy dark:text-white">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-navy dark:text-white">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy dark:text-white">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..." 
                      className="min-h-[120px] border-gray-300 dark:border-gray-700 dark:bg-navy-dark" 
                      required 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-gray-500 dark:text-gray-400 text-sm">
                      I agree to the processing of my personal data according to the privacy policy
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-cyan hover:bg-cyan-light">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Request Quote Form */}
            <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-navy dark:text-white">Request a Custom Quote</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Need a specialized business card solution? Let us know your requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-navy dark:text-white">Company Name</Label>
                      <Input id="company" placeholder="Your Company" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-navy dark:text-white">Contact Person</Label>
                      <Input id="contact-name" placeholder="Your Name" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-navy dark:text-white">Email</Label>
                      <Input id="contact-email" type="email" placeholder="contact@company.com" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-navy dark:text-white">Phone</Label>
                      <Input id="contact-phone" placeholder="+91 98765 43210" className="border-gray-300 dark:border-gray-700 dark:bg-navy-dark" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-navy dark:text-white">Quantity Needed</Label>
                    <RadioGroup defaultValue="100-500" className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="100-500" id="qty-100-500" />
                        <Label htmlFor="qty-100-500" className="text-gray-600 dark:text-gray-300">100-500</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="500-1000" id="qty-500-1000" />
                        <Label htmlFor="qty-500-1000" className="text-gray-600 dark:text-gray-300">500-1000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1000-5000" id="qty-1000-5000" />
                        <Label htmlFor="qty-1000-5000" className="text-gray-600 dark:text-gray-300">1000-5000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5000+" id="qty-5000+" />
                        <Label htmlFor="qty-5000+" className="text-gray-600 dark:text-gray-300">5000+</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-navy dark:text-white">Card Specifications</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-foil" />
                          <Label htmlFor="spec-foil" className="text-gray-600 dark:text-gray-300">Foil Stamping</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-emboss" />
                          <Label htmlFor="spec-emboss" className="text-gray-600 dark:text-gray-300">Embossing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-spot-uv" />
                          <Label htmlFor="spec-spot-uv" className="text-gray-600 dark:text-gray-300">Spot UV</Label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-edge" />
                          <Label htmlFor="spec-edge" className="text-gray-600 dark:text-gray-300">Edge Painting</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-electro" />
                          <Label htmlFor="spec-electro" className="text-gray-600 dark:text-gray-300">Electroplating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="spec-custom" />
                          <Label htmlFor="spec-custom" className="text-gray-600 dark:text-gray-300">Custom Shape</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-navy dark:text-white">Special Requirements</Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="Describe any special requirements or design ideas..." 
                      className="min-h-[100px] border-gray-300 dark:border-gray-700 dark:bg-navy-dark" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="text-navy dark:text-white">Timeline</Label>
                    <RadioGroup defaultValue="standard" className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="timeline-standard" />
                        <Label htmlFor="timeline-standard" className="text-gray-600 dark:text-gray-300">Standard (18 days)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="timeline-express" />
                        <Label htmlFor="timeline-express" className="text-gray-600 dark:text-gray-300">Express (10 days)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rush" id="timeline-rush" />
                        <Label htmlFor="timeline-rush" className="text-gray-600 dark:text-gray-300">Rush (5 days)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button type="submit" className="w-full bg-cyan hover:bg-cyan-light">
                    Request Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Map */}
          <div className="mt-12 rounded-lg overflow-hidden h-80 bg-gray-200 dark:bg-navy-light">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <p>Google Maps Integration</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
