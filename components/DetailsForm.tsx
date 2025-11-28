import React, { useState, useEffect } from 'react';
import { CustomerDetails } from '../types';
import { User, Phone, MapPin, AtSign } from 'lucide-react';

interface DetailsFormProps {
  initialData: CustomerDetails;
  onSubmit: (data: CustomerDetails) => void;
  onBack: () => void;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<CustomerDetails>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!formData.tiktokUsername.trim()) newErrors.tiktokUsername = "TikTok 아이디를 입력해주세요";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "전화번호를 입력해주세요";
    if (!formData.address.trim()) newErrors.address = "배송지 주소를 입력해주세요";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">배송 정보</h2>
        <p className="text-gray-500 text-sm mt-1">배송을 위해 연락처 정보를 입력해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* TikTok Username */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">TikTok 아이디 <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.tiktokUsername}
              onChange={(e) => handleChange('tiktokUsername', e.target.value)}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.tiktokUsername ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="@아이디"
            />
          </div>
          {errors.tiktokUsername && <p className="text-red-500 text-xs">{errors.tiktokUsername}</p>}
        </div>

        {/* Full Name (Optional) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">성함 (선택사항)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="성함을 입력하세요"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">전화번호 <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-gray-400" />
            </div>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="010-0000-0000"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">배송지 주소 <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="도/시/구/동 상세주소"
            />
          </div>
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        </div>

        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            이전
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            다음: 결제
          </button>
        </div>

      </form>
    </div>
  );
};