import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser';
import Home from './components/Home';
import Update from './components/Update';
import Main from './layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        loader: () => fetch(`http://localhost:5001/users`),
        element: <Home />
      },
      {
        path: '/users/add',
        element: <AddUser />
      },
      {
        path: '/update/:id',
        loader: ({params}) => fetch(`http://localhost:5001/users/${params.id}`),
        element: <Update />
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
