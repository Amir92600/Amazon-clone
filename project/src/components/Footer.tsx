import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amazon-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us - Founded in 1994, we're committed to being Earth's most customer-centric company.
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers - Join us in building the future of online retail with competitive benefits and growth opportunities.
                </a>
              </li>
              <li>
                <a href="/press" className="text-gray-300 hover:text-white transition-colors">
                  Press Releases - Stay updated with our latest announcements and innovations.
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="/sell" className="text-gray-300 hover:text-white transition-colors">
                  Sell on Amazon - Reach millions of customers and grow your business.
                </a>
              </li>
              <li>
                <a href="/accelerator" className="text-gray-300 hover:text-white transition-colors">
                  Amazon Accelerator - Launch and scale your brand with dedicated support.
                </a>
              </li>
              <li>
                <a href="/affiliate" className="text-gray-300 hover:text-white transition-colors">
                  Become an Affiliate - Earn commissions by promoting Amazon products.
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="/rewards-visa" className="text-gray-300 hover:text-white transition-colors">
                  Amazon Rewards Visa Card - Earn up to 5% back on Amazon.com purchases.
                </a>
              </li>
              <li>
                <a href="/store-card" className="text-gray-300 hover:text-white transition-colors">
                  Amazon Store Card - Special financing on eligible purchases.
                </a>
              </li>
              <li>
                <a href="/business-card" className="text-gray-300 hover:text-white transition-colors">
                  Amazon Business Card - Flexible payment terms for your business needs.
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li>
                <a href="/account" className="text-gray-300 hover:text-white transition-colors">
                  Your Account - Manage your orders, preferences, and settings.
                </a>
              </li>
              <li>
                <a href="/orders" className="text-gray-300 hover:text-white transition-colors">
                  Your Orders - Track packages and view order history.
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center - Get assistance with orders, returns, and more.
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold text-amazon-orange">amazonClone</span>
          </div>
          <p className="mt-4 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Amazon Clone. This is a demo project for educational purposes only. Not affiliated with Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;