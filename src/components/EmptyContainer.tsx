import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import mixpanel from "mixpanel-browser";

interface EmptyContainerProps{
    title:string,
    desc?:string,
    buttonText?:string,
    buttonURL?:string
}

const EmptyContainer: React.FC<EmptyContainerProps> = ({title,desc,buttonText,buttonURL}) => {
    const navigate = useNavigate()
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
            {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {desc}
        </p>
       {buttonText && <Button className="mt-4" onClick={()=>{buttonURL && navigate(buttonURL); mixpanel.track("Button Clicked in Empty Conatiner" + buttonText)}}>{buttonText}</Button>}
      </div>
    </div>
  );
};

export default EmptyContainer;
