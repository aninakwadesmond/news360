// import React from 'react';
import Calender from './Calender';
import Weather from './Weather';
import './News.css';
import UserImage from '../assets/image/user.jpg';
import Blog1 from '../assets/image/blog1.jpg';
import Blog2 from '../assets/image/blog2.jpg';
import Blog3 from '../assets/image/blog3.jpg';
import Blog4 from '../assets/image/blog4.jpg';
import noImage1 from '../assets/image/no-img.png';
import Modal from './Modal';
import Bookmark from './Bookmark';

const categories = [
  'general',
  'world',
  'business',
  'technology',
  'entertainment',
  'sports ',
  'science',
  'health',
  'nation',
];
console.log(categories);
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { json, useLoaderData } from 'react-router-dom';

function News({
  onShowBlog,
  blog,
  setShowForm,
  onOpener,
  resetTitle,
  resetContent,
}) {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategories] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectArticle, setselectArticle] = useState(null);
  const [showBookmark, setShowBookmark] = useState(false);
  const [boomarks, setBookmarks] = useState([]);
  const [parent, setParent] = useState('');
  const [filterBlog, setFilterBlog] = useState(false);
  const [checker, setChecker] = useState(filterBlog);
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [currentContainer, setCurrentContainer] = useState([]);
  const [dataMain, setDataMain] = useState([]);

  const ContainerBlog = useLoaderData();

  console.log(ContainerBlog);
  useEffect(() => {
    const fetchNews = async () => {
      // const key = `9430c3128033a6153997af83a0a91e5b`
      setIsLoading(true);
      `9430c3128033a6153997af83a0a91e5b`;
      let url = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=9430c3128033a6153997af83a0a91e5b`
      );

      if (searchQuery) {
        url = await fetch(
          `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=9430c3128033a6153997af83a0a91e5b`
        );
      }
      const response = await url.json();
      const { articles } = response;
      // const fetchData = response.data.articles;
      articles.forEach((ar) => {
        if (!ar.image) {
          ar.image = noImage1;
        }
      });
      console.log(articles);
      setHeadline(articles[0]);
      setNews(articles.slice(1, 7));
      setIsLoading(false);

      news && console.log(news);

      const savedBookmarks =
        JSON.parse(localStorage.getItem('bookmarks')) || [];
      setBookmarks(savedBookmarks);
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  function handleCategories(e, category) {
    e.preventDefault();
    setSelectedCategories(category);
  }

  function handleInput(e) {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  }

  function handleArticleClick(article) {
    setselectArticle(article);
    setShowModal(true);
  }
  function handleBookmarkClick(article) {
    setBookmarks((prevBooknarks) => {
      const updatedBookmark = prevBooknarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBooknarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBooknarks, article];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmark));

      return updatedBookmark;
    });
  }

  useEffect(() => {
    async function fetchData() {
      // if (!obj.image || !obj.title || obj.content) return;
      setDataMain(ContainerBlog.data);
      console.log('del');
      const response = await fetch(`http://localhost:4000/news/${obj.id}`, {
        method: 'delete',
      });
      if (!response.ok) {
        return json({ messsage: 'Not deleleted' }, { status: 402 });
      } else {
        // const responseData = await response.json();
        const response2 = await fetch('http://localhost:4000/news');
        if (!response2.ok) {
          return json({ message: 'not able to load data' }, { status: 402 });
        } else {
          const responseData = await response2.json();
          setCurrentContainer(responseData);
        }
        // console.log(responseData);
        // return responseData;
      }
    }
    fetchData();
  }, [obj?.id]);

  function handleDelete(blog1) {
    const currentBlog = blog1;
    const store = JSON.parse(localStorage.getItem('block'));

    const filteredItems = store.filter(
      (element) => element.title !== currentBlog.title
    );
    localStorage.removeItem('block');
    localStorage.setItem('block', JSON.stringify(filteredItems));

    setFilterBlog(() => {
      localStorage.setItem('block', JSON.stringify(filteredItems));

      return true;
    });
    setChecker(() => {
      setFilterBlog(false);
    });
  }

  function handleEdit() {
    onShowBlog;
    setShowForm(true);
  }
  function Loader() {
    return <p className="Loading">Loading...</p>;
  }
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleInput}>
            <input
              type="text"
              placeholder="Search News...."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div
            className="user"
            onClick={() => {
              setShowForm(false);
              onShowBlog();
            }}
          >
            <img src={UserImage} alt="user image" />
            <p className="create-blog">
              {`Create  blog`}
              <i className="bx bx-folder-plus"></i>
            </p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {[...categories].map((category, index) => (
                <a
                  href="#"
                  className="nav-link"
                  key={index}
                  onClick={(e) => handleCategories(e, category)}
                >
                  {category ? category : categories}
                </a>
              ))}
              {/* <a href="#" className="nav-link">
                World
              </a>
              <a href="#" className="nav-link">
                business
              </a>
              <a href="#" className="nav-link">
                technology
              </a>
              <a href="#" className="nav-link">
                entertainment
              </a>
              <a href="#" className="nav-link">
                sport
              </a>
              <a href="#" className="nav-link">
                science
              </a>
              <a href="#" className="nav-link">
                health
              </a>
              <a href="#" className="nav-link">
                nation
              </a> */}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmark(true)}
              >
                bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {isLoading ? (
            <Loader />
          ) : (
            headline && (
              <div
                className="headline"
                onClick={() => handleArticleClick(headline)}
              >
                <img src={headline.image || noImage1} alt={headline.title} />
                <div className="headline-content">
                  <div className="headline-items">
                    <span>{headline.title}</span>{' '}
                    <i
                      className={`${
                        boomarks.some(
                          (bookmark) => bookmark.title === headline.title
                        )
                          ? 'fa-solid'
                          : 'fa-regular'
                      } fa-bookmark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(headline);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="news-grid">
            {isLoading ? (
              <Loader />
            ) : (
              news.map((article, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => handleArticleClick(article)}
                >
                  <img src={article.image || noImage1} alt={article.title} />
                  <div className="grid-content">
                    <div className="headline-items grid-text">
                      <span>{article.title}</span>{' '}
                      <i
                        className={`${
                          boomarks.some(
                            (bookmark) => bookmark.title === article.title
                          )
                            ? 'fa-solid'
                            : 'fa-regular'
                        } fa-bookmark`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(article);
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Modal
          show={showModal}
          article={selectArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmark
          show={showBookmark}
          bookmarks={boomarks}
          onClose={() => setShowBookmark(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blog">
          <h1 className="my-blog-heading">My Blog</h1>
          <div className="blog-posts">
            {(currentContainer?.data?.length < dataMain.length
              ? currentContainer.data
              : dataMain
            ).map((blog1, index) => (
              <div className="blog-post" key={index}>
                <img src={blog1.image} alt={blog1.title} />
                <h3>{blog1.title}</h3>
                {/* <p>{blog1.content}</p> */}
                <div className="post-buttons">
                  <button className="edit-post">
                    <i
                      className="bx bxs-edit"
                      onClick={() => {
                        onOpener();
                        setShowForm;

                        resetTitle(blog1.title);
                        resetContent(blog1.content);
                        console.log(blog1);
                        handleDelete(blog1);
                      }}
                    ></i>
                  </button>
                  <button
                    className="delelte-post"
                    onClick={() => {
                      setObj(blog1);
                    }}
                  >
                    <i
                      className="bx bxs-x-circle"
                      onClick={() => handleDelete(blog1)}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
            {/* <div className="blog-post">
              <img src={Blog1} alt="iblog-image" />
              <h3>Lorem ipsum, dolor sit amet consectetur</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delelte-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={Blog2} alt="iblog-image" />
              <h3>Lorem ipsum, dolor sit amet consectetur</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delelte-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={Blog3} alt="iblog-image" />
              <h3>Lorem ipsum, dolor sit amet consectetur</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delelte-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={Blog4} alt="iblog-image" />
              <h3>Lorem ipsum, dolor sit amet consectetur</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delelte-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">
        <h3>🔍news & blog app</h3>
        <p>&copy; All Right Reserved. Code and Create</p>
      </footer>
    </div>
  );
}

export default News;
