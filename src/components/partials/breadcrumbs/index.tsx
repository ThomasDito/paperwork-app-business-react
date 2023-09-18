import { Children, PropsWithChildren, ReactNode, isValidElement } from "react";
import { cn } from "paperwork-ui";

export interface BreadcrumbsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumbs({ children, separator, ...props }: PropsWithChildren<BreadcrumbsProps>) {
  return (
    <nav aria-label="breadcrumb">
      <ol {...props} className={cn("flex items-center space-x-2", props.className)}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <>
                <li className={cn("", {})}>{child}</li>
                {index !== Children.count(children) - 1 && <span className={""}>{separator}</span>}
              </>
            );
          }
          return null;
        })}
      </ol>
    </nav>
  );
}
