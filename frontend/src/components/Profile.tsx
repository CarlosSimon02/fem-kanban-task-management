import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { LogInIcon } from "./ui/Icons";

const Profile = () => {
  const { user } = useAuth0();

  if (!user) return null;

  return (
    <button className="flex min-w-0 items-center gap-3">
      <Avatar>
        <AvatarImage src={user.picture} alt={`${user.given_name} picture`} />
        <AvatarFallback>
          <LogInIcon className="h-10 w-10 fill-secondary-foreground" />
        </AvatarFallback>
      </Avatar>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-primary-foreground max-md:hidden">
        {user.given_name}
      </span>
    </button>
  );
};

export default Profile;
