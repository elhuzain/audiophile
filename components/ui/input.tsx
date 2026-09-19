import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-14 w-full rounded-lg border border-black/20 px-6 font-bold outline-none transition-colors placeholder:text-black/40 focus:border-primary",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
