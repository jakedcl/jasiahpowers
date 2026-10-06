const SOCIAL = [
  ['instagram', 'Instagram'],
  ['twitter', 'Twitter'],
  ['youtube', 'YouTube'],
  ['tiktok', 'TikTok'],
]

export default function Footer({ social }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <ul>
        {SOCIAL.map(([key, label]) => (
          <li key={key}>
            <a href={social[key]} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p>© JASIAH POWERS {year}</p>
    </footer>
  )
}
