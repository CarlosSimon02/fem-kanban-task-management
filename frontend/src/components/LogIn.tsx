import { useAuth0 } from "@auth0/auth0-react";
import { LogInIcon } from "./ui/Icons";

const LogIn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="flex items-center gap-3"
      onClick={async () => await loginWithRedirect()}
    >
      <LogInIcon className="h-10 w-10 fill-secondary-foreground" />
      <span className="text-lg font-semibold text-accent max-md:hidden">
        Log In
      </span>
    </button>
  );
};

export default LogIn;
