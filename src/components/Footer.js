import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  console.log("Footer component is rendering");

  return (
    <footer className="bg-[#0B0B12] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-x-6 gap-y-8 justify-between items-start">
        {/* Logo + Title */}
        <div className="flex flex-col items-start space-y-1 min-w-[140px]">
          <div className="text-white font-[montage] uppercase text-left text-2xl leading-tight">
            <span>Pro Football Report</span>
          </div>
        </div>

        {/* Logo Image in Footer */}
        <div className="flex flex-col items-start">
          <Image src="public/images/PFRlogo.jpg" alt="Logo" width={48} height={48} />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-white h-20 self-start"></div>

        {/* Follow Us */}
        <div className="flex flex-col items-start min-w-[140px]">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-3 mb-3">
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
        <div className="flex flex-col items-start min-w-[200px]">
          <h3 className="text-lg font-bold mb-2">Subscribe</h3>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-white text-black placeholder-gray-500 p-2 text-sm rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white text-black placeholder-gray-500 p-2 text-sm rounded"
            />
            <button className="bg-black border border-white text-white px-4 py-2 rounded-md w-full text-base font-sans">
              Subscribe
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col items-start min-w-[240px] max-w-[260px]">
          <h3 className="text-lg font-bold mb-2">Suggestion Box</h3>
          <textarea
            placeholder="Have an NFL news source we should add, please let us know here"
            className="w-full bg-white text-black placeholder-gray-500 p-2 h-[76px] mb-2 text-sm rounded resize-none"
          ></textarea>
          <button className="bg-black border border-white text-white px-4 py-2 rounded-md w-full text-base font-sans">
            Submit
          </button>
        </div>

        {/* About */}
        <div className="flex flex-col items-start min-w-[140px]">
          <h3 className="text-lg font-bold mb-2">About</h3>
          <div className="flex flex-col space-y-1 text-sm">
            <a href="#" className="text-white hover:underline">Privacy Policy</a>
            <a href="#" className="text-white hover:underline">Terms of Use</a>
            <a href="#" className="text-white hover:underline">Advertise with Us</a>
            <a href="#" className="text-white hover:underline">Legal</a>
            <a href="#" className="text-white hover:underline">Site Map</a>
          </div>
        </div>
      </div>

      {/* Disclaimer and Bottom Line */}
      <div className="max-w-7xl mx-auto text-xs text-white pt-20">
        <p className="mb-4">
          DISCLAIMER: This site and the products offered are for entertainment purposes only, and there is no gambling offered on this site. This service is intended for adult audiences. No guarantees are made for any specific outcome. If you or someone you know has a gambling problem, please call 1-800-GAMBLER.
        </p>

        {/* Horizontal Divider */}
        <div className="border-t border-white my-4"></div>

        <p className="text-center">© 2025 Pro Football Report</p>
      </div>

    </footer>
  );
};

export default Footer;
