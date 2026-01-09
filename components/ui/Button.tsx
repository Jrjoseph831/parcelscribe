import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonOnlyProps = ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>) & {
  variant?: ButtonVariant;
  className?: string;
};

type AnchorButtonProps = ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = ButtonOnlyProps | AnchorButtonProps;

function isAnchorButton(props: ButtonProps): props is AnchorButtonProps {
  return typeof props.href === "string";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",
  secondary:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-blue-600",
};

export function buttonClasses(variant: ButtonVariant = "primary", extra = "") {
  return `${baseClasses} ${variantClasses[variant]} ${extra}`.trim();
}

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "" } = props;
  const classes = buttonClasses(variant, className);

  if (isAnchorButton(props)) {
    const { href, variant: _variant, className: _className, ...anchorProps } = props;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  const { variant: _variant, className: _className, ...buttonProps } = props;
  return <button className={classes} {...buttonProps} />;
}
