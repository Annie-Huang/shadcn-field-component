'use client'

import {useForm} from 'react-hook-form';
import z from 'zod';
import {projectSchema} from '@/schemas/project';
import {zodResolver} from '@hookform/resolvers/zod';

export default function Home() {
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(projectSchema)
  })

  return null;
}
