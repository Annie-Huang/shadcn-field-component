'use client'

import {useForm} from 'react-hook-form';
import z from 'zod';
import {projectSchema} from '@/schemas/project';

export default function Home() {
  useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      name: ''
    }
  })

  return null;
}
