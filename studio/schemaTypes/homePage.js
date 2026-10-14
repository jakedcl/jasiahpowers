import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome line',
      type: 'text',
      rows: 3,
      description: 'Optional sentence under the header on the homepage. Leave it blank to hide it.',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured work',
      type: 'array',
      description:
        'Projects on the homepage, in this order. Drag to reorder. This is separate from the Projects list.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'project'}],
        }),
      ],
      validation: (Rule) =>
        Rule.unique().error('Each project only needs to be in Featured work once.'),
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured YouTube video',
      type: 'object',
      description: 'The video at the bottom of the homepage.',
      fields: [
        defineField({
          name: 'videoId',
          title: 'YouTube link or video ID',
          type: 'string',
          description: 'Paste a YouTube link, or just the video ID.',
        }),
        defineField({
          name: 'title',
          title: 'Video title',
          type: 'string',
          description: 'Optional. Used as the video label for screen readers.',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
