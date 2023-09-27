import * as React from "react";
import { FieldHookConfig, useField } from "formik";
import { cn, ComboBox, Label, Required } from "paperwork-ui";

type InputProps = {
  className?: string;
  placeholder?: string;
  placeholderNotFound?: string;
  placeholderSearch?: string;
  values: {
    value: string;
    label: string;
  }[];
  label?: string;
};

const FormikComboBox: React.FC<InputProps & FieldHookConfig<string>> = ({
  className,
  values,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <fieldset key={props.key} className="space-y-2">
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {props.required && <Required />}
        </Label>
      )}

      <ComboBox
        open={open}
        onOpenChange={(open) => {
          helpers.setTouched(true);
          setOpen(open);
        }}
        selected={field.value}
        values={values}
        className={cn(
          meta.touched && meta.error && "border-destructive border",
          className,
        )}
        {...props}
        onSelect={(value) => {
          helpers.setTouched(true);
          helpers.setValue(value);
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

export { FormikComboBox };
