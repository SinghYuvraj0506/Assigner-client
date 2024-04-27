import { NavbarMain } from "@/components/Navbar";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ChevronRight, Instagram, Mail } from "lucide-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import mixpanel from "mixpanel-browser";

interface PersonProps {
  name: string;
  profile: string;
  instaLink: string;
  linkedinLink: string;
  email: string;
}

const PersonCard: React.FC<PersonProps> = ({
  name,
  instaLink,
  linkedinLink,
  email,
  profile,
}) => {
  const handleInsta = () => {
    window.open(instaLink);
    mixpanel.track("Clicked instagram of" + name)
  };

  const handleLinkedin = () => {
    window.open(linkedinLink);
    mixpanel.track("Clicked linkedin of" + name)
  };

  const handleEmail = () => {
    window.open("mailto:" + email);
    mixpanel.track("Clicked email of" + name)
  };

  return (
    <Card className="w-[300px]">
      <CardHeader className="flex items-center flex-col gap-4">
        <LazyLoadImage
          alt=""
          src={profile ?? "https://github.com/shadcn.png"} // use normal <img> attributes as props
          className="w-32 h-32 rounded-full object-cover"
        />

        <CardTitle className="text-xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div
            className="p-2 rounded-full cursor-pointer bg-black text-white flex items-center gap-2 justify-start pl-4 box-border relative"
            onClick={handleInsta}
          >
            <Instagram size={15} /> Instagram{" "}
            <ChevronRight size={20} className="absolute right-4" />
          </div>
          <div
            className="p-2 rounded-full cursor-pointer bg-black text-white flex items-center gap-2 justify-start pl-4 box-border relative"
            onClick={handleLinkedin}
          >
            <LinkedInLogoIcon size={15} /> Linkedin{" "}
            <ChevronRight size={20} className="absolute right-4" />
          </div>
          <div
            className="p-2 rounded-full cursor-pointer  bg-black text-white flex items-center gap-2 justify-start pl-4 box-border relative"
            onClick={handleEmail}
          >
            <Mail size={15} /> Email{" "}
            <ChevronRight size={20} className="absolute right-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Contact: React.FC = () => {
  return (
    <div className="w-full pb-20">
      <NavbarMain />
      <div className="w-full flex items-center flex-col gap-10 justify-center h-max pt-10 sm:p-0 sm:h-[80vh] font-inter">
        <div className="flex flex-col gap-3 sm:gap-5 items-center text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">Contact Us</h1>
          <p className="text-sm sm:text-lg w-5/6">
            Have any questions? We'd love to year from you.
          </p>
        </div>

        <div className="flex items-center gap-8 sm:gap-32 flex-col sm:flex-row">
          <PersonCard
            name="Yuvraj Singh"
            instaLink="https://www.instagram.com/ssinghyuvraj02/"
            linkedinLink="https://www.linkedin.com/in/singh-yuvraj002/"
            email="singhyuvraj0506@gmail.com"
            profile="https://res.cloudinary.com/drip0dev6/image/upload/v1713583937/Screenshot_2024-04-20_at_9.02.06_AM_c17lpn.png"
          />
            <PersonCard
              name="Jyoti Kumari"
              instaLink="https://www.instagram.com/__itz_jyotiii__/"
              linkedinLink="https://www.linkedin.com/in/jyotikumari2007/"
              email="singhhjyoti0705@gmail.com"
              profile="https://res.cloudinary.com/drip0dev6/image/upload/v1714236114/Screenshot_2024-04-27_at_10.11.44_PM_m0voxj.png"
            />
          <PersonCard
            name="Jatin Jayant"
            instaLink="https://www.instagram.com/jatin_jayant_/"
            linkedinLink="https://www.linkedin.com/in/jatin-jayant-22459a22b/"
            email="jatinjayant06@gmail.com"
            profile="https://res.cloudinary.com/drip0dev6/image/upload/v1713583700/Screenshot_2024-04-20_at_8.58.10_AM_x0fvxk.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
