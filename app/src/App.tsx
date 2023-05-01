import "./App.css";
import Footer from "./layouts/footer";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <Header />
      {getRoutes()}
      <div className="landing__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
