import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'k4dm6cys', // Replace with your project ID
  dataset: 'production',
  useCdn: false, // Disabled for real-time updates when content changes
  apiVersion: '2023-05-03', // Use current date (YYYY-MM-DD) to target the latest API version
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source)
}

// Helper functions for fetching data
export const sanityFetch = async (query, params = {}) => {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}

// Common queries
export const queries = {
  projects: '*[_type == "project"] | order(order asc, _createdAt desc)',
  projectBySlug: '*[_type == "project" && slug.current == $slug][0]',
  photos: '*[_type == "photo"] | order(order asc, _createdAt desc)',
  videos: '*[_type == "video"] | order(order asc, _createdAt desc)',
  siteSettings: '*[_type == "siteSettings"][0]',
  homePage: '*[_type == "homePage"][0]',
}
