import * as React from "react";
import { useField } from "formik";
import { cn, Label, Required, Textarea } from "paperwork-ui";

type TextareaProps = {
  name: string;
  className?: string;
  key?: React.Key | null;
  label?: string;
  containerClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormikTextarea: React.FC<TextareaProps> = ({
  className,
  label,
  containerClassName,
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
      <Textarea
        className={cn(
          className,
          meta.touched &&
            meta.error &&
            "border-destructive ring-danger border focus-visible:ring-0"
        )}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <span className="text-xs text-destructive">
          {meta.error?.toString()}
        </span>
      )}
    </fieldset>
  );
};

export { FormikTextarea };
