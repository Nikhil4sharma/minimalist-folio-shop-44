
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: any;
  status: string;
  total: number;
  items: number;
}

interface ProfileOrdersCardProps {
  orders: Order[];
  isLoading: boolean;
}

export const ProfileOrdersCard: React.FC<ProfileOrdersCardProps> = ({ orders, isLoading }) => {
  const { theme } = useTheme();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <p>Loading orders...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
              <ShoppingBag className="h-6 w-6 text-cyan" />
            </div>
            <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              You haven't placed any orders yet.
            </p>
            <Link to="/products">
              <Button 
                className="rounded-full bg-cyan hover:bg-cyan-light"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id}
                className={`p-4 rounded-lg border ${
                  theme === 'light' 
                    ? 'border-gray-200 bg-gray-50' 
                    : 'border-gray-700 bg-navy-light'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-cyan" />
                    <div>
                      <p className="font-medium">Order #{order.id.slice(-6)}</p>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {new Date(order.date?.seconds * 1000).toLocaleDateString()} • 
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                      <p className={`text-sm ${
                        order.status === 'completed' 
                          ? 'text-green-500' 
                          : order.status === 'cancelled' 
                            ? 'text-red-500' 
                            : 'text-yellow-500'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
