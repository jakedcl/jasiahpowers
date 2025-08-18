import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Jasiah Powers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          initialValue: 'Jasiah Powers Logo',
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Main site background image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          initialValue: 'https://www.instagram.com/jasiahpowers',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          initialValue: 'https://www.twitter.com',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          initialValue: 'https://www.youtube.com',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          initialValue: 'https://www.tiktok.com',
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'jasiahsteez@gmail.com',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'musicLink',
      title: 'Music Link',
      type: 'url',
      description: 'Link to music (Apple Music, Spotify, etc.)',
      initialValue: 'https://music.apple.com/us/album/cc4ever/1743533951',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
