import React, { Fragment, useState } from "react";
import "./header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAcc } from "../../../actions/userActions";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : null }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/Cart");
  }

  function logoutUser() {
    dispatch(logoutUserAcc());
    alert.success("Logout Successful!");
    setTimeout(()=>{
      navigate("/login");
    }, 500)
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "1" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        className="speedDial"
        icon={
          <img className="speedDialIcon" src={ user.image || "/Profile.png"} alt="Profile" style={{ background: user.image ? "#fff": "transparent" }}/>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
