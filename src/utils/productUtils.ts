
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    'foiling': 'Foiling Cards',
    'quick': 'Quick Cards',
    'electroplating': 'Electroplating Cards',
    'spot-uv': 'Spot UV Cards',
    'letterpress': 'Letterpress Cards',
    'embossing': 'Embossed Cards',
    'metal': 'Metal Cards',
    'acrylic': 'Acrylic Cards',
    'black-premium': 'Black Premium Cards'
  };
  
  return categories[category] || category;
}

export const products = [
  {
    id: '1',
    name: 'Classic Foil Business Card',
    description: 'Elegant business card with gold foil accents on premium 600gsm Keycolor paper. Perfect for executives, consultants, and creative professionals who want to make a luxurious first impression. Available in single or both side foiling.',
    price: 7575,
    perItemPrice: 30.30,
    category: 'foiling',
    image: '/lovable-uploads/3cadd5c6-e4db-4b92-bd06-b4f6f805ad00.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Keycolor',
      printingSides: 'Single or Both Sides',
      finishTime: '5-7 business days',
      sizes: 'Standard, US, Square'
    },
    pricing: {
      '250': { total: 7575, perItem: 30.30 },
      '500': { total: 10900, perItem: 21.80 },
      '750': { total: 14100, perItem: 18.80 },
      '1000': { total: 16800, perItem: 16.80 }
    }
  },
  {
    id: '2',
    name: 'Quick Matte Business Card',
    description: 'Professional matte-finished cards delivered in 2-3 business days. These no-nonsense cards provide a clean, sophisticated look with their smooth matte finish. Ideal for business professionals who need quality cards quickly.',
    price: 2273,
    perItemPrice: 22.73,
    category: 'quick',
    image: '/lovable-uploads/371c2ba1-5c26-4d03-84b7-60fffe524706.png',
    details: {
      paperWeight: '350gsm',
      paperType: 'Matt',
      printingSides: 'Both Sides',
      finishTime: '2-3 business days',
      sizes: 'Standard, US'
    },
    pricing: {
      '100': { total: 2273, perItem: 22.73 },
      '250': { total: 3402, perItem: 13.61 },
      '500': { total: 5645, perItem: 11.29 },
      '1000': { total: 10530, perItem: 10.53 }
    }
  },
  {
    id: '3',
    name: 'Silver Electroplated Edge Card',
    description: 'Luxury cards with silver electroplating for a sophisticated look. Available for front and back sides or edges, with up to 2 square inches of plating on premium 600gsm Mohawk Classic paper. These premium cards make a memorable impression.',
    price: 13350,
    perItemPrice: 53.40,
    category: 'electroplating',
    image: '/lovable-uploads/14bb7b5a-73d5-441a-bf16-835ecb7ba352.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Mohawk Classic',
      printingSides: 'Single or Both Sides',
      finishTime: '7-10 business days',
      sizes: 'Standard, US, Square'
    },
    pricing: {
      '250': { total: 13350, perItem: 53.40 },
      '500': { total: 25540, perItem: 51.08 },
      '750': { total: 37470, perItem: 49.96 },
      '1000': { total: 47220, perItem: 47.22 }
    }
  },
  {
    id: '4',
    name: 'Spot UV Gloss Highlight Card',
    description: 'Premium cards with strategic glossy UV highlights over a matte base. This contrast between matte and gloss creates a tactile experience that recipients won\'t forget. Printed on 600gsm Soft Suede paper with velvet lamination for an ultra-premium feel.',
    price: 2273,
    perItemPrice: 22.73,
    category: 'spot-uv',
    image: '/lovable-uploads/662beb9b-db1d-4b57-9250-6acf181e62e1.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Soft Suede',
      printingSides: 'Single or Both Sides',
      finishTime: '7-10 business days',
      sizes: 'Standard, US, Square'
    },
    pricing: {
      '100': { total: 2273, perItem: 22.73 },
      '250': { total: 3402, perItem: 13.61 },
      '500': { total: 5645, perItem: 11.29 },
      '1000': { total: 10530, perItem: 10.53 }
    }
  },
  {
    id: '5',
    name: 'Copper Foil Business Card',
    description: 'Stunning business cards with copper foil highlights on premium paper stock. The warm copper tones create a distinctive and memorable impression, perfect for luxury brands and creative professionals seeking a unique business card.',
    price: 7575,
    perItemPrice: 30.30,
    category: 'foiling',
    image: '/lovable-uploads/cb7d3c66-9835-4ba3-b444-1d8ae197b49b.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Keycolor',
      printingSides: 'Single or Both Sides',
      finishTime: '5-7 business days',
      sizes: 'Standard, US, Square'
    },
    pricing: {
      '250': { total: 7575, perItem: 30.30 },
      '500': { total: 10900, perItem: 21.80 },
      '750': { total: 14100, perItem: 18.80 },
      '1000': { total: 16800, perItem: 16.80 }
    }
  },
  {
    id: '6',
    name: 'Letterpress Business Card',
    description: 'Classic letterpress cards with a deep, tactile impression on 600gsm cotton paper. These cards feature the traditional craft of letterpress printing, creating a dimensional, handcrafted feel that stands out in today\'s digital world.',
    price: 7575,
    perItemPrice: 30.30,
    category: 'letterpress',
    image: '/lovable-uploads/31b9eddf-41e9-4663-bd00-916035d42987.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Cotton',
      printingSides: 'Single or Both Sides',
      finishTime: '7-10 business days',
      sizes: 'Standard, US'
    },
    pricing: {
      '250': { total: 7575, perItem: 30.30 },
      '500': { total: 10900, perItem: 21.80 },
      '750': { total: 14100, perItem: 18.80 },
      '1000': { total: 16800, perItem: 16.80 }
    }
  },
  {
    id: '7',
    name: 'Embossed Business Card',
    description: 'Premium embossed cards that create a raised 3D effect for logos and design elements. Paired with foiling on 600gsm KeyColour paper for a luxurious look and feel that adds dimension and tactile interest.',
    price: 9550,
    perItemPrice: 38.20,
    category: 'embossing',
    image: '/lovable-uploads/4c5311e4-7b12-4bcd-9ec9-957b7d3c8bcb.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'KeyColour',
      printingSides: 'Single or Both Sides',
      finishTime: '7-10 business days',
      sizes: 'Standard, US'
    },
    pricing: {
      '250': { total: 9550, perItem: 38.20 },
      '500': { total: 13100, perItem: 26.20 },
      '750': { total: 16650, perItem: 22.20 },
      '1000': { total: 19200, perItem: 19.20 }
    }
  },
  {
    id: '8',
    name: 'Black Premium Business Card',
    description: 'Sophisticated black business cards with gold foiling on 600gsm Black Truffle paper. These premium dark cards make a bold statement and are perfect for luxury brands, executives, and creative professionals.',
    price: 8850,
    perItemPrice: 35.40,
    category: 'black-premium',
    image: '/lovable-uploads/bf98fe28-9c0b-4f7b-b4d2-03946c5d3ba2.png',
    details: {
      paperWeight: '600gsm',
      paperType: 'Black Truffle',
      printingSides: 'Single or Both Sides',
      finishTime: '7-10 business days',
      sizes: 'Standard, US'
    },
    pricing: {
      '250': { total: 8850, perItem: 35.40 },
      '500': { total: 13600, perItem: 27.20 },
      '750': { total: 13342.50, perItem: 17.79 },
      '1000': { total: 16500, perItem: 16.50 }
    }
  },
  {
    id: '9',
    name: 'Metal Business Card',
    description: 'Ultra-premium metal business cards with UV/screen printing and laser etching or cutting. Made from 1.5mm metal, these incredibly durable and luxurious cards are ideal for making an unforgettable impression.',
    price: 30000,
    perItemPrice: 300.00,
    category: 'metal',
    image: '/lovable-uploads/fae7acb8-ae03-458c-9ea6-91101b9a054f.png',
    details: {
      thickness: '1.5mm',
      material: 'Metal',
      printingMethods: 'UV/Screen Printing, Etching, Laser Cutting',
      finishTime: '10-14 business days',
      sizes: 'Standard only'
    },
    pricing: {
      '100': { total: 30000, perItem: 300.00 },
      '250': { total: 62500, perItem: 250.00 },
      '500': { total: 110000, perItem: 220.00 },
      '1000': { total: 195000, perItem: 195.00 }
    }
  },
  {
    id: '10',
    name: 'Acrylic Business Card',
    description: 'Modern and distinctive acrylic business cards with UV/screen printing on 1.5mm frosted acrylic. These transparent cards create a contemporary impression and stand out from traditional paper cards.',
    price: 8760,
    perItemPrice: 87.60,
    category: 'acrylic',
    image: '/lovable-uploads/d3676c1a-b34b-4aa8-899b-5bd51f2058a1.png',
    details: {
      thickness: '1.5mm',
      material: 'Frosted Acrylic',
      printingMethods: 'UV/Screen Printing',
      finishTime: '7-10 business days',
      sizes: 'Standard only'
    },
    pricing: {
      '100': { total: 8760, perItem: 87.60 },
      '250': { total: 19250, perItem: 77.00 },
      '500': { total: 35820, perItem: 71.64 },
      '1000': { total: 67500, perItem: 67.50 }
    }
  }
];
