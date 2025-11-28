import { Product } from './types';

export const BANK_INFO = {
  bankName: "예시 은행 (Example Bank)",
  accountName: "점주 (Merchant Name)",
  accountNumber: "6222 0000 1234 5678",
  branch: "서울 지점"
};

export const PRODUCTS: Product[] = [
  {
    id: 'style-1',
    name: '1번 (1+2 이벤트 (3개 보장))',
    description: '전 제품 사이즈 조절 가능 링 | 소재: 두꺼운 도금 합금 K금/은 | 화학 물질 접촉 금지',
    // Rose gold/Pinkish vibe, cute and luxury
    imageUrl: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=500&h=500&q=80',
    price: 29.90
  },
  {
    id: 'style-2',
    name: '2번 (1+5 이벤트 (8개 보장))',
    description: '전 제품 사이즈 조절 가능 링 | 소재: 두꺼운 도금 합금 K금/은 | 화학 물질 접촉 금지',
    // Elegant gold ring with stone, high-end feel
    imageUrl: 'https://images.unsplash.com/photo-1617038224558-2834a2d1dfc7?auto=format&fit=crop&w=500&h=500&q=80',
    price: 69.90
  },
  {
    id: 'style-3',
    name: '3번 (1+10 이벤트 (20개 보장))',
    description: '전 제품 사이즈 조절 가능 링 | 소재: 두꺼운 도금 합금 K금/은 | 화학 물질 접촉 금지',
    // Diamond/Sparkly, very luxury
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&h=500&q=80',
    price: 139.90
  },
  {
    id: 'style-4',
    name: '4번 (1+20 이벤트 (40개 보장))',
    description: '전 제품 사이즈 조절 가능 링 | 소재: 두꺼운 도금 합금 K금/은 | 화학 물질 접촉 금지',
    // Artistic/Classic Gold, premium look
    imageUrl: 'https://images.unsplash.com/photo-1589128040788-783947743d5a?auto=format&fit=crop&w=500&h=500&q=80',
    price: 279.90
  }
];