import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({ isAuthenticated: false });
        await fetch("/api/auth/logout", { method: "POST" }, { credentials: "include" });
        
    };
    return logout;
  };

  export default useLogout