import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { logout } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { selectCartItemsCount } from "../../features/cart/cartSelectors";
import { useNavigation } from "react-router-dom";

import Logo from "../ui/Logo/Logo";
import Loader from "../ui/Loader/Loader";

import githubIcon from "../../assets/icons/github.svg";
import gitlabIcon from "../../assets/icons/gitlab.svg";
import gmailIcon from "../../assets/icons/gmail.svg.webp";

import supportIcon from "../../assets/icons/support.webp";
import locatorIcon from "../../assets/icons/locator.jpg";

function Navbar() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartItemsCount);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [hideLinks, setHideLinks] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    if (cartCount === 0) return;

    setCartBump(true);

    const timeout = setTimeout(() => {
      setCartBump(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [cartCount]);

  useEffect(() => {
    const SPEED_THRESHOLD = 9;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (!ticking.current) {
        ticking.current = true;

        requestAnimationFrame(() => {
          if (delta > SPEED_THRESHOLD) {
            setHideLinks(true);
          }

          if (delta < -SPEED_THRESHOLD) {
            setHideLinks(false);
          }

          lastScrollY.current = current;
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  const authLoading = useAppSelector((state) => state.auth.loading);
  const isLoading = authLoading || isNavigating;

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white -mb-10">
      {/* TOP BAR */}
      <div className="w-full px-10 flex justify-between text-[18px] pt-[20px] -mb-10 text-black">
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
            <img src={supportIcon} className="w-5 h-5 object-contain" />
            Customer service
          </div>

          <div className="flex items-center gap-2 hover:opacity-70 cursor-pointer">
            <img src={locatorIcon} className="w-6 h-6 object-contain" />
            Store locator
          </div>
        </div>
      </div>

      {/* LOGO ROW */}
      <div className="py-3 w-full flex justify-center pb-3">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {/* LINKS ROW */}
      <div
        className={`w-full flex justify-center overflow-hidden transition-all duration-500 ${
          hideLinks ? "max-h-0 opacity-0 pb-0" : "max-h-[80px] opacity-100 pb-3"
        }`}
      >
        <div className="flex items-center gap-10 text-[17px]">
          <a
            href="https://gitlab.com/shurik.ag.it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:opacity-60 transition"
          >
            <img src={gitlabIcon} className="w-5 h-5" />
            GitLab
          </a>

          <a
            href="https://github.com/SsoMiracle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:opacity-60 transition"
          >
            <img src={githubIcon} className="w-6 h-6" />
            GitHub
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shurik.ag.it@gmail.com&su=Ferrari%20Project&body=Hello"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:opacity-60 transition"
          >
            <img src={gmailIcon} className="w-4 h-3" />
            Gmail
          </a>
        </div>
      </div>

      {/* RIGHT SIDE*/}
      <div className="absolute top-[31px] right-10 flex items-center gap-8 text-[18px]">
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          {(isNavigating && <Loader />) || (isLoading && <Loader />)}
        </div>

        <Link
          to="/cart"
          className={`
    tracking-[0.18em]
    transition-all duration-300
    ${cartBump ? "scale-105" : "scale-100"}
  `}
        >
          CART{" "}
          <span
            className={`
      inline-block transition-all duration-300
      ${cartBump ? "text-red-600 scale-125" : ""}
    `}
          >
            {cartCount > 0 && `(${cartCount})`}
          </span>
        </Link>

        <button onClick={handleLogout} className="tracking-[0.18em]">
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
