import * as React from "react";
import { FieldHookConfig, useField } from "formik";
import {
  cn,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Label,
  Required,
  SelectProps,
} from "paperwork-ui";

type InputProps = {
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
  label?: string;
} & SelectProps;

const FormikSelect: React.FC<InputProps & FieldHookConfig<string>> = ({
  className,
  children,
  placeholder,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <fieldset key={props.key} className="space-y-2">
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {props.required && <Required />}
        </Label>
      )}
      <Select
        onValueChange={(value) => helpers.setValue(value)}
        onOpenChange={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      >
        <SelectTrigger
          className={cn(
            meta.touched && meta.error && "border-destructive border",
            "w-[180px]",
            className,
          )}
          id={props.id}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>

      {meta.touched && meta.error && (
        <span className="text-xs text-destructive">
          {meta.error?.toString()}
        </span>
      )}
    </fieldset>
  );
};

export { FormikSelect };
