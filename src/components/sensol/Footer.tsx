export function Footer() {
  return (
    <footer className="bg-[#1A1816] border-t border-[#2a2724]">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-[#F7F4F0] text-xl font-light tracking-brand-lg uppercase mb-6">
              Sensol
            </p>
            <p className="text-[#8A8279] text-xs font-light leading-[1.8] max-w-xs">
              Redefining the role of fitness in modern living. Intelligent
              training systems that merge performance, technology, and spatial
              aesthetics.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Products
            </p>
            <ul className="space-y-3">
              {['Sensol RS02', 'Sensol RS02 PRO', 'Sensol RS03', 'Sensol FLEX', 'Sensol FLEX AIR'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="link-underline text-[#F7F4F0]/60 text-xs font-light hover:text-[#F7F4F0] transition-colors duration-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Company
            </p>
            <ul className="space-y-3">
              {['About', 'Senzine', 'Contact', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="link-underline text-[#F7F4F0]/60 text-xs font-light hover:text-[#F7F4F0] transition-colors duration-500"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Connect
            </p>
            <ul className="space-y-3">
              {['Instagram', 'YouTube', 'LinkedIn', 'Newsletter'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="link-underline text-[#F7F4F0]/60 text-xs font-light hover:text-[#F7F4F0] transition-colors duration-500"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-3">
                Newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-[#2a2724] text-[#F7F4F0]/60 text-xs font-light px-4 py-3 placeholder:text-[#8A8279]/50 focus:outline-none focus:border-[#8A8279] transition-colors duration-500"
                />
                <button className="bg-[#F7F4F0] text-[#1A1816] text-[10px] tracking-brand uppercase px-4 py-3 hover:bg-[#F7F4F0]/90 transition-colors duration-500">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2724]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8A8279] text-[9px] tracking-brand uppercase">
            © 2024 Sensol. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="link-underline text-[#8A8279] text-[9px] tracking-brand uppercase hover:text-[#F7F4F0]/60 transition-colors duration-500">
              Privacy
            </a>
            <a href="#" className="link-underline text-[#8A8279] text-[9px] tracking-brand uppercase hover:text-[#F7F4F0]/60 transition-colors duration-500">
              Terms
            </a>
            <a href="#" className="link-underline text-[#8A8279] text-[9px] tracking-brand uppercase hover:text-[#F7F4F0]/60 transition-colors duration-500">
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
