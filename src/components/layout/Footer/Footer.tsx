import instagramIcon from "../../../assets/icons/Instagram_logo.svg.png";
import facebookIcon from "../../../assets/icons/facebook_icon.svg.png";
import xIcon from "../../../assets/icons/X_icon.svg.png";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 🔝 GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* STORE */}
          <div>
            <h3 className="text-white mb-6 text-sm tracking-widest">STORE</h3>
            <ul className="space-y-3 text-sm">
              {["Catalog", "New arrivals", "Best sellers"].map((item) => (
                <li key={item}>
                  <span className="group inline-block cursor-pointer">
                    <span className="transition group-hover:text-white">
                      {item}
                    </span>
                    <span className="block h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white mb-6 text-sm tracking-widest">SUPPORT</h3>
            <ul className="space-y-3 text-sm">
              {["Delivery", "Returns", "Contacts"].map((item) => (
                <li key={item}>
                  <span className="group inline-block cursor-pointer">
                    <span className="transition group-hover:text-white">
                      {item}
                    </span>
                    <span className="block h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white mb-6 text-sm tracking-widest">LEGAL</h3>
            <ul className="space-y-3 text-sm">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <li key={item}>
                  <span className="group inline-block cursor-pointer">
                    <span className="transition group-hover:text-white">
                      {item}
                    </span>
                    <span className="block h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* LOCATION */}
          <div>
            <h3 className="text-white mb-6 text-sm tracking-widest">
              LOCATION
            </h3>
            <p className="text-sm">Germany</p>
            <p className="text-sm mt-2">Language: English</p>
          </div>
        </div>

        {/* 🔻 BOTTOM */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-gray-500">
            © 2026 Ferrari Concept. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="group">
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-300"
              />
            </a>

            <a href="#" className="group">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-300"
              />
            </a>

            <a href="#" className="group">
              <img
                src={xIcon}
                alt="X"
                className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
