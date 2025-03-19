
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    'foiling': 'Foiling Cards',
    'quick': 'Quick Cards',
    'electroplating': 'Electroplating Cards',
    'spot-uv': 'Spot UV Cards'
  };
  
  return categories[category] || category;
}

export const products = [
  {
    id: '1',
    name: 'Classic Foil Business Card',
    description: 'Elegant business card with gold foil accents on premium paper stock. These cards make a statement with their subtle shimmer and luxurious feel. Perfect for executives, consultants, and professionals in creative industries. Each card is carefully crafted with precision and attention to detail.',
    price: 499,
    category: 'foiling'
  },
  {
    id: '2',
    name: 'Quick Matte Business Card',
    description: 'Professional matte-finished cards delivered in 2-3 business days. These no-nonsense cards provide a clean, sophisticated look with their smooth matte finish. Ideal for business professionals who need quality cards quickly.',
    price: 299,
    category: 'quick'
  },
  {
    id: '3',
    name: 'Silver Electroplated Edge Card',
    description: 'Luxury cards with silver electroplated edges for a sophisticated look. The metallic shine around the edges creates a striking visual effect that catches light from every angle. These premium cards are perfect for making a memorable first impression.',
    price: 599,
    category: 'electroplating'
  },
  {
    id: '4',
    name: 'Spot UV Gloss Highlight Card',
    description: 'Premium cards with strategic glossy UV highlights over a matte base. This contrast between matte and gloss creates a tactile experience that recipients won\'t forget. The selective glossy elements can emphasize logos, text, or design elements.',
    price: 399,
    category: 'spot-uv'
  },
];
