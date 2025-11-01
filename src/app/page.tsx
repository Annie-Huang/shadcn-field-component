'use client';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { projectSchema } from '@/schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createProject } from '@/actions/project';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function Home() {
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    const res = await createProject(data);

    if (res.success) {
      form.reset();
      toast.success('Project created successfully!', {
        description: JSON.stringify(data, null, 2),
        className: 'whitespace-pre-wrap font-mono',
      });
    } else {
      toast.error('Failed to create project.');
    }
  };

  return (
    <div className='container px-4 mx-auto my-6'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input />
            <FieldError errors={[{ message: 'Hi' }]} />
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
