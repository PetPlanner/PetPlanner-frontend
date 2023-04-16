import "./App.css";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <Header />
      {getRoutes()}
    </div>
  );
}

export default App;
