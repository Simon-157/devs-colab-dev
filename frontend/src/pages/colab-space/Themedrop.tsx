import { customStyles } from "@/utils/constants";
import { monacoThemes } from "@/utils/editor";
import React from "react";
import Select from "react-select";


const ThemeDropdown = ({ handleThemeChange, theme }:any) => {
  return (
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;