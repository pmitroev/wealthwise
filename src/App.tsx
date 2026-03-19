import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Layout from './components/layout/Layout'
import Budgets from './pages/Budgets'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

function App() {
  return (
    <>
    <Toaster position="bottom-right" richColors />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
