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

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../Style/Navbar.css";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false); // Abre/cierra el Drawer (menú móvil).
  const location = useLocation(); // Detecta ruta actual.
  const [currentHash, setCurrentHash] = useState(window.location.hash); // Detecta sección anclada (#about, #contacto).
  const [profilePhoto, setProfilePhoto] = useState(""); // Foto del usuario logueado (desde localStorage).

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile?.photo) {
      setProfilePhoto(savedProfile.photo);
    }
  }, []); // Al montar el componente, carga la foto del perfil desde localStorage.

  const [anchorEl, setAnchorEl] = useState(null); // Controla el menú desplegable del perfil.
  const openProfileMenu = Boolean(anchorEl); // Determina si el menú está abierto.
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  }); // Simula que el usuario está logueado

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []); // Actualiza el estado 'currentHash' cuando cambia el hash en la URL.

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Misión", icon: <InfoIcon />, link: "/#about" },
    { text: "Reseñas", icon: <CommentRoundedIcon />, link: "/resena" },
    { text: "Contáctanos", icon: <PhoneRoundedIcon />, link: "/#contacto" },
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
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3
          size={30}
          onClick={() => setOpenMenu(true)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="navbar-auth-container">
        {!isLoggedIn ? (
          <Link
            to="/login"
            className={location.pathname === "/login" ? "active-link" : ""}
          >
            <button className="primary-button">Login</button>
          </Link>
        ) : (
          <div className="navbar-profile-container">
            <IconButton
              onClick={handleClickProfile}
              size="large"
              edge="end"
              color="inherit"
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Foto de perfil"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", objectFit: "cover" }}
                />
              ) : (
                <AccountCircleIcon className="profile-icon" />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openProfileMenu}
              onClose={handleCloseProfile}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseProfile}>
                <Link to="/profileEditor">Editar Perfil</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseProfile}>
                <Link to="/favoritos">Favoritos</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.setItem("isLoggedIn", "false");
                  window.location.reload();
                  handleCloseProfile();
                }}
              >
                <Link to="/">Cerrar sesión</Link>
              </MenuItem>
            </Menu>
          </div>
        )}
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
