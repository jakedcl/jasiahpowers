import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photoGallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      initialValue: 'Photo Gallery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Gallery Description',
      type: 'text',
      rows: 3,
      description: 'Optional description for the photo gallery',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for this photo',
            },
            {
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              description: 'Highlight this photo?',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
            prepare(selection) {
              const {title, subtitle, media} = selection;
              return {
                title: title || 'Untitled Photo',
                subtitle: subtitle || 'No alt text',
                media: media,
              };
            },
          },
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Drag and drop photos to reorder them. The order here determines the display order on your website.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'photos.0.image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection;
      return {
        title: title || 'Photo Gallery',
        subtitle: subtitle || 'Photo collection',
        media: media,
      };
    },
  },
})
