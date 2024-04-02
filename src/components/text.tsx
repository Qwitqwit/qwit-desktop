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
        "text-base/6 text-bcb sm:text-sm/6 dark:text-bcb",
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
        "text-bcb underline decoration-bcb/50 data-[hover]:decoration-bcb dark:text-tc dark:decoration-tc dark:data-[hover]:decoration-white",
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
      className={clsx(className, "font-medium text-bcb dark:text-tc")}
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
        "rounded border border-bcb/10 bg-bcb/[2.5%] px-0.5 text-sm font-medium text-bcb sm:text-[0.8125rem] dark:border-tc0 dark:bg-tc dark:text-tc",
      )}
    />
  );
}
