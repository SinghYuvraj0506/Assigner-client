import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-black py-5 font-inter flex items-center flex-col gap-5">
      <section className="px-10 py-5 flex items-center sm:items-start justify-between w-full flex-col sm:flex-row gap-10">
        <span
          className="text-4xl font-bold  cursor-pointer hover:text-primary-green text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          assigner.
        </span>

        <section className="text-white flex gap-6 items-center sm:hidden">
          {location.pathname !== "/pricing" && (
            <span
              className="cursor-pointer text-[16px]"
              onClick={() => {
                navigate("/pricing");
              }}
            >
              Pricing
            </span>
          )}
          {location.pathname !== "/contact" && (
            <span
              className="cursor-pointer text-[16px]"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact
            </span>
          )}
          <span
            className="cursor-pointer text-[16px]"
            onClick={() => {
              window.open("https://forms.gle/2FYMWrPM2Tj6EUkJ6");
            }}
          >
            Join Us
          </span>
        </section>

        <section className="flex items-center justify-center gap-5">
          <span className="p-2 bg-white rounded-full cursor-pointer hover:bg-primary-green hover:text-white">
            <Instagram />
          </span>
          <span className="p-2 bg-white rounded-full cursor-pointer hover:bg-primary-green hover:text-white">
            <Linkedin />
          </span>
          <span className="p-2 bg-white rounded-full cursor-pointer hover:bg-primary-green hover:text-white">
            <Twitter />
          </span>
        </section>
      </section>

      <section className="w-full flex flex-col gap-2 items-center sm:items-end justify-center text-white py-2 px-10 box-border text-xs sm:text-sm">
        © Assigner, 18th April 2024
      </section>
    </div>
  );
};

export default Footer;
