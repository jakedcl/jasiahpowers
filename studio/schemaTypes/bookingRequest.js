import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingRequest',
  title: 'Booking request',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Booking type',
      type: 'string',
      options: {
        list: ['Photography', 'Video', 'Prints', 'Event', 'Other'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'projectType',
    },
  },
})
