import React, { useState } from 'react';

// --- Components ---

// 1. Navbar Component (Uses Props)
const Navbar = ({ currentView, setView, borrowedCount }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div className="container">
      <span className="navbar-brand fw-bold text-primary">CS E-Library</span>
      <div className="d-flex gap-3">
        <button 
          className={`btn ${currentView === 'home' ? 'btn-primary' : 'btn-outline-light'} btn-sm`}
          onClick={() => setView('home')}
        >
          Catalog
        </button>
        <button 
          className={`btn ${currentView === 'borrowed' ? 'btn-primary' : 'btn-outline-light'} btn-sm`}
          onClick={() => setView('borrowed')}
        >
          My Books ({borrowedCount})
        </button>
      </div>
    </div>
  </nav>
);

// 2. Book Card Component (Uses Props)
const BookCard = ({ book, onBorrow, isBorrowed }) => (
  <div className="col-md-6 col-lg-3 mb-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 align-self-start">{book.category}</span>
        <h5 className="card-title fw-bold">{book.title}</h5>
        <p className="card-text text-muted small mb-4">By {book.author}</p>
        <button 
          className={`btn mt-auto ${isBorrowed ? 'btn-success disabled' : 'btn-primary'}`}
          onClick={() => onBorrow(book)}
          disabled={isBorrowed}
        >
          {isBorrowed ? 'Borrowed' : 'Borrow Book'}
        </button>
      </div>
    </div>
  </div>
);

// --- Main Application ---
export default function App() {
  // State Management (useState)
  const [currentView, setCurrentView] = useState('home');
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Mock Database
  const libraryBooks = [
    { id: 1, title: "Advanced Data Structures and Algorithms", author: "Narasimha Karumanchi", category: "Computing" },
    { id: 2, title: "Database Management Systems", author: "Raghu Ramakrishnan", category: "Engineering" },
    { id: 3, title: "Introduction to Automata Theory", author: "John E. Hopcroft", category: "Theory" },
    { id: 4, title: "Core Java: Fundamentals", author: "Cay S. Horstmann", category: "Programming" }
  ];

  // Interactive UI Function
  const handleBorrow = (book) => {
    if (!borrowedBooks.find(b => b.id === book.id)) {
      setBorrowedBooks([...borrowedBooks, book]);
    }
  };

  const handleReturn = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        borrowedCount={borrowedBooks.length} 
      />

      <div className="container mt-5">
        {/* Dynamic View Toggling */}
        {currentView === 'home' ? (
          <div>
            <h2 className="fw-bold mb-4">Library Catalog</h2>
            <div className="row">
              {libraryBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onBorrow={handleBorrow}
                  isBorrowed={borrowedBooks.some(b => b.id === book.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="fw-bold mb-4">My Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
              <div className="alert alert-info">You haven't borrowed any books yet.</div>
            ) : (
              <div className="row">
                {borrowedBooks.map(book => (
                  <div key={book.id} className="col-md-6 mb-3">
                    <div className="card shadow-sm border-0">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">{book.title}</h6>
                          <small className="text-muted">{book.author}</small>
                        </div>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReturn(book.id)}
                        >
                          Return
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}