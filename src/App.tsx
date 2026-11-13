import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<ComingSoon title="Log in" />} />
        <Route path="/signup" element={<ComingSoon title="Create your account" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}