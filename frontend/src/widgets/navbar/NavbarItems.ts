import { CodeIcon, LoginIcon } from "@/components/icons/Icons";
import { HOME, LOGIN, PROBLEMS } from "@/utils/constants";

export const NavigationButtons: {icon: any, text: string, to: string}[] = [
  {
    icon: CodeIcon,
    text: PROBLEMS,
    to: `${HOME}${PROBLEMS}`,
  },
  {
    icon: LoginIcon,
    text: LOGIN,
    to: `${HOME}${LOGIN}`,
  },
];
