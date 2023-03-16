//libraries
import { GroupIcon, CodeIcon } from "@/components/icons/Icons";
import { PROBLEMS } from "@/utils/constants";
import sidenavStyles from "./side-nav.module.scss";
import SideBarMenu from "./SIdeBarMenu";

const SideBar = () => {
  return (
    <div className={sidenavStyles.container}>
      <div>
        <SideBarMenu
          tag={PROBLEMS}
          Icon2={<GroupIcon />}
          Icon={<CodeIcon />}
          value={undefined}
          onChange={undefined}
        />
      </div>
    </div>
  );
};

export default SideBar;
