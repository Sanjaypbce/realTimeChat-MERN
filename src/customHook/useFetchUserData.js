// useFetchUserData.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../Store/Slice/UserSlice";

const useFetchUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch]);
};

export default useFetchUserData;
