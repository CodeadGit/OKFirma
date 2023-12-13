import React, { useContext } from "react";
import { AuthenticationContext } from "../../context/authentication.context";
import "./pagenavbar.scss";
import exit from "../../pages/home/svg/exit.svg";
import dark from "../../pages/home/svg/dark.svg";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Header from "../../components/text/Header";
import SubHeader from "../../components/text/SubHeader";
import AddPhoto from "../../pages/accountStack/register/svg/addPhoto.svg";
import { InputBase, Paper } from "@mui/material";

const PageNavbar = () => {

  const { logout,userData, user } = useContext(AuthenticationContext);

  return (
    <div className="firm-info">
      <div className="top">
        <div className="top-profile">
          <label>
            <img
              className={`logodiv-new`}
              src={user.photoURL ? user.photoURL : AddPhoto}
              alt=""
            />
          </label>
          <div>
            {Object.keys(userData).length > 0 && (
              <Header id="firmName">
                {userData ? userData.firmName : user?.displayName}
              </Header>
            )}
            {Object.keys(userData).length > 0 && (
              <SubHeader>
                Üye Numarası: {new Date().valueOf().toString().substring(0, 6)}
              </SubHeader>
            )}
          </div>
        </div>

        <div className="top-right">
          <div className="top-right-darkmodeicon">
            <img src={dark} />
          </div>
          <div className="top-right-input">
            <Paper
              component="form"
              sx={{
                p: "1px 2px",
                display: "flex",
                alignItems: "center",
                borderRadius: "15px",
                boxShadow: "none",
              }}
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Ara"
                inputProps={{ "aria-label": "Ara" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>

          <div className="top-right-exit">
          <div onClick={logout} className="logout">
          
            <img src={exit} />
          </div>
        </div>


        </div>
      </div>
    </div>
  );
};

export default PageNavbar;
