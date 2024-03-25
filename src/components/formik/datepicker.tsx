import * as React from "react";
import { FieldHookConfig, useField } from "formik";
import { DayPickerSingleProps } from "react-day-picker";
import { cn, ButtonProps, Label, Required } from "paperwork-ui";
import moment from "moment-timezone";
import { id as Indonesia } from "date-fns/locale";
import { DatePicker } from "@/components/ui/datepicker";

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
        className={cn(meta.error && "border-destructive border", className)}
        placeholder={placeholder}
        selected={field.value}
        onOpenChange={() => helpers.setTouched(true, true)}
        locale={Indonesia}
        {...props}
        {...field}
        onSelect={(date) => {
          const value = moment(date).toDate();
          helpers.setValue(value, true);
          helpers.setTouched(true, true);
        }}
      />

      {meta.error && (
        <span className="text-xs text-destructive">
          {meta.error?.toString()}
        </span>
      )}
    </fieldset>
  );
};

export { FormikDatePicker };
