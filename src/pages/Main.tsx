import { ChangeModalStatus } from "@/app/features/general/GeneralSlice";
import { NavbarMain } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full h-full bg-[#fffffd]">
      <NavbarMain />

      <div className="w-full flex items-center justify-between h-[90vh] font-inter px-10">
        <section className="flex flex-col items-start justify-center  gap-8 ">
          <h1 className="text-8xl font-medium">
            Get Your{" "}
            <span className="font-bold text-primary-green">assignments</span>{" "}
            done
          </h1>

          <p className="text-xl w-1/2 font-medium">
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
            Create Assignment
          </Button>
        </section>

        <img src="public/heroImage.png" alt="" className="h-[70vh]" />
      </div>
    </div>
  );
};

export default Main;
