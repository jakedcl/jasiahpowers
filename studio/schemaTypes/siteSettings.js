import {defineArrayMember, defineField, defineType} from 'sanity'

function urlField(name, title, description, fieldset) {
  return defineField({
    name,
    title,
    type: 'url',
    ...(fieldset ? {fieldset} : {}),
    description,
    validation: (Rule) =>
      Rule.uri({scheme: ['http', 'https']}).error(
        'Paste the full link, starting with https://'
      ),
  })
}

function playlistId(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  try {
    const list = new URL(raw).searchParams.get('list')
    if (list) return list
  } catch {
    /* a bare id */
  }
  return /^[\w-]{8,}$/.test(raw) ? raw : ''
}

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fieldsets: [
    {name: 'social', title: 'Social links'},
    {name: 'booking', title: 'Contact and booking'},
    {name: 'music', title: 'Music'},
    {name: 'video', title: 'YouTube'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site name',
      type: 'string',
      description: 'The name in the header.',
      initialValue: 'Jasiah Powers',
      validation: (Rule) => Rule.required().error('The site needs a name.'),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'object',
      fieldset: 'social',
      description: 'Leave a link empty to hide it on the site.',
      fields: [
        urlField('instagram', 'Instagram', 'The Instagram profile link.'),
        urlField('twitter', 'Twitter / X', 'The Twitter or X profile link.'),
        urlField('youtube', 'YouTube', 'The YouTube channel link.'),
        urlField('tiktok', 'TikTok', 'The TikTok profile link.'),
      ],
    }),
    urlField(
      'musicLink',
      'Music link',
      'Where the Music item in the header goes. Apple Music, Spotify, or similar.',
      'music'
    ),
    defineField({
      name: 'youtubePlaylist',
      title: 'YouTube playlist',
      type: 'string',
      fieldset: 'video',
      description:
        'The Video page uses this playlist. Paste the playlist link from YouTube, or just the ID.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true
          return playlistId(value)
            ? true
            : 'Paste a YouTube playlist link, or an ID like PL…'
        }),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      fieldset: 'booking',
      description:
        'Booking requests are emailed here. If this is empty, they go to the backup address on the server.',
      validation: (Rule) =>
        Rule.email().error('That doesn’t look like an email address.'),
    }),
    defineField({
      name: 'bookingTypes',
      title: 'Booking types',
      type: 'array',
      fieldset: 'booking',
      description:
        'The choices on the contact form. Drag to reorder. Leave this empty to use the built-in list.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) => Rule.required().error('Add a name, or remove this row.'),
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description: 'The short description Google and link previews use.',
      validation: (Rule) =>
        Rule.max(180).warning('Shorter descriptions fit better in a link preview.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share image',
      type: 'image',
      fieldset: 'seo',
      description: 'The picture people see when the site is shared. A wide photo works best.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'A few words describing the picture.',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site settings'}
    },
  },
})