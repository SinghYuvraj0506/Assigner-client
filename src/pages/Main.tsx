import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import Footer from "@/components/Footer";
import { NavbarMain } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { CirclePlus, LineChart, MessageSquareMore, Truck } from "lucide-react";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full h-full bg-[#fffffd]">
      <NavbarMain />
      <div className="w-full px-4 sm:px-10 flex flex-col items-center mb-10">
        <div className="w-full flex items-center justify-between h-[80vh] font-inter">
          <section className="flex flex-col sm:items-start items-center text-center sm:text-left justify-center gap-5 sm:gap-8 w-full">
            <h1 className="text-4xl md:text-8xl font-medium">
              Get Your{" "}
              <span className="font-bold text-primary-green">assignments</span>{" "}
              done
            </h1>

            <p className="text-sm sm:text-xl w-5/6 sm:w-1/2 font-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
              iusto.
            </p>

            <Button
              onClick={() => {
                isAuthenticated
                  ? navigate("/user/create-assignment")
                  : dispatch(ChangeModalStatus({ value: true, type: "Login" }));
              }}
            >
              Assign your work
            </Button>
          </section>

          <img src="public/heroImage.png" alt="" className="h-[30vh] sm:h-[70vh] hidden" />
        </div>

        <div className="py-20">
          <section className="grid grid-cols-2 gap-2 w-full">
            <div className="circle_card_main_page bg-white hover:bg-primary-green rounded-tl-full hover:rounded-lg pl-5 pt-5 sm:pl-10 sm:pt-10 box-border">
              <CirclePlus className="text-primary-green"/> 
              <h2 className="text-lg sm:text-2xl font-bold text-primary-green w-3/4 leading-tight md:leading-8">
              Assign Your Work
              </h2>
              <p className="hidden w-full text-xs sm:text-sm sm:w-5/6 leading-tight md:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                iusto? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, sit?
              </p>
            </div>

            <div className="circle_card_main_page bg-[#34b5514f] hover:bg-primary-green rounded-tr-full hover:rounded-lg pr-5 pt-5 sm:pr-10 sm:pt-10">
              <LineChart className="text-primary-green"/> 
              <h2 className="text-lg sm:text-2xl font-bold text-primary-green w-3/4 leading-tight md:leading-8">
              Track Assignment
              </h2>
              <p className="hidden w-full text-xs sm:text-sm sm:w-5/6 leading-tight md:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                iusto? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, sit?
              </p>
            </div>

            <div className="circle_card_main_page bg-[#34b5514f] hover:bg-primary-green rounded-bl-full hover:rounded-lg pb-5 pl-0.5 sm:pb-10 sm:pl-10">
              <MessageSquareMore className="text-primary-green"/> 
              <h2 className="text-lg sm:text-2xl font-bold text-primary-green w-3/4 leading-tight md:leading-8">
              Get Whatsapp Updates
              </h2>
              <p className="hidden w-full text-xs sm:text-sm sm:w-5/6 leading-tight md:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                iusto? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, sit?
              </p>
            </div>

            <div className="circle_card_main_page bg-white hover:bg-primary-green rounded-br-full hover:rounded-lg pb-5 pr-5 sm:pb-10 sm:pr-10">
            <Truck className="text-primary-green"/> 
              <h2 className="text-lg sm:text-2xl font-bold text-primary-green w-1/2 leading-tight md:leading-8">
              Get Delivered
              </h2>
              <p className="hidden w-full text-xs sm:text-sm sm:w-5/6 leading-tight md:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                iusto? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, sit?
              </p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Main;
