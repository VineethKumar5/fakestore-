import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VideoLibraryIndex } from './components/video-library-index';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/add-video';
import { DeleteVideo } from './components/delete-video';
import { EditVideo } from './components/edit-video';
import { UserLogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UserDashboard } from './components/user-dashborad';

function App() {
  return (
    <div className="container-fluid">
         <BrowserRouter>
            <header className='bg-dark text-white p-2 text-center'>
                <h2>Video Library</h2>
            </header>
            <section>

               <Routes>
                   <Route path='/' element={<VideoLibraryIndex />} />
                   <Route path='admin-login' element={<AdminLogin />} />
                   <Route path='admin-dash' element={<AdminDashboard />} />
                   <Route path='add-video' element={<AddVideo />} />
                   <Route path='delete-video/:id' element={<DeleteVideo />} />
                   <Route path='edit-video/:id' element={<EditVideo />} />
                   <Route path='user-login' element={<UserLogin />} />
                   <Route path='user-register' element={<UserRegister />} />
                   <Route path='user-dash' element={<UserDashboard/>} />
               </Routes>


            </section>
         </BrowserRouter>
    </div>
  );
}

export default App;
