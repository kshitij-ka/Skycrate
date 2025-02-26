const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#689adc] via-[#6da1e6] h-[353px] w-full pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="text-cyan-400 mr-3">
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 12L12 22L22 12L12 2Z"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-black">Drive-thru</h1>
        </div>
        <p className="text-black text-center">
          About | Privacy Policy | Terms of Service | Contact@
          {new Date().getFullYear()} Drive-Thru. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
