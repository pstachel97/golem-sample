import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DeviceInfo } from './pages/DeviceInfo';
import * as routes from './routes/index.js';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route index path="/" element={<DeviceInfo/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App
