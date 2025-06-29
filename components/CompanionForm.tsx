'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { subjects } from '@/constants';

import { createCompanion } from '@/lib/actions/companion.actions';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from '@/components/ui/select';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Companion is required.',
  }),
  subject: z.string().min(1, {
    message: 'Subject is required.',
  }),
  topic: z.string().min(1, {
    message: 'Topic is required.',
  }),
  voice: z.string().min(1, {
    message: 'Voice is required.',
  }),
  style: z.string().min(1, {
    message: 'Style is required.',
  }),
  duration: z.coerce.number().min(1, {
    message: 'Duration is required.',
  }),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 15,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values);
    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log('Failed to create companion');
      redirect('/');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Companion name</FormLabel>
                <FormControl>
                  <Input
                    className='input'
                    placeholder='Enter the companion name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='subject'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='input capitalize'>
                      <SelectValue placeholder='Select the subject' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        className='capitalize'
                        key={subject}
                        value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='topic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What should the companion help with?</FormLabel>
                <FormControl>
                  <Textarea
                    className='input'
                    placeholder='Ex. Derivates & Integrals'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='voice'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='input'>
                      <SelectValue placeholder='Select the voice' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='style'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <Select
                  value={field.value}
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='input'>
                      <SelectValue placeholder='Select the style' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='formal'>Formal</SelectItem>
                    <SelectItem value='casual'>Casual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated session duration in minutes</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    className='input'
                    placeholder='15'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='w-full cursor-pointer'
            type='submit'>
            Build Your Companion
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
