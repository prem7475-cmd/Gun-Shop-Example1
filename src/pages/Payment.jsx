import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { paymentMethod, setPaymentMethod, getTotalPrice, formatPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(paymentMethod || '');
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment form states
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '💳', description: 'Pay using UPI apps like Google Pay, PhonePe' },
    { id: 'credit', name: 'Credit Card', icon: '💳', description: 'Visa, Mastercard, American Express' },
    { id: 'debit', name: 'Debit Card', icon: '💳', description: 'All major debit cards accepted' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'Pay using your bank account' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive your order' }
  ];

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '🎯' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱' },
    { id: 'paytm', name: 'Paytm', icon: '💰' },
    { id: 'bhim', name: 'BHIM UPI', icon: '🏛️' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: '📦' }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank',
    'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IDBI Bank', 'Kotak Mahindra Bank',
    'IndusInd Bank', 'Federal Bank', 'RBL Bank', 'Bandhan Bank', 'IDFC First Bank',
    'Yes Bank', 'South Indian Bank', 'City Union Bank', 'Karur Vysya Bank', 'Tamilnad Mercantile Bank',
    'Karnataka Bank', 'Vijaya Bank', 'Dena Bank', 'Oriental Bank of Commerce', 'United Bank of India',
    'UCO Bank', 'Bank of Maharashtra', 'Punjab & Sind Bank', 'Central Bank of India', 'Indian Overseas Bank'
  ];

  const detectCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    if (num.startsWith('6')) return 'Discover';
    if (/^60|^81|^82/.test(num)) return 'RuPay';
    return '';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setCardType(detectCardType(formatted));
  };

  const handlePayment = () => {
    if (!selectedMethod) return;

    // Basic validation
    if (selectedMethod === 'upi' && !upiId && !selectedUpiApp) {
      alert('Please enter UPI ID or select UPI app');
      return;
    }
    if ((selectedMethod === 'credit' || selectedMethod === 'debit') &&
        (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please fill all card details');
      return;
    }
    if (selectedMethod === 'netbanking' && !selectedBank) {
      alert('Please select a bank');
      return;
    }

    setIsProcessing(true);
    setPaymentMethod(selectedMethod);

    // Paytm Integration Simulation
    initiatePaytmPayment();
  };

  const initiatePaytmPayment = () => {
    // Simulate Paytm payment initiation
    const paytmConfig = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: `ORDER_${Date.now()}`,
        token: `TOKEN_${Date.now()}`,
        tokenType: "TXN_TOKEN",
        amount: (getTotalPrice() * 1.18).toFixed(2)
      },
      handler: {
        notifyMerchant: function(eventName, data) {
          console.log("Paytm event:", eventName, data);
        },
        transactionStatus: function(data) {
          console.log("Paytm transaction status:", data);
          if (data.STATUS === 'TXN_SUCCESS') {
            setIsProcessing(false);
            navigate('/success');
          } else {
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
          }
        }
      }
    };

    // Simulate Paytm redirect
    setTimeout(() => {
      // Create Paytm-like payment page
      const paytmWindow = window.open('', '_blank', 'width=800,height=600');
      if (paytmWindow) {
        paytmWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Paytm - Secure Payment</title>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { text-align: center; color: #00baff; font-size: 24px; margin-bottom: 20px; }
              .amount { font-size: 18px; text-align: center; margin: 20px 0; }
              .form-group { margin: 15px 0; }
              .form-group label { display: block; margin-bottom: 5px; }
              .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
              .btn { background: #00baff; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-size: 16px; }
              .btn:hover { background: #0099cc; }
              .secure { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">💳 Paytm Secure Payment</div>
              <div class="amount">Amount: ₹${(getTotalPrice() * 1.18).toFixed(2)}</div>
              <form id="paytmForm">
                <div class="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="Enter card number" required>
                </div>
                <div class="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" required>
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="CVV" required>
                </div>
                <div class="form-group">
                  <label>Card Holder Name</label>
                  <input type="text" placeholder="Name on card" required>
                </div>
                <button type="submit" class="btn">Pay ₹${(getTotalPrice() * 1.18).toFixed(2)}</button>
              </form>
              <div class="secure">🔒 Your payment is secured by Paytm</div>
            </div>
            <script>
              document.getElementById('paytmForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // Simulate payment success
                setTimeout(() => {
                  window.opener.postMessage({ type: 'PAYTM_SUCCESS', data: { STATUS: 'TXN_SUCCESS' } }, '*');
                  window.close();
                }, 2000);
              });
            </script>
          </body>
          </html>
        `);

        // Listen for Paytm response
        window.addEventListener('message', (event) => {
          if (event.data.type === 'PAYTM_SUCCESS') {
            setIsProcessing(false);
            navigate('/success');
          }
        });
      } else {
        // Fallback for popup blocker
        setTimeout(() => {
          setIsProcessing(false);
          navigate('/success');
        }, 3000);
      }
    }, 1000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold text-red-400">UPI Payment Options</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 mb-2">Enter UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Or select UPI App</label>
                <div className="grid grid-cols-2 gap-2">
                  {upiApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedUpiApp(app.id)}
                      className={`p-3 border rounded-lg transition-all duration-200 ${
                        selectedUpiApp === app.id
                          ? 'border-red-500 bg-red-900/20'
                          : 'border-gray-700 hover:border-red-400'
                      }`}
                    >
                      <span className="text-xl mr-2">{app.icon}</span>
                      {app.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert('QR Code generated! (Simulation)')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        );

      case 'credit':
      case 'debit':
        return (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold text-red-400">
              {selectedMethod === 'credit' ? 'Credit Card' : 'Debit Card'} Details
            </h3>

            <div>
              <label className="block text-gray-400 mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
              />
              {cardType && (
                <p className="text-sm text-green-400 mt-1">Detected: {cardType}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">CVV</label>
                <input
                  type="text"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="123"
                  maxLength="4"
                  className="w-full bg-gray-800 border border-red-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold text-red-400">Select Your Bank</h3>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`w-full p-3 border rounded-lg text-left transition-all duration-200 ${
                    selectedBank === bank
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-700 hover:border-red-400'
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>

            {selectedBank && (
              <p className="text-sm text-green-400">Selected: {selectedBank}</p>
            )}
          </div>
        );

      case 'cod':
        return (
          <div className="mt-6">
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Cash on Delivery</h3>
              <p className="text-gray-300">
                Pay in cash when your order is delivered to your doorstep.
                Additional ₹50 COD charges may apply.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            💀 PAYMENT GATEWAY 💀
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 bg-gray-900 border border-red-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-6">Choose Payment Method</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-700 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{method.name}</h3>
                      <p className="text-sm text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {renderPaymentForm()}

            {selectedMethod && (
              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-bold text-xl transform hover:scale-105 transition-all duration-200"
                >
                  {isProcessing ? '🔥 PROCESSING PAYMENT 🔥' : '💀 COMPLETE PAYMENT 💀'}
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <p className="mt-2 text-red-400">Processing your payment...</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 border border-red-800 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold text-red-400 mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CGST (9%)</span>
                <span className="text-white">₹{formatPrice(getTotalPrice() * 0.09)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SGST (9%)</span>
                <span className="text-white">₹{formatPrice(getTotalPrice() * 0.09)}</span>
              </div>
              <div className="border-t border-red-800 pt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-red-400">Total</span>
                  <span className="text-red-500">₹{formatPrice(getTotalPrice() * 1.18)}</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>🔒 Secure payment powered by Paytm</p>
              <p>⚠️ This is a simulation - no actual payment will be processed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
