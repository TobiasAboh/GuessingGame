import React, { useState, useEffect, useRef } from "react";
import styles from "./dropDownMenu.module.css";

function DropdownMenu({ listItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(listItems[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const setNewValue = (newValue) => {
    setIsOpen(!isOpen);
    setValue(newValue);
  };

  const categories = listItems.map((link, index) => (
    <a onClick={() => setNewValue(link)}>{link}</a>
  ));

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.dropdownbutton}>
        {value}
      </button>
      {isOpen && <div className={styles.dropdowncontent} key={0}>{categories}</div>}
    </div>
  );
}

export default DropdownMenu;
