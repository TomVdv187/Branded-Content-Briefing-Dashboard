'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="text-green-400" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-400" size={20} />;
      case 'info':
        return <Info className="text-blue-400" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${getBgColor()} backdrop-blur-xl border rounded-lg p-4 max-w-sm shadow-lg animate-in slide-in-from-right-2 duration-300`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}