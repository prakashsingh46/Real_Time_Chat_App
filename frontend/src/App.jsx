import { Navbar } from "./components/Navbar.jsx";

import { useEffect } from "react";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast";
function App() {
  const {authUser, checkAuth,isCheckingAuth} =useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth] );

  console.log(authUser);

  if(isCheckingAuth && !authUser) return (
    <div className="flex item-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to= "/"/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to = "/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/> } />
        </Routes>

        <Toaster />
      </>
  );
}

export default App;