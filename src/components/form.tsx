import React, { ReactNode } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Copy from C:\react\shadcn-field-component\node_modules\react-hook-form\dist\types\controller.d.ts
type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control'];
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean;
      id: string;
    },
  ) => ReactNode;
};

type FormControlFunc = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues>,
) => ReactNode;

// function FormBase<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
//   TTransformedValues = TFieldValues,
// >({
//   children,
//   control,
//   label,
//   name,
// }: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
//           {children({
//             ...field,
//             id: field.name,
//             'aria-invalid': fieldState.invalid,
//           })}
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   );
// }

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
          {children({
            ...field,
            id: field.name,
            'aria-invalid': fieldState.invalid,
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

// -----------------------------------------------------------------------------------------------------

// export const FormInput = ({ control, name, label }: FormControlProps) => {
/*export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
}: FormControlProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
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
}*/

// export function FormInput<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
//   TTransformedValues = TFieldValues,
// >({
//   control,
//   name,
//   label,
// }: FormControlProps<TFieldValues, TName, TTransformedValues>) {
//   return (
//     <FormBase>
//       <Input
//         {...field}
//         id={field.name}
//         aria-invalid={fieldState.invalid} // control the input border to turn into red color in error
//       />
//     </FormBase>
//   );
// }

// export function FormInput<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
//   TTransformedValues = TFieldValues,
// >(props: FormControlProps<TFieldValues, TName, TTransformedValues>) {
//   return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
// }

export const FormInput: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
};

export const FormTextarea: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>;
};
