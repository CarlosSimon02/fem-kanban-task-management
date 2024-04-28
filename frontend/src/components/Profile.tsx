import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu";
import { LogInIcon } from "./ui/Icons";

const Profile = () => {
  const { user, logout } = useAuth0();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex min-w-0 items-center gap-3">
          <Avatar>
            <AvatarImage
              src={user.picture}
              alt={`${user.given_name} picture`}
            />
            <AvatarFallback>
              <LogInIcon className="h-10 w-10 fill-secondary-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-primary-foreground max-md:hidden">
            {user.given_name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => logout()}
          className="text-destructive focus:text-destructive"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
