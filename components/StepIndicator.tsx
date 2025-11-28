import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { label: '선택', step: AppStep.SELECTION },
    { label: '정보', step: AppStep.DETAILS },
    { label: '결제', step: AppStep.PAYMENT },
    { label: '완료', step: AppStep.CONFIRMATION },
  ];

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        {/* Progress Bar Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((item) => {
          const isActive = currentStep >= item.step;
          const isCurrent = currentStep === item.step;

          return (
            <div key={item.step} className="flex flex-col items-center">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'}
                  ${isCurrent ? 'ring-4 ring-blue-100' : ''}
                `}
              >
                {item.step + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};