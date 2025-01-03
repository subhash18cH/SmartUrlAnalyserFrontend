import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import QrCode from "./components/QrCode";
import LinkPage from "./components/LinkPage";
import Analytics from "./components/Analytics";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home";
import Create from "./components/Create";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/qr-code" element={<QrCode />} />
        <Route path="/link-page" element={<LinkPage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;