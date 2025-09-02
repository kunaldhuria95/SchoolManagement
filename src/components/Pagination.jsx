"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const PaginationComponent= ({ page, setPage, totalPages }) => {

  const generatePaginationRange = (totalPages) => {
    const pageRange = [];
    const rangeLimit = 5;
    const startPage = Math.max(1, page - Math.floor(rangeLimit / 2));
    const endPage = Math.min(totalPages, startPage + rangeLimit - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }
    return pageRange;
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Pagination>
      <PaginationContent>

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && handlePageChange(page - 1)}
            aria-disabled={page <= 1}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
          />
        </PaginationItem>

        {/* Page Numbers */}
        {generatePaginationRange(totalPages).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              onClick={() => handlePageChange(pageNumber)}
              className={`cursor-pointer p-2 rounded-md ${
                page === pageNumber ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              style={{
                pointerEvents: page === pageNumber ? "none" : "auto",
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis if pages are hidden */}
        {page + 3 < totalPages && (
          <PaginationItem>
            <PaginationLink className="cursor-default p-2 rounded-md">...</PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && handlePageChange(page + 1)}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
