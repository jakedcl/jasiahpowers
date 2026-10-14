import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'photoGallery',
  title: 'Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Intro line',
      type: 'text',
      rows: 3,
      description: 'Optional sentence under the Photos heading. Leave it blank to hide it.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Drag photos into the order they should appear on the site.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required().error('Choose a photo.'),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description:
                'A few plain words describing the photo. Screen readers read this, and it shows if the picture is slow to load.',
              validation: (Rule) =>
                Rule.required().error('Add a few words describing this photo.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional. Shows under the photo when someone taps it.',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || subtitle || 'Photo',
                subtitle: title ? subtitle : undefined,
                media,
              }
            },
          },
        }),
      ],
      options: {layout: 'grid'},
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Photos'}
    },
  },
})
