import React, { useEffect } from "react";
import "./menu.scss";

const Menu = ({ menuRef, children, setOpenMenu }) => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuRef.current.parentNode.contains(event.target)
    ) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="menu-container" ref={menuRef}>
      {children}
    </div>
  );
};

export default Menu;
