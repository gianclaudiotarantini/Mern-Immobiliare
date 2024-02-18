// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/Sign-In" element={<SignIn />} />
          <Route path="/Sign-Up" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route element={<PrivateRoute />} >
            <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/Profile" element={<Profile />} />
        </Route>
        
      </Routes>
    
    </BrowserRouter>
  )
}

