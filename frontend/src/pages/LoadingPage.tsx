const LoadingPage = () => {
  return (
    <div className="absolute left-1/2 top-1/2 h-14 w-52 -translate-x-1/2 -translate-y-1/2 [&>*:nth-child(2)]:left-[45%] [&>*:nth-child(2)]:delay-200 [&>*:nth-child(3)]:left-auto [&>*:nth-child(3)]:right-[15%] [&>*:nth-child(3)]:delay-300 [&>*:nth-child(4)]:left-[45%] [&>*:nth-child(4)]:delay-200 [&>*:nth-child(5)]:left-auto [&>*:nth-child(5)]:right-[15%] [&>*:nth-child(5)]:delay-300">
      <div className="animate-circle-bounce absolute left-[15%] h-5 w-5 origin-[50%] rounded-[50%] bg-accent" />
      <div className="animate-circle-bounce absolute left-[15%] h-5 w-5 origin-[50%] rounded-[50%] bg-accent" />
      <div className="animate-circle-bounce absolute left-[15%] h-5 w-5 origin-[50%] rounded-[50%] bg-accent" />
      <div className="animate-shadow absolute left-[15%] top-[3.875rem] -z-[1] h-1 w-5 origin-[50%] rounded-[50%] bg-black/50 blur-[0.0625rem] filter" />
      <div className="animate-shadow absolute left-[15%] top-[3.875rem] -z-[1] h-1 w-5 origin-[50%] rounded-[50%] bg-black/50 blur-[0.0625rem] filter" />
      <div className="animate-shadow absolute left-[15%] top-[3.875rem] -z-[1] h-1 w-5 origin-[50%] rounded-[50%] bg-black/50 blur-[0.0625rem] filter" />
      <span className="absolute left-[15%] top-[4.6875rem] text-xl tracking-[0.75rem] text-primary-foreground">
        Loading
      </span>
    </div>
  );
};

export default LoadingPage;
