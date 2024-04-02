import {
  Checkbox as HeadlessCheckbox,
  Field as HeadlessField,
  type CheckboxProps as HeadlessCheckboxProps,
  type FieldProps as HeadlessFieldProps,
} from "@headlessui/react";
import { clsx } from "clsx";
import type React from "react";

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        "space-y-3",

        // With descriptions
        "has-[[data-slot=description]]:space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:font-medium",
      )}
    />
  );
}

export function CheckboxField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        "grid grid-cols-[1.125rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",

        // Control layout
        "[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:justify-self-center",

        // Label layout
        "[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start",

        // Description layout
        "[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2",

        // With description
        "[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium",
      )}
    />
  );
}

const base = [
  // Basic layout
  "relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow",

  // Background color when checked
  "before:group-data-[checked]:bg-[--checkbox-checked-bg]",

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  "dark:before:hidden",

  // Background color applied to control in dark mode
  "dark:bg-tc dark:group-data-[checked]:bg-[--checkbox-checked-bg]",

  // Border
  "border border-bcb/15 group-data-[checked]:border-transparent group-data-[checked]:group-data-[hover]:border-transparent group-data-[hover]:border-bcb/30 group-data-[checked]:bg-[--checkbox-checked-border]",
  "dark:border-tc dark:group-data-[checked]:border-tc dark:group-data-[checked]:group-data-[hover]:border-tc dark:group-data-[hover]:border-tc",

  // Inner highlight shadow
  "after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_theme(colors.tc)]",
  "dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-data-[checked]:after:block",

  // Focus ring
  "group-data-[focus]:outline group-data-[focus]:outline-2 group-data-[focus]:outline-offset-2 group-data-[focus]:outline-blue-500",

  // Disabled state
  "group-data-[disabled]:opacity-50",
  "group-data-[disabled]:border-bcb/25 group-data-[disabled]:bg-bcb/5 group-data-[disabled]:[--checkbox-check:theme(colors.bcb/50%)] group-data-[disabled]:before:bg-transparent",
  "dark:group-data-[disabled]:border-tc0 dark:group-data-[disabled]:bg-tc dark:group-data-[disabled]:[--checkbox-check:theme(colors.tc)] dark:group-data-[disabled]:group-data-[checked]:after:hidden",

  // Forced colors mode
  "forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-[disabled]:[--checkbox-check:Highlight]",
  "dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-data-[disabled]:[--checkbox-check:Highlight]",
];

const colors = {
  zinc: "[--checkbox-check:theme(colors.tc)] [--checkbox-checked-bg:theme(colors.bcb)] [--checkbox-checked-border:theme(colors.bcb/90%)]",
};

type Color = keyof typeof colors;

export function Checkbox({
  color = "zinc",
  className,
  ...props
}: {
  color?: Color;
  className?: string;
} & HeadlessCheckboxProps) {
  return (
    <HeadlessCheckbox
      data-slot="control"
      className={clsx(className, "group inline-flex focus:outline-none")}
      {...props}
    >
      <span className={clsx([base, colors[color]])}>
        <svg
          className="size-4 stroke-[--checkbox-check] opacity-0 group-data-[checked]:opacity-100 sm:h-3.5 sm:w-3.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="opacity-100 group-data-[indeterminate]:opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="opacity-0 group-data-[indeterminate]:opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </HeadlessCheckbox>
  );
}