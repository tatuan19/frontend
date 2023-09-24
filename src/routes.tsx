import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = lazy(() => import('./pages/home'))
const Detail = lazy(() => import('./pages/detail'))
const Upload = lazy(() => import('./pages/upload'))
const Update = lazy(() => import('./pages/update'))
const ErrorPage = lazy(() => import('./pages/error_page'))

const MainRouter = () => {
  // const { roomID, setRoomID } = useState<string>('')
  return (
    <>
      <Router>
        <nav className="App-header">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/upload">Image Upload</Link>
            </li>
            <li>
                <Link to="/404error">error</Link>
            </li>
        </nav>
        <Suspense fallback={<div>로딩중입니다</div>}>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/detail/*" element={<Detail/>}></Route>
              <Route path="/upload" element={<Upload/>}></Route>
              <Route path="/update/*" element={<Update/>}></Route>
              <Route path="/*" element={<ErrorPage/>}></Route>
            </Routes>
        </Suspense>
      </Router>
    </>
  )
}
export default MainRouter