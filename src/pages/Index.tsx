
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-32 px-4">
          <div className="container mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="h1 max-w-4xl mx-auto">
              Premium Business Cards for Modern Professionals
            </h1>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Elevate your brand with our luxury business cards. Choose from premium materials, 
              finishes, and treatments that make a lasting impression.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full">
                Browse Designs
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="h2 text-center mb-12">Our Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={category.name}
                  className="group relative overflow-hidden rounded-2xl aspect-square glass dark:glass-dark hover:scale-[1.02] transition-transform duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-white font-playfair text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

const categories = [
  {
    name: "Foiling Cards",
    description: "Elegant metallic accents for a premium finish",
  },
  {
    name: "Quick Cards",
    description: "Professional designs ready for quick delivery",
  },
  {
    name: "Electroplating Cards",
    description: "Luxurious metallic finish that stands out",
  },
  {
    name: "Spot UV Cards",
    description: "Glossy highlights for subtle sophistication",
  },
];

export default Index;
