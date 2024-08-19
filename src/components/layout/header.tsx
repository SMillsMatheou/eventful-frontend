import { useLogout } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleClick = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-20">
      <h1>Welcome {user.firstName}, </h1>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default Header;
