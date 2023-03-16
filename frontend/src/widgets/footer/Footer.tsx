import { v4 as uuidv4 } from 'uuid';

import {
  GoogleIcon,
  LinkedInIcon,
  FaceBookIcon,
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
  CopyRightIcon,
} from "@/components/icons/Icons";

const Footer = () => {
  const date = new Date();
  const socialIcons = [
    { id: uuidv4(), icon: <GoogleIcon /> },
    { id: uuidv4(), icon: <LinkedInIcon /> },
    { id: uuidv4(), icon: <FaceBookIcon /> },
  ];

  return (
    <footer className="arbitrary text-center  text-white">
      <div className="container px-6 pt-6">
        <div className="flex justify-center space-x-6">
          {socialIcons?.map((social) => {
            return (
              <a
                key={social.id}
                href="#!"
                type="button"
                className="rounded-full border-2 leading-normal uppercase hover:bg-blue-100 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
              >
                {social.icon}
              </a>
            );
          })}
        </div>
      </div>

      <div
        className="justify-center mt-8 p-4 flex "
        style={{
          color: "rgb(143, 189, 142) ",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >Simon

        <CopyRightIcon />
        {date.getUTCFullYear()}
        <a href="https://simonjnr.netlify.app/" className="mx-5">
          {" "}
          Simon
        </a>
      </div>
    </footer>
  );
};

export default Footer;
