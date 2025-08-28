import React from 'react';
import UserImage from '../assets/image/user.jpg';

const Modal = ({ show, article, onClose }) => {
  if (!show) return;
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <i className="fas fa-window-close" onClick={onClose}></i>
          {article && (
            <>
              <img src={article.image} alt={article.title} />
              <h4>{article.title}</h4>
              <div className="source-date">
                <p>Source: {article.source.name}</p>
                <p>
                  {new Date(article.publishedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>{article.content}</div>
              <a href={article.url} target="_blank" rel="noopener  noreferrer">
                <button>Read more</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
