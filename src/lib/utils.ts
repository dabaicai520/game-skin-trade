import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(price);
}

export function getWearColor(wear: string): string {
  const colors: Record<string, string> = {
    'Factory New': 'text-green-500 bg-green-500/10',
    'Minimal Wear': 'text-blue-500 bg-blue-500/10',
    'Field-Tested': 'text-yellow-500 bg-yellow-500/10',
    'Well-Worn': 'text-orange-500 bg-orange-500/10',
    'Battle-Scarred': 'text-red-500 bg-red-500/10',
  };
  return colors[wear] || 'text-gray-500 bg-gray-500/10';
}

export function getQualityColor(quality: string): string {
  if (quality.includes('Covert') || quality.includes('Immortal') || quality.includes('Contraband')) {
    return 'text-red-500';
  }
  if (quality.includes('Classified') || quality.includes('Legendary') || quality.includes('Mythical')) {
    return 'text-purple-500';
  }
  if (quality.includes('Restricted') || quality.includes('Epic') || quality.includes('Rare')) {
    return 'text-blue-500';
  }
  if (quality.includes('Mil-Spec') || quality.includes('Uncommon')) {
    return 'text-indigo-500';
  }
  return 'text-gray-500';
}
