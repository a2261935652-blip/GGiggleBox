import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { BANK_INFO } from '../constants';
import { Copy, Upload, X, CreditCard, Image as ImageIcon } from 'lucide-react';

interface PaymentUploadProps {
  product: Product;
  onBack: () => void;
  onComplete: (file: File) => void;
}

export const PaymentUpload: React.FC<PaymentUploadProps> = ({ product, onBack, onComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('클립보드에 복사되었습니다');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">결제 및 입금 확인</h2>
        <p className="text-gray-500 text-sm mt-1">아래 계좌로 입금 후 스크린샷을 업로드해주세요</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <CreditCard size={18} />
            계좌 정보
          </span>
          <span className="text-blue-600 font-bold">₩{product.price.toFixed(2)}</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">은행명</span>
            <span className="text-gray-800 font-medium text-right">{BANK_INFO.bankName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">예금주</span>
            <span className="text-gray-800 font-medium text-right">{BANK_INFO.accountName}</span>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-400 mb-1">계좌번호</p>
              <p className="text-lg font-mono font-bold text-blue-900 tracking-wide">{BANK_INFO.accountNumber}</p>
            </div>
            <button 
              onClick={() => handleCopy(BANK_INFO.accountNumber)}
              className="p-2 bg-white rounded-md shadow-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Copy size={18} />
            </button>
          </div>
          <p className="text-xs text-center text-gray-400">지점: {BANK_INFO.branch}</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">이체 확인증 업로드</label>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          className="hidden" 
        />

        {!selectedFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all gap-2"
          >
            <Upload size={32} />
            <span className="text-sm font-medium">이미지 업로드</span>
          </div>
        ) : (
          <div className="relative w-full rounded-xl overflow-hidden border border-gray-200">
            <img src={previewUrl!} alt="Payment Screenshot" className="w-full h-auto max-h-60 object-contain bg-gray-100" />
            <div className="absolute top-0 right-0 p-2 w-full bg-gradient-to-b from-black/50 to-transparent flex justify-end">
              <button 
                onClick={removeFile}
                className="p-1 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="bg-white p-3 flex items-center gap-2 border-t border-gray-100">
              <ImageIcon size={16} className="text-green-500" />
              <span className="text-xs text-gray-600 truncate flex-1">{selectedFile.name}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          이전
        </button>
        <button
          onClick={() => selectedFile && onComplete(selectedFile)}
          disabled={!selectedFile}
          className={`
            flex-1 py-3 rounded-lg font-semibold text-white transition-all
            ${selectedFile ? 'bg-green-600 hover:bg-green-700 shadow-md transform hover:-translate-y-0.5' : 'bg-gray-300 cursor-not-allowed'}
          `}
        >
          주문 제출
        </button>
      </div>
    </div>
  );
};