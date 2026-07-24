export function Footer() {
  return (
    <footer className="bg-[#1A1816]">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <p className="text-[#F7F4F0] text-2xl font-extralight tracking-brand-lg uppercase mb-6">
              Sensol
            </p>
            <p className="text-[#8A8279] text-xs font-light leading-[1.9] max-w-xs">
              Redefining the role of fitness in modern living. Intelligent
              training systems that merge performance, technology, and spatial
              aesthetics. Founded 2022.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-6">
              {['Instagram', 'YouTube', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="link-underline text-[#8A8279] text-[9px] tracking-brand uppercase hover:text-[#F7F4F0]/60 transition-colors duration-500"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div className="md:col-span-2">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Products
            </p>
            <ul className="space-y-3">
              {['Sensol RS02', 'Sensol RS02 PRO', 'Sensol RS03', 'Sensol FLEX', 'Sensol FLEX AIR', 'Sensol FLEX PRO'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="link-underline text-[#F7F4F0]/50 text-xs font-light hover:text-[#F7F4F0]/80 transition-colors duration-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Company
            </p>
            <ul className="space-y-3">
              {['About', 'Senzine', 'Contact', 'Careers', 'Press', 'App'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="link-underline text-[#F7F4F0]/50 text-xs font-light hover:text-[#F7F4F0]/80 transition-colors duration-500"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
              Newsletter
            </p>
            <p className="text-[#F7F4F0]/40 text-xs font-light leading-[1.8] mb-6 max-w-xs">
              Subscribe for exclusive updates, early access to new products,
              and stories from the world of Sensol.
            </p>
            <div className="flex max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-[#2a2724] text-[#F7F4F0]/60 text-xs font-light px-4 py-3.5 placeholder:text-[#8A8279]/40 focus:outline-none focus:border-[#8A8279] transition-colors duration-500"
              />
              <button className="bg-[#F7F4F0] text-[#1A1816] text-[10px] tracking-brand uppercase px-5 py-3.5 hover:bg-[#F7F4F0]/90 transition-colors duration-500">
                Subscribe
              </button>
            </div>

            {/* Contact */}
            <div className="mt-8 pt-6 border-t border-[#2a2724]">
              <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-3">
                Contact
              </p>
              <p className="text-[#F7F4F0]/40 text-xs font-light">
                app.sensol@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2a2724]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8A8279]/60 text-[9px] tracking-brand uppercase">
            © 2024 Sensol. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Shipping', 'Returns'].map((item) => (
              <a
                key={item}
                href="#"
                className="link-underline text-[#8A8279]/60 text-[9px] tracking-brand uppercase hover:text-[#F7F4F0]/40 transition-colors duration-500"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
