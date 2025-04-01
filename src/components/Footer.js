const Footer = () => {
    return (
      <footer className="bg-[#0B0B12] text-white py-6 mt-10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left: Branding */}
          <p className="text-sm">&copy; {new Date().getFullYear()} ProFootball News. All rights reserved.</p>
          
          {/* Right: Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#f5da9f] transition-all duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#f5da9f] transition-all duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-[#f5da9f] transition-all duration-200">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  