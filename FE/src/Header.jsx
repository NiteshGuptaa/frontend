import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "./utils/constants";
import { removeUser } from "./utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const req = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (req.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="navbar bg-base-300 shadow-sm px-10">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img alt="Profile Pic" src={user.photoURL} />
                  ) : (
                    <img
                      alt="Profile Pic"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/"}>Settings</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
