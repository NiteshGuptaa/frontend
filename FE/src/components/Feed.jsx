import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  // console.log(userFeed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {userFeed && (
        <div className="flex justify-evenly content-center mx-8 flex-wrap">
          {userFeed.map((user) => {
            return (
              <div
                key={user._id}
                className="card w-96 bg-base-100 shadow-xl m-5"
              >
                <div className="card figure px-10 pt-10">
                  <img src={user.photoURL} alt="profile pic" />
                </div>
                <div className="card-body">
                  <h2 className="card-title">
                    {user.firstName} {user.lastName}
                  </h2>
                  <h4 className="font-medium">Skills: {user.skills}</h4>
                  <p>{user.about}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">ignore</button>
                    <button className="btn btn-secondary">interested</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Feed;
