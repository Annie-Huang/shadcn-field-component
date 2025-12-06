'use client';

// import { Controller, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
import { PROJECT_STATUSES, projectSchema } from '@/schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createProject } from '@/actions/project';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { XIcon } from 'lucide-react';
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/components/form';

import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';

type FormData = z.infer<typeof projectSchema>;

export default function Home() {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'draft' as const,
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
      users: [{ email: '' }],
    } satisfies FormData as FormData,
    validators: {
      onSubmit: projectSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await createProject(value);

      if (res.success) {
        form.reset();
        toast.success('Project created successfully!', {
          description: JSON.stringify(value, null, 2),
          className: 'whitespace-pre-wrap font-mono',
        });
      } else {
        toast.error('Failed to create project.');
      }
    },
  });

  // const {
  //   fields: users,
  //   append: addUser,
  //   remove: removeUser,
  // } = useFieldArray({ control: form.control, name: 'users' });

  return (
    <div className='container px-4 mx-auto my-6'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name='name'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name='status'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    onValueChange={(e) =>
                      field.handleChange(e as (typeof PROJECT_STATUSES)[number])
                    }
                    value={field.state.value}
                  >
                    <SelectTrigger aria-invalid={isInvalid} id={field.name}>
                      <SelectValue onBlur={field.handleBlur} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/*<FormTextarea*/}
          {/*  control={form.control}*/}
          {/*  name='description'*/}
          {/*  label='Description'*/}
          {/*  description='Be as detailed as possible'*/}
          {/*/>*/}

          {/*<FieldSet>*/}
          {/*  <FieldContent>*/}
          {/*    <FieldLegend>Notifications</FieldLegend>*/}
          {/*    <FieldDescription>*/}
          {/*      Select how you would like to receive notifications*/}
          {/*    </FieldDescription>*/}
          {/*  </FieldContent>*/}

          {/*  <FieldGroup data-slot='checkbox-group'>*/}
          {/*    <FormCheckbox*/}
          {/*      name='notifications.email'*/}
          {/*      label='Email'*/}
          {/*      control={form.control}*/}
          {/*    />*/}
          {/*    <FormCheckbox*/}
          {/*      name='notifications.sms'*/}
          {/*      label='Text'*/}
          {/*      control={form.control}*/}
          {/*    />*/}
          {/*    <FormCheckbox*/}
          {/*      name='notifications.push'*/}
          {/*      label='In App'*/}
          {/*      control={form.control}*/}
          {/*    />*/}
          {/*  </FieldGroup>*/}
          {/*</FieldSet>*/}

          {/*<FieldSeparator />*/}

          {/*<FieldSet>*/}
          {/*  <div className='flex justify-between gap-2 items-center'>*/}
          {/*    <FieldContent>*/}
          {/*      <FieldLegend variant='label' className='mb-0'>*/}
          {/*        User Email Address*/}
          {/*      </FieldLegend>*/}
          {/*      <FieldDescription>*/}
          {/*        Add up to 5 users to this project (including yourself).*/}
          {/*      </FieldDescription>*/}
          {/*      {form.formState.errors.users?.root && (*/}
          {/*        <FieldError errors={[form.formState.errors.users?.root]} />*/}
          {/*      )}*/}
          {/*    </FieldContent>*/}

          {/*    <Button*/}
          {/*      type='button'*/}
          {/*      variant='outline'*/}
          {/*      size='sm'*/}
          {/*      onClick={() => addUser({ email: '' })}*/}
          {/*    >*/}
          {/*      Add User*/}
          {/*    </Button>*/}
          {/*  </div>*/}

          {/*  <FieldGroup>*/}
          {/*    {users.map((user, index) => (*/}
          {/*      <Controller*/}
          {/*        key={user.id}*/}
          {/*        control={form.control}*/}
          {/*        name={`users.${index}.email`}*/}
          {/*        render={({ field, fieldState }) => (*/}
          {/*          <Field data-invalid={fieldState.invalid}>*/}
          {/*            <InputGroup>*/}
          {/*              <InputGroupInput*/}
          {/*                {...field}*/}
          {/*                type='email'*/}
          {/*                id={field.name}*/}
          {/*                aria-invalid={fieldState.invalid} // control the input border to turn into red color in error*/}
          {/*                aria-label={`User ${index + 1} email`}*/}
          {/*              />*/}
          {/*              <InputGroupAddon align='inline-end'>*/}
          {/*                <InputGroupButton*/}
          {/*                  type='button'*/}
          {/*                  variant='ghost'*/}
          {/*                  size='icon-xs'*/}
          {/*                  onClick={() => removeUser(index)}*/}
          {/*                  aria-label={`Remove user ${index + 1}`}*/}
          {/*                >*/}
          {/*                  <XIcon />*/}
          {/*                </InputGroupButton>*/}
          {/*              </InputGroupAddon>*/}
          {/*            </InputGroup>*/}

          {/*            {fieldState.invalid && (*/}
          {/*              <FieldError errors={[fieldState.error]} />*/}
          {/*            )}*/}
          {/*          </Field>*/}
          {/*        )}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </FieldGroup>*/}
          {/*</FieldSet>*/}

          <Button>Create</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
