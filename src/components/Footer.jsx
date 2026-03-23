import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-12 pb-8 mt-20">
      <div className="max-w-[1024px] mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-300 pb-10">
          <div className="space-y-4">
            <h4 className="text-[12px] font-bold text-[#1d1d1f]">Shop and Learn</h4>
            <ul className="text-[12px] text-[#424245] space-y-2.5">
              <li className="hover:underline cursor-pointer">Store</li>
              <li className="hover:underline cursor-pointer">Mac</li>
              <li className="hover:underline cursor-pointer">iPad</li>
              <li className="hover:underline cursor-pointer">iPhone</li>
              <li className="hover:underline cursor-pointer">Watch</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[12px] font-bold text-[#1d1d1f]">Services</h4>
            <ul className="text-[12px] text-[#424245] space-y-2.5">
              <li className="hover:underline cursor-pointer">Apple Music</li>
              <li className="hover:underline cursor-pointer">Apple TV+</li>
              <li className="hover:underline cursor-pointer">Apple Arcade</li>
              <li className="hover:underline cursor-pointer">iCloud</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[12px] font-bold text-[#1d1d1f]">Apple Store</h4>
            <ul className="text-[12px] text-[#424245] space-y-2.5">
              <li className="hover:underline cursor-pointer">Find a Store</li>
              <li className="hover:underline cursor-pointer">Genius Bar</li>
              <li className="hover:underline cursor-pointer">Today at Apple</li>
              <li className="hover:underline cursor-pointer">Apple Camp</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[12px] font-bold text-[#1d1d1f]">Account</h4>
            <ul className="text-[12px] text-[#424245] space-y-2.5">
              <li className="hover:underline cursor-pointer">Manage Your Apple ID</li>
              <li className="hover:underline cursor-pointer">Apple Store Account</li>
              <li className="hover:underline cursor-pointer">iCloud.com</li>
            </ul>
          </div>
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-[12px] font-bold text-[#1d1d1f]">ElectroHub Values</h4>
            <ul className="text-[12px] text-[#424245] space-y-2.5">
              <li className="hover:underline cursor-pointer">Accessibility</li>
              <li className="hover:underline cursor-pointer">Education</li>
              <li className="hover:underline cursor-pointer">Environment</li>
              <li className="hover:underline cursor-pointer">Privacy</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 space-y-4">
          <p className="text-[12px] text-[#86868b]">
            More ways to shop: <span className="text-[#0066cc] underline cursor-pointer">Find an ElectroHub Store</span> or <span className="text-[#0066cc] underline cursor-pointer">other retailer</span> near you. Or call 1-800-MY-ELECTRO.
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-between border-t border-gray-300 pt-4 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[12px] text-[#424245]">
              <span className="text-[#86868b]">Copyright © {currentYear} ElectroHub Inc. All rights reserved.</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="hover:underline cursor-pointer border-r border-gray-400 pr-4">Privacy Policy</span>
                <span className="hover:underline cursor-pointer border-r border-gray-400 pr-4">Terms of Use</span>
                <span className="hover:underline cursor-pointer border-r border-gray-400 pr-4">Sales and Refunds</span>
                <span className="hover:underline cursor-pointer">Legal</span>
              </div>
            </div>
            <div className="text-[12px] text-[#424245] font-medium">
               Pakistan
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;