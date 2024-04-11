import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = (
  OldComponent: React.FC,
  headingTitle: string,
  buttonText?: string,
  buttonUrl?: string
) => {
  const EnhancedDashboard: React.FC = (props) => {
    const navigate = useNavigate()
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{headingTitle}</h1>
          {buttonText && (
            <Button
              className="ml-auto"
              onClick={() => {
                buttonUrl && navigate(buttonUrl);
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>

        <OldComponent {...props} />
      </main>
    );
  };

  return EnhancedDashboard;
};

export default DashboardWrapper;
