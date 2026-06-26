import { useState } from "react";
import heroImg from "../../assets/hero.png";
import heroStart from "../../assets/herostart.png";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

const countries = [
  { value: "VG", label: "BVI" },
  { value: "KY", label: "Cayman Islands" },
  { value: "SC", label: "Seychelles" },
  { value: "PA", label: "Panama" },
  { value: "HK", label: "Hong Kong" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "UAE" },
  { value: "MH", label: "Marshall Islands" },
  { value: "BZ", label: "Belize" },
  { value: "GI", label: "Gibraltar" },
];
const LEIBadge = () => (
  <div className="bg-white rounded-full px-8 py-3 shadow-lg flex items-center gap-3 animate-float">
    <div className="w-10 h-10 rounded-full bg-[#72D0C0] flex items-center justify-center">
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <div className="text-left">
      <div className="text-[28px] font-bold leading-none text-[#68C788]">
        LEI
      </div>

      <div className="text-[11px] text-gray-500">
        Registered
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [companyName, setCompanyName] = useState("");

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

          /* ── Entrance animations ── */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* ── Ambient / loop animations ── */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-8px); }
          }
          @keyframes pulse-ring {
            0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
            70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
            100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
          }
          @keyframes shimmer {
            0%   { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes driftRight {
            0%, 100% { transform: translateX(0px) scale(1); }
            50%       { transform: translateX(6px) scale(1.01); }
          }
          @keyframes driftLeft {
            0%, 100% { transform: translateX(0px) scale(1); }
            50%       { transform: translateX(-6px) scale(1.01); }
          }
          @keyframes bobDown {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(4px); }
          }

          /* Utility classes */
          .animate-fade-up-1  { animation: fadeUp 0.7s ease both; animation-delay: 0.05s; }
          .animate-fade-up-2  { animation: fadeUp 0.7s ease both; animation-delay: 0.20s; }
          .animate-fade-up-3  { animation: fadeUp 0.7s ease both; animation-delay: 0.35s; }
          .animate-fade-up-4  { animation: fadeUp 0.7s ease both; animation-delay: 0.50s; }
          .animate-fade-up-5  { animation: fadeUp 0.7s ease both; animation-delay: 0.65s; }
          .animate-fade-up-6  { animation: fadeUp 0.7s ease both; animation-delay: 0.80s; }
          .animate-fade-up-7  { animation: fadeUp 0.7s ease both; animation-delay: 0.95s; }

          .animate-float      { animation: float 4s ease-in-out infinite; }
          .animate-drift-r    { animation: driftRight 9s ease-in-out infinite; }
          .animate-drift-l    { animation: driftLeft  9s ease-in-out infinite; }
          .animate-bob        { animation: bobDown 2s ease-in-out infinite; }

          /* CTA pill subtle pulse */
          .cta-pill           { animation: pulse-ring 2.8s ease-out infinite; }

          /* Search bar shimmer on idle */
          .search-shimmer::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 1rem;
            pointer-events: none;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.55) 50%,
              transparent 100%
            );
            background-size: 400px 100%;
            animation: shimmer 3.5s linear infinite;
          }

          /* Register button hover lift */
          .register-btn {
            transition: background-color 0.2s ease, transform 0.18s ease, box-shadow 0.18s ease;
          }
          .register-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(34,197,94,0.38);
          }
          .register-btn:active {
            transform: translateY(0);
          }

          /* Country chevron hover */
          .country-link svg {
            transition: transform 0.25s ease;
          }
          .country-link:hover svg {
            transform: rotate(180deg);
          }

          /* Reduced-motion safety */
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
          }
        `}
      </style>

      <section className="relative overflow-hidden bg-[#72D0C0] min-h-[720px] flex items-center justify-center py-16 md:py-0">

        {/* Right Decoration — drifts gently */}
        <img
          src={heroStart}
          alt=""
          className="animate-drift-r absolute right-0 top-0 h-3/4 object-contain opacity-60 pointer-events-none"
        />

        {/* Bottom Decoration — drifts opposite */}
        <img
          src={heroImg}
          alt=""
          className="animate-drift-l absolute bottom-0 left-0 w-[220px] sm:w-[280px] md:w-[320px] opacity-20 pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">

          {/* Title */}
          <h1
            className="
              animate-fade-up-1
              max-w-7xl
              mx-auto
              text-[#0F131E]
              font-medium
              leading-[1.05]
              text-[30px]
              sm:text-[42px]
              md:text-[56px]
              lg:text-[64px]
            "
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Register an Offshore Company with
            <br className="hidden sm:block" />
            OVZA's International Solutions
          </h1>

          {/* Description */}
          <p
            className="
              animate-fade-up-2
              mt-6 md:mt-8
              max-w-5xl
              mx-auto
              text-[15px]
              sm:text-[17px]
              md:text-[18px]
              text-[#0F131E]/80
              leading-[1.8]
              px-2
            "
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            OVZA specializes in offshore company formation and assists clients
            with applying for corporate offshore bank accounts.
          </p>

          {/* CTA Pill */}
          <div className="animate-fade-up-3 mt-8 md:mt-10 flex justify-center">
            <div className="cta-pill bg-white/60 backdrop-blur-sm rounded-full px-6 sm:px-10 py-3 shadow-md">
              <span className="text-[#0F131E] text-sm sm:text-base">
                Ready to incorporate offshore?{" "}
              </span>

              <a
                href="#"
                className="font-semibold underline text-[#0F131E] text-sm sm:text-base"
              >
                Begin Here!
              </a>
            </div>
          </div>

          {/* Search Bar */}
<div className="animate-fade-up-4 mt-8 md:mt-10 max-w-[1450px] mx-auto">

  <div className="bg-white rounded-[28px] shadow-2xl p-4 flex flex-col lg:flex-row items-center gap-4">

    {/* Country */}
    <div className="w-full lg:w-[320px]">

      <Select
        value={selectedCountry}
        onChange={(option) => setSelectedCountry(option!)}
        options={countries}
        isSearchable={false}
        formatOptionLabel={(country) => (
          <div className="flex items-center gap-3">
            <ReactCountryFlag
              countryCode={country.value}
              svg
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
              }}
            />

            <span className="text-[18px] text-[#0F131E]">
              {country.label}
            </span>
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            height: 58,
            borderRadius: 16,
            borderColor: "#DADADA",
            boxShadow: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: 14,
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#4B5563",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: 16,
            overflow: "hidden",
          }),
        }}
      />

    </div>

    {/* Input */}

    <input
      type="text"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      placeholder="Type your desired company name here"
      className="
      flex-1
      h-[58px]
      border
      border-gray-300
      rounded-2xl
      px-6
      text-[18px]
      outline-none
      focus:border-[#22C55E]
      "
    />

    {/* Button */}

    <button
      className="
      register-btn
      w-full
      lg:w-[310px]
      h-[58px]
      rounded-2xl
      bg-[#22C55E]
      hover:bg-[#18B35B]
      text-white
      text-[20px]
      font-semibold
      transition-all
      "
    >
      Register Your Company
    </button>

  </div>

</div>

          {/* LEI Badge */}
          <div className="animate-fade-up-5 mt-8 md:mt-10 flex justify-center">
            <LEIBadge />
          </div>

          {/* Countries */}
          <div className="animate-fade-up-6 mt-6 md:mt-8 flex justify-center items-center gap-2 country-link cursor-pointer">
            <span
              className="font-semibold text-[#0F131E] text-sm sm:text-base"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Supported Countries
            </span>

            <svg
              className="animate-bob w-4 h-4 text-[#0F131E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Chat Widget placeholder */}
        <div className="hidden lg:block absolute right-8 bottom-16" />
      </section>
    </>
  );
};

export default HeroSection;