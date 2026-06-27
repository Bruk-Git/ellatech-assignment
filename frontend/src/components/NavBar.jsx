import React, { useState } from 'react';

function Navbar({ onTabChange, activeTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'register', label: 'Register', icon: '👤' },
    { id: 'add-product', label: 'Add Product', icon: '➕' },
    { id: 'transactions', label: 'Ledger', icon: '📜' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-blue-500/30 shadow-xl shadow-blue-500/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full animate-pulse"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <span className="text-yellow-400 text-xl font-bold">📦</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                Inventory
              </span>
              <span className="text-xl font-bold text-gray-400">Hub</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setIsMenuOpen(false);
                }}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeTab === link.id 
                    ? 'text-white bg-blue-600/20 shadow-lg shadow-blue-500/20' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }
                  group
                `}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </span>
                
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse"></span>
                )}
                
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400/50 rounded-full transition-all duration-300 group-hover:w-8"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden overflow-hidden transition-all duration-500 ease-in-out
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-4 py-3 space-y-2 bg-gray-900/95 border-t border-blue-500/20">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => {
                onTabChange(link.id);
                setIsMenuOpen(false);
              }}
              className={`
                flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTab === link.id 
                  ? 'bg-blue-600/20 text-white border-l-4 border-yellow-400' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }
                animate-fadeInUp
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
              {activeTab === link.id && (
                <span className="ml-auto">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Golden Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-shimmer"></div>
    </nav>
  );
}

export default Navbar;