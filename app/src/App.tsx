import "./App.css";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";

function App() {
  return (
    <div className="App">
      <Header />
      {getRoutes()}
      <ToastContainer />
      <div className="landing__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
