import EmptyContainer from "@/components/EmptyContainer";
import DashboardWrapper from "@/lib/DashboardWrapper";

const Dashboard = () => {
  return (
    <>
      <EmptyContainer
        title="You have no assignments"
        desc="Get your Assignments and Projects Done."
        buttonText="Add assignment"
        buttonURL="/user/create-assignment"
      />
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
