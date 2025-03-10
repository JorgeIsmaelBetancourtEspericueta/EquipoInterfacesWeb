import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Actualizar el estado cuando cambia el hash
  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Misión", icon: <InfoIcon />, link: "#about" },
    { text: "Reseñas", icon: <CommentRoundedIcon />, link: "/resena" },
    { text: "Contáctanos", icon: <PhoneRoundedIcon />, link: "#contacto" },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) =>
          item.text !== "Misión" && item.text !== "Contáctanos" ? (
            item.link.startsWith("#") ? (
              <a
                key={item.text}
                href={item.link}
                className={currentHash === item.link ? "active-link" : ""}
              >
                {item.text}
              </a>
            ) : (
              <Link
                key={item.text}
                to={item.link}
                className={location.pathname === item.link ? "active-link" : ""}
              >
                {item.text}
              </Link>
            )
          ) : (
            <a key={item.text} href={item.link}>
              {item.text}
            </a>
          )
        )}
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active-link" : ""}
        >
          <button className="primary-button">Login</button>
        </Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3
          size={30}
          onClick={() => setOpenMenu(true)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={item.link.startsWith("#") ? "a" : Link}
                  href={item.link.startsWith("#") ? item.link : undefined}
                  to={item.link.startsWith("#") ? undefined : item.link}
                  onClick={() => setOpenMenu(false)}
                  className={
                    (location.pathname === item.link ||
                      currentHash === item.link) &&
                    item.text !== "Misión" &&
                    item.text !== "Contáctanos"
                      ? "active-link"
                      : ""
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                onClick={() => setOpenMenu(false)}
                className={location.pathname === "/login" ? "active-link" : ""}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
