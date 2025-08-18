const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'k4dm6cys',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

const sanityFetch = async (query, params = {}) => {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const projects = await sanityFetch('*[_type == "project"] | order(order asc, _createdAt desc)')
    res.status(200).json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Error fetching projects' })
  }
}
