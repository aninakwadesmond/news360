// import React from 'react';
import { useEffect, useState } from 'react';
import Blogs from './Components/Blogs';
import News from './Components/News';
import './index.css';
import { json, redirect } from 'react-router-dom';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blog, setBlog] = useState([]);
  const [data, setData] = useState(blog);
  const [store, setStore] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // localStorage.clear();
  function handleCreateBlog(newBlog) {
    setBlog((prevBlog) => [...prevBlog, newBlog]);
  }

  function handleShowBlog() {
    setShowNews(false);
    setShowBlog(true);
  }
  function handleOpener() {
    handleShowBlog();
    setShowForm(true);
    setTitle(title);
    setContent(content);
  }
  function handleBackNews() {
    setShowBlog(false);
    setShowNews(true);
  }
  function handleStorage(newBlog) {
    {
      localStorage.getItem('block')
        ? setStore((old) => {
            let data = [...old, newBlog];
            // .reduce(
            //   (ac, cur) =>
            //     ac.includes(cur) || ac.includes(cur) ? ac : [...old, newBlog],
            //   [old]
            // );
            localStorage.setItem('block', JSON.stringify(data));
            console.log(data);
            return data;
          })
        : localStorage.setItem(
            'block',
            JSON.stringify([newBlog]),
            setStore([newBlog])
          );
    }
  }
  // function handleDetails() {
  //   set;
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     // if (!content || !title) return;
  //     console.log('hello');
  //     const response = fetch('http://localhost:3000/blog', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.parse(data),
  //     });
  //   }
  //   fetchData();
  // }, [data.length]);

  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && (
          <News
            onShowBlog={handleShowBlog}
            blog={blog}
            setShowForm={setShowForm}
            onOpener={handleOpener}
            title={title}
            content={content}
            resetTitle={setTitle}
            resetContent={setContent}
          />
        )}
        {showBlog && (
          <Blogs
            onBack={handleBackNews}
            onCreateBlog={handleCreateBlog}
            storage={handleStorage}
            setShowForm={setShowForm}
            showForm={showForm}
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
          />
        )}
      </div>
    </div>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const dataForm = Object.fromEntries(data);
  console.log(dataForm, request.method);
  const response = await fetch('http://localhost:4000/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataForm),
  });
  if (!response.ok) {
    return json({ message: 'Not found' }, { status: 404 });
  } else {
    console.log('done');
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
}
export async function loader({ request, params }) {
  const response = await fetch('http://localhost:4000/news');
  if (!response.ok) {
    return json({ message: 'Not found' }, { status: 404 });
  } else {
    console.log('done');
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
}

export default App;
