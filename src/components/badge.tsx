import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { TouchTarget } from "./button";
import { Link } from "./link";

const colors = {
  rose: "bg-sky text-sky group-data-[hover]:bg-sky/25 dark:bg-sky/10 dark:text-sky dark:group-data-[hover]:bg-sky/20",
  teal: "bg-teal text-teal group-data-[hover]:bg-teal/20 dark:bg-mint dark:text-teal dark:group-data-[hover]:bg-mint",
};

type BadgeProps = { color?: keyof typeof colors };

export function Badge({
  color = "teal",
  className,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline",
        colors[color],
      )}
    />
  );
}

export const BadgeButton = React.forwardRef(function BadgeButton(
  {
    color = "teal",
    className,
    children,
    ...props
  }: BadgeProps & { children: React.ReactNode } & (
      | HeadlessButtonProps
      | React.ComponentPropsWithoutRef<typeof Link>
    ),
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = clsx(
    className,
    "group relative inline-flex rounded-md focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500",
  );

  return "href" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Link>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </HeadlessButton>
  );
});
