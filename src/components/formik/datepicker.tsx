import * as React from "react";
import { FieldHookConfig, useField } from "formik";
import { DayPickerSingleProps } from "react-day-picker";
import { cn, ButtonProps, DatePicker, Label, Required } from "paperwork-ui";

type InputProps = {
  className?: string;
  placeholder?: string;
  label?: string;
} & { ButtonProps?: ButtonProps };

const FormikDatePicker: React.FC<
  InputProps &
    FieldHookConfig<Date | undefined> & {
      DatePickerProps?: Omit<DayPickerSingleProps, "mode">;
    }
> = ({
  className,
  placeholder,
  DatePickerProps,
  ButtonProps,
  label,
  id,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <fieldset key={props.key} className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {props.required && <Required />}
        </Label>
      )}
      <DatePicker
        {...DatePickerProps}
        ButtonProps={{ ...ButtonProps, id }}
        className={cn(
          meta.touched && meta.error && "border-destructive border",
          className,
        )}
        placeholder={placeholder}
        selected={field.value}
        onOpenChange={() => helpers.setTouched(true)}
        {...props}
        onSelect={(date) => {
          helpers.setValue(date);
        }}
      />

      {meta.touched && meta.error && (
        <span className="text-xs text-destructive">
          {meta.error?.toString()}
        </span>
      )}
    </fieldset>
  );
};

export { FormikDatePicker };
