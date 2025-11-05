import React from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type FormControlProps<> = {
  control: ControllerProps;
};

export const FormInput = () => {
  return (
    <Controller
      control={control}
      name='name'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid} // control the input border to turn into red color in error
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
