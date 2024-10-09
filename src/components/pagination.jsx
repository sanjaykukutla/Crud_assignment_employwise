import React from 'react';

const PaginationComponent = ({ props }) => {
  const { totalPages, handlePageChange, currentPage } = props;

  const renderPaginationButtons = () => {
    const buttons = [];

    // Left Navigation Button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 m-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        &lt; {/* Left Arrow */}
      </button>
    );

    // First Page Button
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-4 py-2 m-1 rounded ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        1
      </button>
    );

    // Ellipsis if currentPage is greater than 3
    if (currentPage > 3) {
      buttons.push(<span key="ellipsis-left" className="px-2">...</span>);
    }

    // Adjacent Pages
    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 m-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis if currentPage is less than totalPages - 2
    if (currentPage < totalPages - 2) {
      buttons.push(<span key="ellipsis-right" className="px-2">...</span>);
    }

    // Last Page Button
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 m-1 rounded ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {totalPages}
        </button>
      );
    }

    // Right Navigation Button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 m-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        &gt; {/* Right Arrow */}
      </button>
    );

    return buttons;
  };

  return (
    <div className="flex justify-center items-center mt-12">
      {renderPaginationButtons()}
    </div>
  );
};

export default PaginationComponent;
