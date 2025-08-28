import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { action as FormAction } from './App';
import { loader } from './App';

const router = createBrowserRouter([
  { path: '', element: <App />, action: FormAction, loader: loader },
]);

function News() {
  return <RouterProvider router={router}></RouterProvider>;
}
// function App() {
//   return <RouterProvider router={router} />;
// }

export default News;
