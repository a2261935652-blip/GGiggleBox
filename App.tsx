import React, { useState } from 'react';
import { AppStep, OrderState, Product, CustomerDetails } from './types';
import { StepIndicator } from './components/StepIndicator';
import { ProductSelector } from './components/ProductSelector';
import { DetailsForm } from './components/DetailsForm';
import { PaymentUpload } from './components/PaymentUpload';
import { Confirmation } from './components/Confirmation';
import { GiggleLogo } from './components/GiggleLogo';

const INITIAL_DETAILS: CustomerDetails = {
  tiktokUsername: '',
  fullName: '',
  phoneNumber: '',
  address: ''
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SELECTION);
  
  const [orderState, setOrderState] = useState<OrderState>({
    selectedProduct: null,
    customerDetails: INITIAL_DETAILS,
    paymentScreenshot: null,
  });

  const handleProductSelect = (product: Product) => {
    setOrderState(prev => ({ ...prev, selectedProduct: product }));
  };

  const handleDetailsSubmit = (details: CustomerDetails) => {
    setOrderState(prev => ({ ...prev, customerDetails: details }));
    setCurrentStep(AppStep.PAYMENT);
  };

  const handlePaymentComplete = (file: File) => {
    setOrderState(prev => ({ ...prev, paymentScreenshot: file }));
    // Here you would typically upload the image to a server.
    // Since we are client-side only, we proceed to confirmation locally.
    setCurrentStep(AppStep.CONFIRMATION);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.SELECTION:
        return (
          <ProductSelector 
            selectedProduct={orderState.selectedProduct}
            onSelect={handleProductSelect}
            onNext={() => setCurrentStep(AppStep.DETAILS)}
          />
        );
      case AppStep.DETAILS:
        return (
          <DetailsForm 
            initialData={orderState.customerDetails}
            onSubmit={handleDetailsSubmit}
            onBack={() => setCurrentStep(AppStep.SELECTION)}
          />
        );
      case AppStep.PAYMENT:
        return (
          <PaymentUpload
            product={orderState.selectedProduct!}
            onBack={() => setCurrentStep(AppStep.DETAILS)}
            onComplete={handlePaymentComplete}
          />
        );
      case AppStep.CONFIRMATION:
        return <Confirmation orderState={orderState} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 sm:py-12">
      
      {/* Header */}
      <div className="w-full max-w-4xl px-4 mb-6 flex flex-col items-center justify-center gap-1">
        <GiggleLogo className="w-32 h-32 text-orange-600 drop-shadow-sm" />
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight -mt-2">GiggleBox</h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Step Indicator (Don't show on final step) */}
        {currentStep !== AppStep.CONFIRMATION && (
          <div className="bg-gray-50 border-b border-gray-100">
            <StepIndicator currentStep={currentStep} />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {renderStep()}
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GiggleBox. All rights reserved.
      </div>
    </div>
  );
};

export default App;