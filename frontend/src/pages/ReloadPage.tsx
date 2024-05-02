import { ReloadIcon } from "@/components/ui/Icons";
import { useNavigate } from "react-router-dom";

const ReloadPage = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute left-1/2 top-1/2 flex h-14 w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8">
      <span className="text-center text-2xl font-bold !leading-none">
        Something went wrong!
      </span>
      <button
        className="clickable flex items-center gap-2 rounded-full bg-accent px-[1.125rem] py-[0.625rem] text-accent-foreground hover:bg-accent-hover md:px-6 md:py-[0.9375rem] lg:px-6 lg:py-[0.9375rem]"
        onClick={() => navigate(0)}
      >
        <ReloadIcon className="h-5 w-5" />
        Reload
      </button>
    </div>
  );
};

export default ReloadPage;
