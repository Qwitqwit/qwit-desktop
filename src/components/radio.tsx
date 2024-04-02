import {
  Field as HeadlessField,
  Radio as HeadlessRadio,
  RadioGroup as HeadlessRadioGroup,
  type FieldProps as HeadlessFieldProps,
  type RadioGroupProps as HeadlessRadioGroupProps,
  type RadioProps as HeadlessRadioProps,
} from "@headlessui/react";
import { clsx } from "clsx";

export function RadioGroup({ className, ...props }: HeadlessRadioGroupProps) {
  return (
    <HeadlessRadioGroup
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        "space-y-3 [&_[data-slot=label]]:font-normal",

        // With descriptions
        "has-[[data-slot=description]]:space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:font-medium",
      )}
    />
  );
}

export function RadioField({ className, ...props }: HeadlessFieldProps) {
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
  "relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]",

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:shadow",

  // Background color when checked
  "before:group-data-[checked]:bg-[--radio-checked-bg]",

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  "dark:before:hidden",

  // Background color applied to control in dark mode
  "dark:bg-tc dark:group-data-[checked]:bg-[--radio-checked-bg]",

  // Border
  "border border-bcb/15 group-data-[checked]:border-transparent group-data-[checked]:group-data-[hover]:border-transparent group-data-[hover]:border-bcb/30 group-data-[checked]:bg-[--radio-checked-border]",
  "dark:border-tc dark:group-data-[checked]:border-tc dark:group-data-[checked]:group-data-[hover]:border-tc dark:group-data-[hover]:border-tc",

  // Inner highlight shadow
  "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_theme(colors.tc)]",
  "dark:after:-inset-px dark:after:hidden dark:after:rounded-full dark:group-data-[checked]:after:block",

  // Indicator color (light mode)
  "[--radio-indicator:transparent] group-data-[checked]:[--radio-indicator:var(--radio-checked-indicator)] group-data-[checked]:group-data-[hover]:[--radio-indicator:var(--radio-checked-indicator)] group-data-[hover]:[--radio-indicator:theme(colors.bcb/10%)]",

  // Indicator color (dark mode)
  "dark:group-data-[checked]:group-data-[hover]:[--radio-indicator:var(--radio-checked-indicator)] dark:group-data-[hover]:[--radio-indicator:theme(colors.bcb)]",

  // Focus ring
  "group-data-[focus]:outline group-data-[focus]:outline-2 group-data-[focus]:outline-offset-2 group-data-[focus]:outline-blue-500",

  // Disabled state
  "group-data-[disabled]:opacity-50",
  "group-data-[disabled]:border-bcb/25 group-data-[disabled]:bg-bcb/5 group-data-[disabled]:[--radio-checked-indicator:theme(colors.bcb/50%)] group-data-[disabled]:before:bg-transparent",
  "dark:group-data-[disabled]:border-tc0 dark:group-data-[disabled]:bg-tc dark:group-data-[disabled]:[--radio-checked-indicator:theme(colors.tc)] dark:group-data-[disabled]:group-data-[checked]:after:hidden",
];

const colors = {
  zinc: "[--radio-checked-indicator:theme(colors.tc)] [--radio-checked-bg:theme(colors.bcb)] [--radio-checked-border:theme(colors.bcb/90%)]",
};

type Color = keyof typeof colors;

export function Radio({
  color = "zinc",
  className,
  ...props
}: { color?: Color; className?: string } & HeadlessRadioProps) {
  return (
    <HeadlessRadio
      data-slot="control"
      {...props}
      className={clsx(className, "group inline-flex focus:outline-none")}
    >
      <span className={clsx([base, colors[color]])}>
        <span
          className={clsx(
            "size-full rounded-full border-[4.5px] border-transparent bg-[--radio-indicator] bg-clip-padding",

            // Forced colors mode
            "forced-colors:border-[Canvas] forced-colors:group-data-[checked]:border-[Highlight]",
          )}
        />
      </span>
    </HeadlessRadio>
  );
}
