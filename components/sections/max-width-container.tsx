import { cn } from "@/lib/utils";

const MaxWidthContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-274 w-full px-4 mx-auto", className)}>
      {children}
    </div>
  );
};

export default MaxWidthContainer;
