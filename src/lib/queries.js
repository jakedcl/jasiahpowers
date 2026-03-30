export const projectsQuery =
  '*[_type == "project"] | order(order asc, _createdAt desc)'

export const projectBySlugQuery =
  '*[_type == "project" && slug.current == $slug][0]'

export const photoGalleryQuery = '*[_type == "photoGallery"][0]'
