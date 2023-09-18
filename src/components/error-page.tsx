import { AlertCircle } from "lucide-react";
import { HTMLProps, PropsWithChildren } from "react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, cn } from "paperwork-ui";

export type ErrorPageProps = {
  title?: string;
  message?: string;
  titleProps?: HTMLProps<HTMLHeadingElement>;
  messageProps?: HTMLProps<HTMLParagraphElement>;
  iconSize?: number;
  Icon?: LucideIcon;
};

export default function ErrorPage({
  title,
  message,
  children,
  titleProps,
  messageProps,
  Icon = AlertCircle,
  iconSize = 150,
}: PropsWithChildren<ErrorPageProps>) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-screen space-y-4">
      <Icon size={iconSize} />
      <div className="text-center">
        <h1
          {...titleProps}
          className={cn("font-bold text-3xl mb-2", titleProps?.className)}
        >
          {title ?? "Oops..."}
        </h1>
        <p
          {...messageProps}
          className={cn("text-base font-medium", messageProps?.className)}
        >
          {message ?? "Something Went Wrong"}
        </p>
      </div>
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
      {children}
    </div>
  );
}
