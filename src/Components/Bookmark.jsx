// import React from 'react';
import './Bookmark.css';
import demoImg from '../assets/image/demo.jpg';

function Bookmark({
  show,
  onClose,
  bookmarks,
  onSelectArticle,
  onDeleteBookmark,
}) {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-container ">
      <div className="modal bookmark">
        <div className="modal-content">
          <span className="icon" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </span>
          <h2 className="bookmark-heading">Bookmark News</h2>
          <div className="bookmark-list" onClick={onClose}>
            {bookmarks.map((article, index) => (
              <div
                className="bookmark-item"
                key={index}
                onClick={() => onSelectArticle(article)}
              >
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <span
                  className="delete-bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBookmark(article);
                  }}
                >
                  <i className="fa-regular fa-circle-xmark  cancelme"></i>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
