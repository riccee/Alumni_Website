import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RoutesConfig from "./routes/RoutesConfig";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <RoutesConfig />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
