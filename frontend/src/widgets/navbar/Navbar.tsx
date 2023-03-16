//libraries
import {useContext} from "react"
import NavLink from "@/components/NavLInk/NavLink";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

//components
import {NavigationButtons} from "./NavbarItems"
import { userContext } from "@/contexts/userContext";
import { NotificationsIcon } from "@/components/icons/Icons"; 
import ButtonC from "@/components/button/Button";
import ProfileCard from "./ProfileCard";


//styles
import navbarStyles from "./navbar.module.scss"


interface User {
    id: number;
    userName: string;
    profileImg: string;
    email: string;
    // Add any other properties that the currentUser object is expected to have
  }
  

const Navbar = () => {
    const {currentUser} = useContext(userContext)

  return (
    <>
      <nav className={navbarStyles.navbar}>
        <div>
            <span className={navbarStyles.navLogo}>
            <NavLink href="/" >
            DevColab
          </NavLink>
            </span>
          

          {!currentUser &&NavigationButtons?.map((button) => {
          return (
              
              <ButtonC
                key={button.to}
                icon={button.icon}
                text={button.text}
                to={button.to}
              />
             );
            })
          }
        {currentUser &&
            <Popover 
              animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}>
              <PopoverHandler >
                <Button variant="gradient">
                  <img className = "inline mr-2 object-cover w-8 h-8 rounded-full" src={currentUser?.profileImg} alt={currentUser?.userName} />
                </Button>
              </PopoverHandler>
              <PopoverContent
              // className = "z-40"
              >
                <ProfileCard currentuser={currentUser} />
              </PopoverContent>
            </Popover>
        }
        </div>
      </nav>
    
    </>
  );
}


