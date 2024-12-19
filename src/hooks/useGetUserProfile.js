import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
 
  useEffect(() => {
    console.log("Fetching user profile...");
    const getUser = async () => {
      setLoading(true); // Reset loading state
      try {
        const res = await fetch(`/api/users/profile/${username}`);
         console.log("username in userPage :", username);
        const data = await res.json();
        console.log("data in userPage : ", data);
        console.log("res in userPage : ", res);
        if (data.error) {
           console.error("Lỗi", data.error);
           setUser(null);
           return;
        }
        setUser(data);
      } catch (error) {
        //  showToast("Lỗi",error,"error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);
  return [user, loading];
};

export default useGetUserProfile;

