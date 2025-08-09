import './globals.css'

export const metadata = {
  title: 'PSLE Maths Bootcamp',
  description: 'Encouraging, mistake-friendly PSLE Maths LMS'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
