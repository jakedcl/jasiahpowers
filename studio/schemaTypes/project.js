import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineArrayMember, defineField, defineType} from 'sanity'

const link = defineArrayMember({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'href',
      title: 'Link',
      type: 'url',
      description: 'Paste a full link, like https://…',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }).error('Paste a full link, starting with https://'),
    }),
  ],
})

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'project'}),
    defineField({
      name: 'name',
      title: 'Project name',
      type: 'string',
      description: 'The title on the project page and on the tiles.',
      validation: (Rule) => Rule.required().error('Add a project name.'),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click Generate after the name. This becomes the page address.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Generate a web address from the name.'),
    }),
    defineField({
      name: 'bio',
      title: 'Short summary',
      type: 'string',
      description: 'One line under the picture on the homepage and the Projects page.',
      validation: (Rule) =>
        Rule.max(160).warning('Keep this to one short line so the tile stays tidy.'),
    }),
    defineField({
      name: 'description',
      title: 'Project text',
      type: 'array',
      description:
        'The writeup on the project page. Add headings, links, pictures, or a YouTube link.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Small heading', value: 'h3'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [link],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Picture',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'A few words describing the picture, for people who cannot see it.',
              validation: (Rule) =>
                Rule.required().error('Add a short description of this picture.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional line under the picture.',
            }),
          ],
        }),
        defineArrayMember({
          name: 'youtubeEmbed',
          title: 'YouTube',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'YouTube link',
              type: 'url',
              description: 'Paste a YouTube link. It plays on the project page.',
              validation: (Rule) =>
                Rule.required()
                  .uri({scheme: ['http', 'https']})
                  .error('Paste a YouTube link, starting with https://'),
            }),
          ],
          preview: {
            select: {title: 'url'},
            prepare({title}) {
              return {title: title || 'YouTube video'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Project images',
      type: 'array',
      description: 'The pictures on the project page. Drag them into the order you want.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'A few words describing the picture, for people who cannot see it.',
              validation: (Rule) =>
                Rule.required().error('Add a short description of this picture.'),
            }),
          ],
        }),
      ],
      options: {layout: 'grid'},
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      subtitle: 'bio',
    },
  },
})
