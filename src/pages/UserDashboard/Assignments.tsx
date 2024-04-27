import { useGetAllAssignmentsQuery } from "@/app/features/assignments/assignmentApi";
import DashboardWrapper from "@/lib/HOC/DashboardWrapper";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import Loader from "@/components/Loader";
import EmptyContainer from "@/components/EmptyContainer";

interface TableContentProps {
  _id: string;
  name: string;
  instructions: string;
  completionTime: string;
  createdAt: string;
  status: string;
  index: string;
}

const StatusSpan = ({ status }) => {
  return (
    <span
      className={`rounded-lg text-white px-2 py-1 text-xs ${
        status === 1 ? "bg-green-600" : status === 2 ? "bg-red-600" : "bg-black"
      }`}
    >
      {status === 1 ? "In Process" : status === 2 ? "Completed" : "Unknown"}
    </span>
  );
};

const TableSingleContent: React.FC<TableContentProps> = ({
  _id,
  name,
  completionTime,
  createdAt,
  status,
  index,
  amount,
}) => {
  return (
    <TableRow className="cursor-pointer h-14">
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>
        <StatusSpan status={status} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{amount ?? "Yet to be decided"}</TableCell>
      <TableCell>{new Date(createdAt).toDateString()}</TableCell>
      <TableCell>{new Date(completionTime).toDateString()}</TableCell>
      {/* <TableCell>
        <div className="flex items-center justify-center">
          <Pencil size={17} className="cursor-pointer" />
        </div>
      </TableCell> */}
    </TableRow>
  );
};

const Assignments = () => {
  const { isLoading, data } = useGetAllAssignmentsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full overflow-auto h-full">
      {data?.data?.data?.length > 0 ? (
        <Table className="w-max md:w-full">
          <TableHeader>
            <TableRow className="h-10 mb-10">
              <TableHead>Sr. No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignment Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Complete By</TableHead>
              {/* <TableHead>Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.data?.map((e, i) => {
              return <TableSingleContent key={i} {...e} index={i + 1} />;
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyContainer
          title="You have no assignments"
          desc="Get your Assignments and Projects Done."
          buttonText="Add assignment"
          buttonURL="/user/create-assignment"
        />
      )}
    </div>
  );
};

const NewAssignment = DashboardWrapper(
  Assignments,
  "List of Assignments",
  "Add Assignment",
  "/user/create-assignment"
);

export default NewAssignment;
