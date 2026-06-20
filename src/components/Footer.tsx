import { Mail } from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import visaImg from "../assets/visa.png";
import mastercardImg from "../assets/mastercard.png";
import amexImg from "../assets/amex.png";
import jcbImg from "../assets/jcb.png";
import discoverImg from "../assets/discover.png";
import unionpayImg from "../assets/unionpay.png";
import bitcoinImg from "../assets/bitcoin.png";
import certifiedImg from "../assets/certified.png";

const Footer = () => {
  return (
    <footer className="bg-[#28B693] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h4 className="text-[#1DB38D] text-xl font-bold mb-5">
              About Us
            </h4>

            <a
              href="#"
              className="block text-white mb-3 hover:opacity-80"
            >
              Contact Us
            </a>

            <div className="flex items-center gap-2 mb-3 text-sm">
              <Mail size={15} />
              <span>info@ovza.com</span>
            </div>

            <p className="text-sm leading-7">
              <span className="font-semibold">
                Saint Vincent and the Grenadines:
              </span>
              <br />
              Euro House,
              <br />
              Richmond Hill Road,
              <br />
              Kingstown
            </p>

            <p className="text-sm mt-3">
              <span className="font-semibold">LEI:</span>{" "}
              984500F5FIDE5E483F62
            </p>

            {/* Payment Methods */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-2 flex-wrap">
                <img src={visaImg} alt="Visa" className="h-10 rounded" />
                <img
                  src={mastercardImg}
                  alt="Mastercard"
                  className="h-10 rounded"
                />
                <img src={amexImg} alt="Amex" className="h-10 rounded" />
              </div>

              <div className="flex gap-2 flex-wrap">
                <img src={jcbImg} alt="JCB" className="h-10 rounded" />
                <img
                  src={discoverImg}
                  alt="Discover"
                  className="h-10 rounded"
                />
                <img
                  src={unionpayImg}
                  alt="UnionPay"
                  className="h-10 rounded"
                />
              </div>

              <img
                src={bitcoinImg}
                alt="Bitcoin"
                className="h-12 object-contain"
              />
            </div>

            <p className="mt-8 text-sm">
              © 2026 OVZA – Copyright All Rights Reserved
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#1DB38D] text-xl font-bold mb-5">
              Our Services
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-80">
                  Offshore Incorporation
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Banking Support
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Document Notarization
                </a>
              </li>
            </ul>

            <h4 className="text-[#1DB38D] text-xl font-bold mt-10 mb-5">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-80">
                  Country Guides
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Booklets
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Offshore Law Library
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-[#1DB38D] text-xl font-bold mb-5">
              Terms & Policies
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:opacity-80">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Refund Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Anti Bribery Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:opacity-80">
                  Affiliate Program Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#1DB38D] text-xl font-bold mb-5">
              Follow Us
            </h4>

            <div className="flex items-center gap-5 text-2xl mb-8">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="hover:opacity-80 transition" />
              </a>

              <a href="#" aria-label="X">
                <FaXTwitter className="hover:opacity-80 transition" />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="hover:opacity-80 transition" />
              </a>

              <a href="#" aria-label="YouTube">
                <FaYoutube className="hover:opacity-80 transition" />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram className="hover:opacity-80 transition" />
              </a>
            </div>

            <img
              src={certifiedImg}
              alt="Certified"
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-xl md:text-2xl font-light">
            Proudly Rooted in St. Vincent and the Grenadines 🇻🇨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;