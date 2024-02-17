import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { getAuthUser } from "../../actions/userActions";
import { LOAD_SUCCESS } from "../../constants/userConstants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const updateUserData = async ()=> {
      const data = await getAuthUser();
      if(!data) {
        return navigate('/login');
      }
      dispatch({ type: LOAD_SUCCESS, payload: data.user });
  }
  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name || user.displayName}'s Profile`}></MetaData>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={ user.image || "./Profile.png"} alt={user.name} width={"288px"} height={"288px"} />
              { !user.googleId && <Link to="/me/update">Edit Profile</Link> }
              { user.googleId && <Link style={{
                background: "grey"
              }} to="" >LoggedIn with Gmail</Link> }
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
                <p>{user.displayName}</p>
                
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                { !user.googleId && <Link to="/password/update">Change Password</Link> }
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
