import { useEffect, useState } from 'react';
import userImg from '../assets/image/user.jpg';
import noImage from '../assets/image/no-img.png';
import './Blogs.css';
import { Form, useSubmit } from 'react-router-dom';

function Blogs({
  onBack,
  onCreateBlog,
  storage,
  setShowForm,
  showForm,
  title,
  setTitle,
  content,
  setContent,
}) {
  const [image, setImage] = useState(null);

  const [submit, setSubmit] = useState(false);
  const [check, setCheck] = useState(false);
  const [text, setText] = useState(false);
  const [contentClass, setContentClass] = useState(false);
  const [blog, setBlog] = useState([]);
  // const [storage, setStorage] = useState([]);

  let newBlog = {};
  // useState(() => {
  //   {
  //     submit && localStorage.setItem('blog ', JSON.stringify([newBlog]));
  //     setStorage([newBlog]);
  //     if (localStorage.getItem('blog')) {
  //       localStorage.removeItem('blog');
  //       setStorage((prev) => {
  //         let data = [...prev, newBlog];
  //         localStorage.setItem('blog', JSON.stringify(data));
  //         return data;
  //       });
  //     }
  //   }
  // }, [submit]);
  function handleImage(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const submitt = useSubmit();
  function handleSubmit(e) {
    e.preventDefault();
    newBlog = {
      image: image || noImage,
      title,
      content,
    };
    console.log(newBlog);
    submitt(newBlog, { method: 'post' });
    // setCheck((prev) => !prev);

    if (newBlog.title.length < 1) {
      setText(true);
      setContentClass(true);
    }

    if (newBlog.title && newBlog.content) {
      onCreateBlog(newBlog);
      storage(newBlog);
      setImage(null);
      setTitle('');
      setContent('');
      setShowForm(false);
      setSubmit(true);
    }
  }

  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="userImage" />
      </div>
      <div className="blog-right">
        {showForm ? (
          <div className="blog-right-form">
            <h1>New Post</h1>
            <Form
              className="form-upload-blog"
              onSubmit={handleSubmit}
              method="post"
            >
              <label htmlFor="form-upload" className="form-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input
                type="file"
                name="file"
                id="form-upload"
                onChange={handleImage}
              />
              <input
                type="text"
                name="title"
                placeholder="Add title {Max 60 characters}"
                className={!text ? 'title' : 'title red'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="textArea"
                className={!contentClass ? 'text' : 'text red'}
                placeholder="Add text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit Button
              </button>
            </Form>
          </div>
        ) : !submit ? (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            create New post
          </button>
        ) : (
          <div className="submitted">Post Submitted</div>
        )}

        <button className="blog-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
export default Blogs;
