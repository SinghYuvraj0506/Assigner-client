import { useGetAllAssignmentsQuery } from "@/app/features/assignments/assignmentApi";
import EmptyContainer from "@/components/EmptyContainer";
import DashboardWrapper from "@/lib/HOC/DashboardWrapper";
import { Loader } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { StatusSpan } from "./Assignments";
import { Assignment } from "@/lib/constants";

const AssignmentCard: React.FC<Assignment> = ({ name, status, files,amount,completionTime }) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <StatusSpan status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full box-border">
          <Carousel>
            <CarouselContent>
              {files?.map((file, index) => {
                return (
                  <CarouselItem className="flex items-center justify-center flex-col">
                    <img
                      src={file?.fileType !== "application/pdf" ? file?.fileUrl : "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w"}
                      alt=""
                      className="object-contain w-full max-h-[300px]"
                    />
                    {file?.fileType === "application/pdf" && <span className="mx-auto text-sm w-full">{file?.fileName?.length > 30 ? file?.fileName.slice(0,30) + "..." : file?.fileName}</span>}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-5" />
            <CarouselNext className="-right-5" />
          </Carousel>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-col items-start gap-2">
        <CardDescription>{status === 2 ? "Completed by" : "Get Assignment by"} : {new Date(completionTime).toDateString()} </CardDescription>
        <CardDescription>Amount : {amount ?? "Not Confirmed"}</CardDescription>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const { isLoading, data } = useGetAllAssignmentsQuery({
    page: 1,
    limit: 3,
    status: 1,
    sortBy: "createdAt",
    sortType: "desc",
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data?.data?.count === 0 ? (
        <EmptyContainer
          title="You have no assignments"
          desc="Get your Assignments and Projects Done."
          buttonText="Add assignment"
          buttonURL="/user/create-assignment"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 ">
          {data?.data?.data?.map((e, index) => {
            return <AssignmentCard {...e} />;
          })}
        </div>
      )}
    </>
  );
};

const NewDashboard = DashboardWrapper(
  Dashboard,
  "Dashboard",
  "Add Assignment",
  "/user/create-assignment"
);

export default NewDashboard;
