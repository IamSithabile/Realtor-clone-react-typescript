import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus: () => {
  isLoggedIn: boolean;
  isChecking: boolean;
} = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      setIsChecking(false);
    });
  }, []);

  return { isLoggedIn, isChecking };
};

export default useAuthStatus;
