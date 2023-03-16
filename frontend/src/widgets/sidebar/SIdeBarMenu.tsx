//libraries
import FetchProblems from "@/api/FetchProblems";
import Button from "@/components/button/Button";
import { userContext } from "@/contexts/userContext";
import { ProblemPropType } from "@/interfaces/ProblemPropType";
import { SideBarMenuProps } from "@/interfaces/SideBarMenuProps";
import React, { useState, useContext } from "react";
import { useQuery } from "react-query";

//components
import sideMenuStyles from "./side-menu.module.scss";

const SideBarMenu = ({
  tag,
  value,
  onChange,
  Icon,
  Icon2,
}: SideBarMenuProps) => {
  const { data } = useQuery("challenges2", FetchProblems);
  const { currentUser } = useContext(userContext);
  console.log(currentUser);
  const [searchValue, setSearchValue] = useState("");
  console.log(data);
  return (
    <div className={sideMenuStyles.container}>
      <div className={sideMenuStyles.sideBarWrapper}>
        <div className={sideMenuStyles.sideSec}>
          <Button icon={Icon} text={""} />
          <div className={sideMenuStyles.sideMenu}>
            <h4>{tag}</h4>
            <div className={sideMenuStyles.search}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            {/* {isLoading? <>Loading...</>: ""} */}

            {
              // eslint-disable-next-line array-callback-return
              data
                ?.filter((problem: ProblemPropType) => {
                  if (searchValue === "") {
                    return problem;
                  } else if (
                    problem.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  ) {
                    return problem;
                  }
                })
                .map(
                  (result: {
                    problem_id: React.Key | null | undefined;
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactFragment
                      | React.ReactPortal
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | null
                      | undefined;
                  }) => {
                    // console.log(result);
                    return (
                      <div
                        className={sideMenuStyles.listItems}
                        key={result.problem_id}
                        onClick={() => this.makeGroup(result.problem_id)}
                      >
                        <p>{result.title}</p>
                      </div>
                    );
                  }
                )
            }
          </div>
        </div>
        <div className={sideMenuStyles.sideSec}>
          <Button icon={Icon2} text={""} />
          <div className={sideMenuStyles.sideMenu}>
            <h4>{tag}</h4>
            <div className={sideMenuStyles.search}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>

            {
              // eslint-disable-next-line array-callback-return
              data
                ?.filter((problem: ProblemPropType) => {
                  if (searchValue === "") {
                    return problem;
                  } else if (
                    problem.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  ) {
                    return problem;
                  }
                })
                .map(
                  (result: {
                    problem_id: React.Key | null | undefined;
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    // console.log(result);
                    return (
                      <div
                        className={sideMenuStyles.listItems}
                        key={result.problem_id}
                        onClick={() => this.makeGroup(result.problem_id)}
                      >
                        <p>{result.title}</p>
                      </div>
                    );
                  }
                )
            }
          </div>
        </div>
        <div className={sideMenuStyles.sideSec}>
          {currentUser && (
            <button>
              <img
                className="inline mr-2 object-cover w-8 h-8 rounded-full"
                src={currentUser?.profileImg}
                alt={currentUser?.userName}
              />
              {/* {currentUser?.userName.split(' ')[0]} */}
            </button>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default SideBarMenu;


