import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured YouTube Video',
      type: 'object',
      fields: [
        {
          name: 'videoId',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'The ID from the YouTube URL (e.g., "nRStNn8KVcA")',
          initialValue: 'nRStNn8KVcA',
        },
        {
          name: 'title',
          title: 'Video Title',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      description: 'Optional welcome text to display',
      rows: 3,
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      description: 'Select projects to feature on homepage (leave empty to show all)',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Settings',
      type: 'object',
      fields: [
        {
          name: 'showProjects',
          title: 'Show Projects Link',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showPhotos',
          title: 'Show Photos Link',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showVideo',
          title: 'Show Video Link',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showPrints',
          title: 'Show Prints Link',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
