import { useGetInstitesQuery } from "@/app/features/api/apiSlice";
import { useUpdateUserMutation } from "@/app/features/auth/authApi";
import SearchDropdown from "@/components/SearchDropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DashboardWrapper from "@/lib/HOC/DashboardWrapper";
import useApiFeedback from "@/lib/hooks/useApiFeedback";
import useAuth from "@/lib/hooks/useAuth";
import { EditProfileSchema } from "@/schemas/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const Profile = () => {
  const { user } = useAuth();

  const { error:instituteError, data: InstitutesData } = useGetInstitesQuery({});

  const [updateUser, {isLoading,isSuccess,error,data}] = useUpdateUserMutation()

  useEffect(() => {
    if(instituteError){
      toast.error("Some error occured, Reload Page Again!!")
    }
  }, [instituteError])
  

  useApiFeedback(
    isSuccess,
    isLoading,
    error,
    data?.message || "Profile Updated Successfully",
    undefined,
    error?.data?.message || "Something went wrong"
  );

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      fullName: "",
      email:"",
      phone: "",
      institute: "",
      location: {},
    },
  });

  useEffect(() => {
    form.setValue("fullName", user?.fullName ?? "");
    form.setValue("email", user?.email ?? "");
    form.setValue("phone", user?.phone?.toString() ?? "");
    form.setValue("institute", user?.institute?._id ?? "");
    form.setValue("location", user?.location ?? {});
  }, [user]);

  const detectLocation = async () => {
    mixpanel.track("Detect Loaction clicked")
    const load = toast.loading("Detecting Please Wait....");
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      toast.dismiss(load);
      toast.success("Found your location");
      form.setValue("location", { latitude, longitude });
      form.clearErrors();
    };

    const errorCallback = (error: GeolocationPositionError) => {
      toast.dismiss(load);
      if (error?.message === "User denied Geolocation") {
        toast.error("Please allow access to you location");
      } else {
        toast.error("Could detect the location try again");
      }
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const onSubmit = async (values: z.infer<typeof EditProfileSchema>) => {
    mixpanel.track("Update profile clicked")
    
    await updateUser(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-3/4 h-full flex flex-col gap-8 "
      >
        <div className="grid grid-rows-1 md:grid-cols-2 gap-y-10 md:gap-x-10 ">
          <FormField
            name="fullName"
            control={form?.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Snow" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form?.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johnsnow@got.com" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form?.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="9132323..." type="number" {...field} />
                </FormControl>
                <FormDescription>Whatsapp Number is Preferred</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="institute"
            control={form?.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institute Name</FormLabel>
                <FormControl>
                  <SearchDropdown
                    placeholder="Select your college name"
                    setCurrentValue={(e) => {
                      form.setValue("institute", e);
                    }}
                    dropDownList={InstitutesData?.data}
                    currentValue={form.getValues("institute")}
                  />
                </FormControl>
                <FormDescription>
                  Not found your institute.{" "}
                  <span
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => {
                      window.open("/contact");
                    }}
                  >
                    Contact Us
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start w-full justify-between">
            <FormField
              name="location"
              control={form?.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Location</FormLabel>
                  <FormDescription>
                    We need you location to find your <br /> nearest assignee.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button onClick={detectLocation} type="button">
              {form?.getValues("location")
                ? "Change Location"
                : "Detect Location"}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <Button type="submit" className="w-max">
            Save Details
          </Button>
        </div>
      </form>
    </Form>
  );
};

const NewComponent = DashboardWrapper(Profile, "Profile");

export default NewComponent;
