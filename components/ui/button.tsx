import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 font-bold uppercase gap-1 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary h-12 px-8 tracking-[1px] text-white hover:bg-primary/80",
        secondary:
          "bg-transparent text-black border tracking-[1px] border-black h-12 px-8 hover:bg-black hover:text-white",
        ghost:
          "bg-transparent p-0! h-fit! text-black/50 text-[13px] tracking-[1px] hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "secondary" | "ghost";
};

const Button = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
