import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import RoutesConfig from './routes/RoutesConfig';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <RoutesConfig />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;