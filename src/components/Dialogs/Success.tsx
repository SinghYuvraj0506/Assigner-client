import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const Success: React.FC = () => {

  return (
    <Card className="mx-auto w-[85vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
      <CardHeader>
        <CardTitle className="text-xl">Sucessfully Created Assignment</CardTitle>
        <CardDescription>
          We will reach out to you soon.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};



export default Success;
