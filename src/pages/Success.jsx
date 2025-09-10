import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();

    // Trigger bullet animation
    const triggerBulletAnimation = () => {
      const effectsContainer = document.createElement('div');
      effectsContainer.className = 'fixed inset-0 z-50 pointer-events-none';
      effectsContainer.innerHTML = `
        <style>
          @keyframes bulletFire {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(2) rotate(180deg); opacity: 1; }
            100% { transform: scale(4) rotate(360deg); opacity: 0; }
          }

          @keyframes crackSpread {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.9; transform: scale(1.3); }
          }

          @keyframes bloodDrip {
            0% { opacity: 0; transform: translateY(-100px) scale(0); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }

          .bullet-hole {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, #ff0000 0%, #8b0000 30%, #000 70%, transparent 100%);
            border-radius: 50%;
            box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
            animation: bulletFire 0.6s ease-out;
          }

          .crack {
            position: absolute;
            background: linear-gradient(45deg, transparent 30%, #000 50%, transparent 70%);
            box-shadow: 0 0 10px #000;
            animation: crackSpread 1.2s ease-out forwards;
          }

          .blood-stain {
            position: absolute;
            background: radial-gradient(ellipse, #8b0000 0%, #ff0000 20%, transparent 70%);
            animation: bloodDrip 1.5s ease-out forwards;
            filter: blur(1px);
          }

          .effects-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            pointer-events: none;
            z-index: 9999;
          }
        </style>
      `;
      document.body.appendChild(effectsContainer);

      // Create effects overlay
      const overlay = document.createElement('div');
      overlay.className = 'effects-overlay';
      effectsContainer.appendChild(overlay);

      // Create bullet hole at center
      const bulletHole = document.createElement('div');
      bulletHole.className = 'bullet-hole';
      effectsContainer.appendChild(bulletHole);

      // Create crack effects spreading from center
      const crackPositions = [
        { width: '200px', height: '3px', angle: 0 },
        { width: '200px', height: '3px', angle: 45 },
        { width: '200px', height: '3px', angle: 90 },
        { width: '200px', height: '3px', angle: 135 },
        { width: '150px', height: '2px', angle: 22.5 },
        { width: '150px', height: '2px', angle: 67.5 },
        { width: '150px', height: '2px', angle: 112.5 },
        { width: '150px', height: '2px', angle: 157.5 }
      ];

      crackPositions.forEach((crack, index) => {
        const crackElement = document.createElement('div');
        crackElement.className = 'crack';
        crackElement.style.position = 'absolute';
        crackElement.style.top = '50%';
        crackElement.style.left = '50%';
        crackElement.style.width = crack.width;
        crackElement.style.height = crack.height;
        crackElement.style.transformOrigin = 'center';
        crackElement.style.transform = `translate(-50%, -50%) rotate(${crack.angle}deg)`;
        crackElement.style.animationDelay = `${index * 0.1}s`;
        effectsContainer.appendChild(crackElement);
      });

      // Create blood stains
      const bloodPositions = [
        { top: '20%', left: '30%', size: '40px' },
        { top: '30%', left: '70%', size: '50px' },
        { top: '60%', left: '20%', size: '35px' },
        { top: '70%', left: '80%', size: '45px' },
        { top: '40%', left: '50%', size: '60px' },
        { top: '80%', left: '40%', size: '40px' },
        { top: '15%', left: '60%', size: '30px' },
        { top: '85%', left: '15%', size: '55px' },
        { top: '50%', left: '85%', size: '35px' },
        { top: '25%', left: '10%', size: '45px' }
      ];

      bloodPositions.forEach((blood, index) => {
        const bloodElement = document.createElement('div');
        bloodElement.className = 'blood-stain';
        bloodElement.style.position = 'absolute';
        bloodElement.style.width = blood.size;
        bloodElement.style.height = blood.size;
        bloodElement.style.top = blood.top;
        bloodElement.style.left = blood.left;
        bloodElement.style.borderRadius = '50%';
        bloodElement.style.animationDelay = `${0.3 + index * 0.1}s`;
        effectsContainer.appendChild(bloodElement);
      });

      // Play gunshot sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'square';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);

      // Clean up effects after animation
      setTimeout(() => {
        effectsContainer.style.animation = 'fadeOut 2s forwards';

        setTimeout(() => {
          effectsContainer.remove();
        }, 2000);
      }, 3000);
    };

    // Trigger animation after component mounts
    setTimeout(triggerBulletAnimation, 500);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <span className="text-6xl">💀</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            PAYMENT SUCCESSFUL!
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Your weapons have been dispatched to your location.
        </p>

        <div className="bg-gray-900 border border-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Order Confirmation</h2>
          <p className="text-gray-400 mb-4">
            Thank you for your purchase! Your order has been confirmed and will be delivered soon.
          </p>
          <p className="text-sm text-gray-500">
            ⚠️ This is a simulation - no actual weapons will be delivered.
          </p>
        </div>

        <div className="space-x-4">
          <Link
            to="/home"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
