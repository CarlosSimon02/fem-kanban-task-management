import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (
      user?.sub &&
      (user?.given_name || user?.email) &&
      user?.picture &&
      !hasCreatedUser.current
    ) {
      createUser({
        auth0Id: user.sub,
        name:
          user.given_name || (user.email ? user.email.split("@")[0] : "User"),
        picture: user.picture,
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
