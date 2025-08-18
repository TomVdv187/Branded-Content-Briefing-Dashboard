'use client';

import React, { useState, useEffect } from 'react';
import { X, CreditCard, Wallet, Check, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
  onPaymentSuccess: (method: 'card' | 'crypto') => void;
}

interface PaymentForm {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export default function PaymentModal({ isOpen, onClose, planName, price, onPaymentSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  const [formData, setFormData] = useState<PaymentForm>({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletConnected(true);
            setWalletAddress(accounts[0]);
            console.log('Wallet already connected:', accounts[0]);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    if (isOpen) {
      checkWalletConnection();
    }
  }, [isOpen]);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          console.log('Account changed to:', accounts[0]);
        } else {
          setWalletConnected(false);
          setWalletAddress('');
          console.log('Wallet disconnected');
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  if (!isOpen) return null;

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentSuccess('card');
        onClose();
      }, 1500);
    } catch (error) {
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask from https://metamask.io/ to continue.');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        console.log('✅ Wallet connected:', accounts[0]);
        
        // Check if we're on the right network (optional)
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Connected to network:', chainId);
      } else {
        throw new Error('No accounts found');
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      if (error.code === 4001) {
        alert('Connection rejected. Please approve the connection in MetaMask to continue.');
      } else if (error.code === -32002) {
        alert('Connection request already pending. Please check your MetaMask extension.');
      } else {
        alert(`Failed to connect wallet: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    console.log('Wallet disconnected by user');
  };

  const handleCryptoPayment = async () => {
    if (!walletConnected || !window.ethereum) {
      alert('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Define the transaction parameters
      const transactionParams = {
        to: '0x742d35Cc6634C0532925a3b8D42C32f4B2fAf111', // Example recipient address
        from: walletAddress,
        value: '0x9C9696E85EC00', // ~0.042 ETH in wei (example amount)
        gas: '0x5208', // 21000 gas limit for simple transfer
        gasPrice: await window.ethereum.request({ method: 'eth_gasPrice' })
      };

      console.log('Sending transaction:', transactionParams);

      // Request transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams],
      });

      console.log('✅ Transaction sent:', txHash);
      
      // Simulate waiting for confirmation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentSuccess('crypto');
        onClose();
      }, 1500);
      
    } catch (error: any) {
      console.error('Transaction failed:', error);
      
      if (error.code === 4001) {
        alert('Transaction rejected by user');
      } else if (error.code === -32603) {
        alert('Transaction failed: Insufficient funds or network error');
      } else {
        alert(`Transaction failed: ${error.message || 'Unknown error'}`);
      }
      
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-600/30">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
          <p className="text-slate-300 mb-4">
            Welcome to ContentCraft {planName}! You now have access to all premium features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl max-w-2xl mx-4 border border-slate-600/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <div>
            <h2 className="text-2xl font-bold text-white">Complete Your Purchase</h2>
            <p className="text-slate-400">ContentCraft {planName} - {price}/month</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!paymentMethod && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6">Choose Payment Method</h3>
              
              {/* Card Payment */}
              <button
                onClick={() => setPaymentMethod('card')}
                className="w-full p-6 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl border border-slate-600/30 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="text-blue-400" size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Credit / Debit Card
                    </h4>
                    <p className="text-slate-400 text-sm">Pay securely with your card</p>
                  </div>
                </div>
              </button>

              {/* Crypto Payment */}
              <button
                onClick={() => setPaymentMethod('crypto')}
                className="w-full p-6 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl border border-slate-600/30 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Wallet className="text-orange-400" size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                      Cryptocurrency
                    </h4>
                    <p className="text-slate-400 text-sm">Pay with MetaMask or other Web3 wallets</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ←
                </button>
                <h3 className="text-xl font-semibold text-white">Card Payment</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="4532 1234 5678 9012"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: formatExpiryDate(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="123"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCardPayment}
                disabled={isProcessing || !formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Pay ${price}/month`
                )}
              </button>
            </div>
          )}

          {/* Crypto Payment */}
          {paymentMethod === 'crypto' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ←
                </button>
                <h3 className="text-xl font-semibold text-white">Cryptocurrency Payment</h3>
              </div>

              {!walletConnected ? (
                <div className="text-center py-8">
                  <Wallet className="text-orange-400 mx-auto mb-4" size={48} />
                  <h4 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h4>
                  <p className="text-slate-400 mb-6">Connect your MetaMask wallet to continue with crypto payment</p>
                  
                  {/* MetaMask Detection Status */}
                  <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600/30">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' 
                          ? 'bg-green-400' 
                          : 'bg-red-400'
                      }`}></div>
                      <span className="text-sm text-slate-300">
                        MetaMask {typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' ? 'Detected' : 'Not Found'}
                      </span>
                    </div>
                    {typeof window !== 'undefined' && typeof window.ethereum === 'undefined' && (
                      <p className="text-xs text-slate-400">
                        Please install MetaMask from{' '}
                        <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline">
                          metamask.io
                        </a>
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={connectWallet}
                    disabled={typeof window !== 'undefined' && typeof window.ethereum === 'undefined'}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {typeof window !== 'undefined' && typeof window.ethereum === 'undefined' 
                      ? 'Install MetaMask' 
                      : 'Connect MetaMask'
                    }
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">Wallet Connected</h4>
                      <button
                        onClick={disconnectWallet}
                        className="text-slate-400 hover:text-white text-sm underline"
                      >
                        Disconnect
                      </button>
                    </div>
                    <p className="text-slate-400 text-sm font-mono break-all">{walletAddress}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">Connected</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                    <h4 className="font-semibold text-blue-300 mb-2">Payment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plan:</span>
                        <span className="text-white">ContentCraft {planName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount:</span>
                        <span className="text-white">≈ 0.042 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Network:</span>
                        <span className="text-white">Ethereum Mainnet</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCryptoPayment}
                    disabled={isProcessing}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Transaction...</span>
                      </div>
                    ) : (
                      'Pay with Crypto'
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-red-400" size={20} />
                <span className="text-red-300 font-medium">Payment Failed</span>
              </div>
              <p className="text-red-200 text-sm mt-1">
                There was an error processing your payment. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}