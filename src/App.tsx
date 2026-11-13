import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [status, setStatus] = useState('Checking setup...')

  useEffect(() => {
    supabase.auth.getSession().then(({ error }) => {
      setStatus(error ? `Error: ${error.message}` : 'Supabase client loaded ✅')
    })
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-amber-400">
        Sabi Studio — {status}
      </h1>
    </div>
  )
}