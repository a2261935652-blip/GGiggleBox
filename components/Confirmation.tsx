import React, { useMemo } from 'react';
import { OrderState } from '../types';
import { CheckCircle, Copy, Send, Package } from 'lucide-react';

interface ConfirmationProps {
  orderState: OrderState;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ orderState }) => {
  const { customerDetails, selectedProduct } = orderState;

  const orderString = useMemo(() => {
    if (!customerDetails || !selectedProduct) return '';
    
    return `【새로운 주문】
------------------
스타일: ${selectedProduct.name}
TikTok: ${customerDetails.tiktokUsername}
성함: ${customerDetails.fullName || '미입력'}
전화번호: ${customerDetails.phoneNumber}
주소: ${customerDetails.address}
------------------`;
  }, [customerDetails, selectedProduct]);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderString);
    alert('주문 내역이 복사되었습니다');
  };

  // Note: Actual messaging apps would use deep links (e.g., wa.me). 
  // Since we don't have a specific backend or phone number for the merchant, 
  // copying is the safest generic implementation.

  return (
    <div className="max-w-xl mx-auto animate-fade-in text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">주문이 완료되었습니다!</h2>
      <p className="text-gray-500 mb-8">구매해 주셔서 감사합니다. 빠른 시일 내에 배송해 드리겠습니다.</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-left mb-8">
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
          <Package size={18} className="text-gray-500" />
          <span className="font-semibold text-gray-700">주문 내역</span>
        </div>
        <div className="p-6 bg-slate-50 relative group">
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed break-words">
            {orderString}
          </pre>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleCopy}
              className="p-2 bg-white rounded shadow text-gray-600 hover:text-blue-600"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Copy size={20} />
          주문 내역 복사
        </button>
        
        <p className="text-xs text-gray-400 mt-4">
          확인을 위해 위 주문 내역을 복사하여 고객센터로 보내주세요
        </p>

        <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 text-sm hover:underline mt-4 block w-full"
        >
            홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};