import { useState } from "react";
import heroImg from "../../assets/hero.png";
import heroStart from "../../assets/herostart.png";

const countries = [
  "BVI",
  "Cayman Islands",
  "Seychelles",
  "Panama",
  "Hong Kong",
  "Singapore",
  "UAE",
  "Marshall Islands",
  "Belize",
  "Gibraltar",
];

const LEIBadge = () => (
  <div className="bg-white rounded-full px-8 py-3 shadow-lg flex items-center gap-3">
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

const ChatWidget = () => (
  <div className="bg-white rounded-xl shadow-xl overflow-hidden w-[170px]">
    <button className="w-full flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:bg-gray-50">
      <svg
        className="w-4 h-4 text-[#72D0C0]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.721C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>

      <span>Chat with us</span>
    </button>

    <div className="border-t border-gray-100" />

    <button className="w-full flex items-center gap-3 px-4 py-4 text-sm text-gray-600 hover:bg-gray-50">
      <svg
        className="w-4 h-4 text-[#72D0C0]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>

      <span>Call Us</span>
    </button>
  </div>
);

const HeroSection = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [companyName, setCompanyName] = useState("");

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>

      <section className="relative overflow-hidden bg-[#72D0C0] min-h-[720px] flex items-center justify-center">

        {/* Right Decoration */}
        <img
          src={heroStart}
          alt=""
          className="absolute right-0 top-0 h-full object-contain opacity-60 pointer-events-none"
        />

        {/* Bottom Decoration */}
        <img
          src={heroImg}
          alt=""
          className="absolute bottom-0 left-0 w-[320px] opacity-20 pointer-events-none"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          {/* Title */}
          <h1
            className="
              max-w-5xl
              mx-auto
              text-[#0F131E]
              font-semibold
              leading-[1.05]
              text-[42px]
              md:text-[64px]
            "
            style={{
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Register an Offshore Company with
            <br />
            OVZA's International Solutions
          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-4xl
              mx-auto
              text-[18px]
              text-[#0F131E]/80
              leading-[1.8]
            "
            style={{
              fontFamily: "Poppins, sans-serif",
            }}
          >
            OVZA specializes in offshore company formation and assists clients
            with applying for corporate offshore bank accounts.
          </p>

          {/* CTA Pill */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-10 py-3 shadow-md">
              <span className="text-[#0F131E]">
                Ready to incorporate offshore?{" "}
              </span>

              <a
                href="#"
                className="font-semibold underline text-[#0F131E]"
              >
                Begin Here!
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-[1050px] mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col md:flex-row">

              {/* Country */}
              <div className="relative md:w-[220px] border-r border-gray-200">
                <select
                  value={selectedCountry}
                  onChange={(e) =>
                    setSelectedCountry(e.target.value)
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    text-sm
                    text-gray-500
                    bg-transparent
                    appearance-none
                    outline-none
                  "
                >
                  <option value="">
                    Select Country
                  </option>

                  {countries.map((country) => (
                    <option
                      key={country}
                      value={country}
                    >
                      {country}
                    </option>
                  ))}
                </select>

                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                placeholder="Type your desired company name here"
                className="
                  flex-1
                  px-5
                  py-3
                  text-sm
                  outline-none
                  text-gray-700
                "
              />

              {/* Button */}
              <button
                className="
                  bg-[#22C55E]
                  hover:bg-[#16A34A]
                  text-white
                  text-sm
                  font-medium
                  px-8
                  py-3
                  rounded-xl
                  transition-all
                "
              >
                Register Your Company
              </button>
            </div>
          </div>

          {/* LEI Badge */}
          <div className="mt-10 flex justify-center">
            <LEIBadge />
          </div>

          {/* Countries */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <span
              className="font-semibold text-[#0F131E]"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Supported Countries
            </span>

            <svg
              className="w-4 h-4 text-[#0F131E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Chat Widget */}
        <div className="hidden lg:block absolute right-8 bottom-16">
          <ChatWidget />
        </div>

        {/* Bottom Arrow */}
        <button
          className="
            hidden lg:flex
            absolute
            right-10
            bottom-4
            w-12
            h-12
            rounded-full
            bg-[#63C8B8]
            text-white
            shadow-lg
            items-center
            justify-center
          "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </section>
    </>
  );
};

export default HeroSection;