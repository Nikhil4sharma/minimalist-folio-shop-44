
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-navy text-navy dark:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="h1 max-w-5xl mx-auto">
            Premium Business Cards<br />
            for Professional Impact
          </h1>
          <p className="body-text max-w-2xl mx-auto">
            Make a lasting impression with our premium quality business cards.
            Professional designs that reflect your brand's excellence.
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <Link to="/products">
              <Button size="lg" className="rounded-full bg-cyan hover:bg-cyan-light group">
                Order Your Business Cards Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-navy-light">
        <div className="container mx-auto">
          <h2 className="h2 text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                to={`/products/${category.slug}`}
                key={category.name}
                className="group relative overflow-hidden rounded-xl aspect-square bg-white dark:glass-dark shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white font-poppins text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-navy">
        <div className="container mx-auto">
          <h2 className="h2 text-center mb-12">Why Choose Our Business Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-white dark:bg-navy-light p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan/20 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-cyan" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-navy-light">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="h2">Ready to Make an Impression?</h2>
            <p className="body-text">
              Order your premium business cards today and elevate your professional image.
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-full bg-cyan hover:bg-cyan-light mt-4">
                Browse Our Designs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const categories = [
  {
    name: "Foiling Cards",
    description: "Elegant metallic accents for a premium finish",
    slug: "foiling-cards"
  },
  {
    name: "Quick Cards",
    description: "Professional designs ready for quick delivery",
    slug: "quick-cards"
  },
  {
    name: "Electroplating Cards",
    description: "Luxurious metallic finish that stands out",
    slug: "electroplating-cards"
  },
  {
    name: "Spot UV Cards",
    description: "Glossy highlights for subtle sophistication",
    slug: "spot-uv-cards"
  },
];

const features = [
  {
    title: "Premium Materials",
    description: "We use only the highest quality materials for all our business cards, ensuring durability and a luxury feel.",
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    ),
  },
  {
    title: "Custom Designs",
    description: "Work with our expert designers to create a business card that perfectly represents your brand and vision.",
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
    ),
  },
  {
    title: "Fast Delivery",
    description: "Enjoy quick turnaround times without compromising on quality. Most orders ship within 2-3 business days.",
    icon: (props: any) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
  },
];

export default Index;
