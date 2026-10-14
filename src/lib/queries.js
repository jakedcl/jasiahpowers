export const projectsQuery =
  '*[_type == "project"] | order(orderRank asc, order asc, _createdAt desc)'

export const projectBySlugQuery =
  '*[_type == "project" && slug.current == $slug][0]'

export const photoGalleryQuery = '*[_type == "photoGallery"][0]'

export const homePageQuery = `*[_type == "homePage"][0]{
  featuredVideo,
  welcomeMessage,
  "featuredProjects": featuredProjects[]->{
    _id,
    name,
    slug,
    bio,
    images
  }
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  contactEmail,
  musicLink,
  youtubePlaylist,
  bookingTypes,
  seoDescription,
  shareImage,
  socialLinks
}`
