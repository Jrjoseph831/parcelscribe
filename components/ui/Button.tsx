import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

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
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 btn-press disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0071e3] text-white hover:bg-[#0077ed] active:bg-[#006edb] focus-visible:ring-[#0071e3] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,113,227,0.35)]",
  secondary:
    "bg-white/80 backdrop-blur-sm text-[#1d1d1f] border border-[#d2d2d7] hover:bg-white hover:border-[#86868b] active:bg-[#f5f5f7] focus-visible:ring-[#0071e3] shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
  ghost:
    "text-[#0071e3] hover:bg-[#0071e3]/5 active:bg-[#0071e3]/10 focus-visible:ring-[#0071e3]",
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
