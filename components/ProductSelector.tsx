import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

interface ProductSelectorProps {
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
  onNext: () => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelect, onNext }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">스타일을 선택하세요</h2>
        <p className="text-gray-500 text-sm mt-1">아래에서 마음에 드는 제품을 선택해주세요</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRODUCTS.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          return (
            <div
              key={product.id}
              onClick={() => onSelect(product)}
              className={`
                relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-200 group
                ${isSelected ? 'border-blue-600 shadow-lg ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white rounded-full p-1">
                  <CheckCircle2 size={16} />
                </div>
              )}
              
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="500"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-1">₩{product.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedProduct}
          className={`
            w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-all
            ${selectedProduct ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'}
          `}
        >
          다음: 정보 입력
        </button>
      </div>
    </div>
  );
};