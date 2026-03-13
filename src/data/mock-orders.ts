/**
 * Order History System — User Transaction Tracking
 * File: src/data/mock-orders.ts
 * Created: 2026-03-13 @ 5:15 PM
 */

export interface Order {
  id: string;
  skinId: string;
  skinName: string;
  sellerName: string;
  buyerName: string;
  price: number;        // Final paid price (CNY)
  platformFee: number;   // 1% fee  
  insuranceFee: number;  // ¥0.50 per order
  totalAmount: number;   // Price + fees
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  createdAt: string;    // ISO timestamp
  completedAt?: string; // If applicable
  
  // Optional metadata
  skinImageUrl?: string;
  game?: 'cs2' | 'dota2' | 'tf2';
}

// Mock order data for demonstration (recent 10 transactions)
export const mockOrders: Order[] = [
  {
    id: 'tx_f89a1b2c',
    skinId: 'CS2_AK47_001',
    skinName: 'AK-47 | 火神 (Factory New)',
    sellerName: 'BuffTrader880',
    buyerName: 'CSCollector',
    price: 86.40,
    platformFee: 0.86,
    insuranceFee: 0.50,
    totalAmount: 87.76,
    status: 'completed',
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    completedAt: new Date(Date.now() - 9000000).toISOString(), // 2.5h ago
    game: 'cs2',
    skinImageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3n2NOFUFwKKhZks933JgJ01vTbdDkX79mJq4yCkqP2YuqFwD4D65Qo2r2Z8N2mjQbsqEc4MWHxI46QcVc2Y1rW-FDrw-_ng5Pu75iY1zI97bhJsvQv/360fx360f'
  },
  {
    id: 'tx_e3b4c5d6',
    skinId: 'CS2_M4A4_003',
    skinName: 'M4A4 | 死神 (Minimal Wear)',
    sellerName: 'SkinsMaster777',
    buyerName: 'CSCollector',
    price: 156.80,
    platformFee: 1.57,
    insuranceFee: 0.50,
    totalAmount: 158.87,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    game: 'cs2'
  },
  {
    id: 'tx_d4e5f6a7',
    skinId: 'CS2_AWP_002',  
    skinName: 'AWP | 野马 (Field-Tested)',
    sellerName: 'DotaKing999',
    buyerName: 'BuffUser234',
    price: 32.50,
    platformFee: 0.33,
    insuranceFee: 0.50,
    totalAmount: 33.33,
    status: 'completed',
    completedAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
    game: 'cs2'
  },
  {
    id: 'tx_a1b2c3d4',
    skinId: 'CS2_KNIFE_005',
    skinName: '★ 蝴蝶刀 | 多普勒 (Factory New)',
    sellerName: 'KnifeExpert666',  
    buyerName: 'CSCollector',
    price: 3899.00,
    platformFee: 38.99,
    insuranceFee: 0.50,
    totalAmount: 3938.49,
    status: 'completed',
    completedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    game: 'cs2'
  },
  {
    id: 'tx_f7g8h9i0',
    skinId: 'CS2_GLOVE_004',  
    skinName: '手套 | 帝国 (Well Worn)',
    sellerName: 'GloveCollector123',
    buyerName: 'BuffTrader880',
    price: 567.30,
    platformFee: 5.67,
    insuranceFee: 0.50,
    totalAmount: 573.47,  
    status: 'refunded',
    completedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    game: 'cs2'
  }
];

/**
 * Helper: Filter orders by user and status
 */
export const getOrdersByUser = (username: string, statusFilter?: Order['status']): Order[] => {
  return mockOrders.filter(order => {
    if (statusFilter) {
      return order.buyerName === username && order.status === statusFilter;
    }
    return order.buyerName === username;
  });
};

/**
 * Helper: Calculate user spending summary  
 */
export const getOrderSummary = (username: string): { totalCount: number; totalSpent: number; pendingOrders: number } => {
  const userOrders = getOrdersByUser(username);
  
  return {
    totalCount: userOrders.length,
    totalSpent: userOrders.reduce((sum, order) => sum + order.price, 0),
    pendingOrders: userOrders.filter(o => o.status === 'pending').length
  };
};

export default mockOrders;
