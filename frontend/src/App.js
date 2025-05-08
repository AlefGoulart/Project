import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* componentes */
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Container from "./components/layouts/Container";
import Message from './components/layouts/Message'

/* importar paginas */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import FavoriteLists from "./components/pages/FavoriteProducts/FavoriteLists";
import AddFavoriteList from "./components/pages/FavoriteProducts/AddFavoriteList";
import EditFavoriteList from "./components/pages/FavoriteProducts/EditFavoriteList";

/* Context */
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/favoriteProducts/favoriteLists" element={<FavoriteLists />}></Route>
            <Route path="/favoriteProducts/add" element={<AddFavoriteList />}></Route>
            <Route path="/favoriteProducts/edit/:id" element={<EditFavoriteList />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
