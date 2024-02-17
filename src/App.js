import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from  "./pages/header/Header";
import Dash from './pages/dash/Dash';
import NoMatch from './pages/noMatch/NoMatch';
import PostEmploy from './pages/employee/PostEmploy';
import Update from './pages/employee/Update';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Dash/>} />
        <Route path='*' element={<NoMatch/>} />
        <Route path='/employee' element={<PostEmploy/>} />
        <Route path='/employee/:id' element={<Update/>} />

      </Routes>
    </>

  );
}

export default App;
