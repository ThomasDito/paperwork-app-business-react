import * as React from "react";
import { useField } from "formik";
import { cn, Input, Label, Required } from "paperwork-ui";

type InputProps = {
  name: string;
  type?: string;
  className?: string;
  key?: React.Key | null;
  label?: string;
  containerClassName?: string;
  rightComponent?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormikInput: React.FC<InputProps> = ({
  type = "text",
  className,
  label,
  containerClassName,
  rightComponent,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <fieldset key={props.key} className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {props.required && <Required />}
        </Label>
      )}

      <div className="flex flex-row space-x-5">
        <Input
          type={type}
          className={cn(
            className,
            meta.touched &&
              meta.error &&
              "border-destructive ring-danger border focus-visible:ring-0"
          )}
          {...field}
          {...props}
        />
        {rightComponent}
      </div>

      {meta.touched && meta.error && (
        <span className="text-xs text-destructive">
          {meta.error?.toString()}
        </span>
      )}
    </fieldset>
  );
};

export { FormikInput };
