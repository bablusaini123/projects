import React from 'react'

export default function FullBackgroundAnimation() {
  return (
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-red-50/30" />
            
            {/* Background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `particleFloat 8s ease-in-out infinite ${i * 0.5}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Floating money notes */}
            {[
                { amount: '500', top: '10%', left: '5%', delay: '0s' },
                { amount: '1000', top: '20%', right: '10%', delay: '1s' },
                { amount: '2000', bottom: '30%', left: '8%', delay: '2s' },
                { amount: '5000', bottom: '15%', right: '5%', delay: '3s' },
                { amount: '1500', top: '40%', left: '15%', delay: '4s' },
                { amount: '3000', top: '60%', right: '20%', delay: '5s' },
                { amount: '2500', bottom: '50%', left: '80%', delay: '6s' },
                { amount: '4000', top: '80%', left: '70%', delay: '7s' }
            ].map((note, i) => (
                <div
                    key={i}
                    className="absolute w-12 h-8 bg-gradient-to-r from-green-500/80 to-green-600/80 rounded text-white text-xs font-bold flex items-center justify-center shadow-lg money-float"
                    style={{
                        ...Object.fromEntries(Object.entries(note).filter(([key]) => ['top', 'bottom', 'left', 'right'].includes(key))),
                        animationDelay: note.delay
                    }}
                >
                    ₹{note.amount}
                </div>
            ))}
            
            {/* Spinning coins */}
            {[
                { top: '15%', right: '25%', delay: '0s' },
                { bottom: '20%', left: '10%', delay: '1s' },
                { top: '30%', left: '20%', delay: '2s' },
                { bottom: '40%', right: '15%', delay: '3s' },
                { top: '50%', right: '30%', delay: '4s' },
                { bottom: '60%', left: '25%', delay: '5s' },
                { top: '70%', left: '75%', delay: '6s' },
                { bottom: '80%', right: '40%', delay: '7s' }
            ].map((coin, i) => (
                <div
                    key={i}
                    className="absolute w-8 h-8 bg-gradient-to-br from-yellow-400/80 to-yellow-500/80 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg coin-spin"
                    style={{
                        ...Object.fromEntries(Object.entries(coin).filter(([key]) => ['top', 'bottom', 'left', 'right'].includes(key))),
                        animationDelay: coin.delay
                    }}
                >
                    ₹
                </div>
            ))}
            
            {/* Wallets */}
            {[
                { bottom: '25%', right: '12%', delay: '0s' },
                { top: '35%', left: '5%', delay: '2s' },
                { bottom: '70%', left: '90%', delay: '4s' }
            ].map((wallet, i) => (
                <div
                    key={i}
                    className="absolute w-12 h-8 bg-purple-600/80 rounded-md wallet-glow"
                    style={{
                        ...Object.fromEntries(Object.entries(wallet).filter(([key]) => ['top', 'bottom', 'left', 'right'].includes(key))),
                        animationDelay: wallet.delay
                    }}
                >
                    <div className="absolute -top-1 left-1 right-1 h-2 bg-purple-500/80 rounded-t"></div>
                </div>
            ))}
            
            {/* Success checks */}
            {[
                { top: '10%', left: '8%', delay: '0s' },
                { bottom: '10%', right: '8%', delay: '2s' },
                { top: '45%', right: '5%', delay: '4s' },
                { bottom: '45%', left: '3%', delay: '6s' }
            ].map((check, i) => (
                <div
                    key={i}
                    className="absolute w-10 h-10 bg-green-500/80 rounded-full flex items-center justify-center text-white font-bold success-pulse"
                    style={{
                        ...Object.fromEntries(Object.entries(check).filter(([key]) => ['top', 'bottom', 'left', 'right'].includes(key))),
                        animationDelay: check.delay
                    }}
                >
                    ✓
                </div>
            ))}
            
            {/* Floating phones */}
            {[
                { top: '25%', left: '40%', delay: '0s' },
                { bottom: '35%', right: '35%', delay: '3s' },
                { top: '65%', left: '60%', delay: '6s' }
            ].map((phone, i) => (
                <div
                    key={i}
                    className="absolute w-16 h-24 bg-gradient-to-b from-blue-600/80 to-blue-700/80 rounded-lg shadow-xl phone-float"
                    style={{
                        ...Object.fromEntries(Object.entries(phone).filter(([key]) => ['top', 'bottom', 'left', 'right'].includes(key))),
                        animationDelay: phone.delay
                    }}
                >
                    <div className="m-1 h-20 bg-gradient-to-br from-blue-500/80 to-blue-600/80 rounded flex flex-col items-center justify-center text-white text-xs">
                        <div className="font-bold text-pulse">EARN</div>
                        <div className="text-yellow-300">₹{(i + 1) * 1000}</div>
                    </div>
                </div>
            ))}
            
            <style jsx>{`
                .phone-float {
                    animation: phoneFloat 6s ease-in-out infinite;
                }
                
                .text-pulse {
                    animation: textPulse 2s ease-in-out infinite;
                }
                
                .money-float {
                    animation: floatMoney 8s ease-in-out infinite;
                }
                
                .coin-spin {
                    animation: spinCoin 4s linear infinite, floatCoin 6s ease-in-out infinite;
                }
                
                .wallet-glow {
                    animation: walletGlow 4s ease-in-out infinite;
                }
                
                .success-pulse {
                    animation: successPulse 5s ease-in-out infinite;
                }
                
                @keyframes phoneFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
                    25% { transform: translateY(-20px) rotate(2deg); opacity: 0.8; }
                    50% { transform: translateY(-15px) rotate(-1deg); opacity: 0.9; }
                    75% { transform: translateY(-25px) rotate(1deg); opacity: 0.7; }
                }
                
                @keyframes textPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                
                @keyframes floatMoney {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
                    25% { transform: translateY(-25px) rotate(5deg); opacity: 0.9; }
                    50% { transform: translateY(-15px) rotate(-3deg); opacity: 0.8; }
                    75% { transform: translateY(-30px) rotate(3deg); opacity: 1; }
                }
                
                @keyframes spinCoin {
                    0% { transform: rotateY(0deg); }
                    50% { transform: rotateY(180deg); }
                    100% { transform: rotateY(360deg); }
                }
                
                @keyframes floatCoin {
                    0%, 100% { transform: translateY(0); opacity: 0.7; }
                    50% { transform: translateY(-25px); opacity: 1; }
                }
                
                @keyframes walletGlow {
                    0%, 100% { box-shadow: 0 0 15px rgba(124, 58, 237, 0.3); opacity: 0.7; }
                    50% { box-shadow: 0 0 25px rgba(124, 58, 237, 0.8); opacity: 1; }
                }
                
                @keyframes successPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.3); opacity: 1; }
                }
                
                @keyframes particleFloat {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
                    25% { transform: translateY(-40px) translateX(15px); opacity: 0.6; }
                    50% { transform: translateY(-25px) translateX(-10px); opacity: 0.4; }
                    75% { transform: translateY(-50px) translateX(20px); opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
