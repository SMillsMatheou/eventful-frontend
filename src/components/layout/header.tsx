import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/auth";

const Header = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleClick = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };
  return (
    <div>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default Header;
