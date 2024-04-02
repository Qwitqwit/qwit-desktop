import { clsx } from "clsx";
import { Link } from "./link";

export function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      data-slot="text"
      className={clsx(
        className,
        "text-base/6 text-teal sm:text-sm/6 dark:text-teal",
      )}
    />
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "text-teal underline decoration-teal/50 data-[hover]:decoration-teal dark:text-mint dark:decoration-mint dark:data-[hover]:decoration-white",
      )}
    />
  );
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={clsx(className, "font-medium text-teal dark:text-mint")}
    />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded border border-teal/10 bg-teal/[2.5%] px-0.5 text-sm font-medium text-teal sm:text-[0.8125rem] dark:border-mint0 dark:bg-mint dark:text-mint",
      )}
    />
  );
}
