import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import { TaskPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { Navigation } from './components/Navigation';

function App(){
  return(
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks"/>}/> 
        <Route path="/tasks" element={<TaskPage/>}/> 
        <Route path="/tasks-create" element={<TaskFormPage/>}/> 
        <Route path="/tasks/:id" element={<TaskFormPage/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App