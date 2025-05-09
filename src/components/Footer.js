import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {

    console.log("Footer component is rendering"); // Add this log to track rendering

    return (
    <footer className="bg-[#0B0B12] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10 border-b border-white pb-8">
        {/* Logo + Title */}
        <div className="col-span-1 flex items-start space-x-4">
          // CHANGE src="/logo.png" TO ACTUAL FILE PATH
          //<Image src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
          <div
            className="text-white font-[montage] uppercase text-left text-lg flex flex-col justify-center"
            style={{ height: '80px' }}
          >
            <span>Pro Football</span>
            <span>Report</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-white"></div>

        {/* Follow Us */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mb-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <FaTwitter />
            </a>
          </div>
          <button className="bg-white text-black rounded-full px-4 py-1">Contact Us</button>
        </div>

        {/* Subscribe */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-2">Subscribe</h3>
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-white text-black placeholder-gray-500 p-2 mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white text-black placeholder-gray-500 p-2 mb-2"
          />
          <button className="bg-black border border-white text-white px-4 py-1 rounded-md w-full">Subscribe</button>
        </div>

        {/* Suggestions */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-2">Suggestions</h3>
          <textarea
            placeholder="Have an NFL news source we should add, please let us know here"
            className="w-full bg-white text-black placeholder-gray-500 p-2 h-24 mb-2"
          ></textarea>
          <button className="bg-black border border-white text-white px-4 py-1 rounded-md w-full">Submit</button>
        </div>

        {/* About */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-2">About</h3>
          <div className="flex flex-col space-y-1">
            <a href="#" className="text-white hover:underline">Privacy Policy</a>
            <a href="#" className="text-white hover:underline">Terms of Use</a>
            <a href="#" className="text-white hover:underline">Advertise with Us</a>
            <a href="#" className="text-white hover:underline">Legal</a>
            <a href="#" className="text-white hover:underline">Site Map</a>
          </div>
        </div>
      </div>

      {/* Disclaimer and Bottom Line */}
      <div className="max-w-7xl mx-auto text-xs text-white pt-6">
        <p className="mb-4">
          DISCLAIMER: This site and the products offered are for entertainment purposes only, and there is no gambling offered on this site. This service is intended for adult audiences. No guarantees are made for any specific outcome. If you or someone you know has a gambling problem, please call 1-800-GAMBLER.
        </p>
        <hr className="border-white mb-2" />
        <p className="text-center">© 2024 Pro Football Report</p>
      </div>
    </footer>
  );
};

export default Footer;
