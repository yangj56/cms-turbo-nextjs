import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={<ChevronLeft className="h-4 w-4" />}
      nextLabel={<ChevronRight className="h-4 w-4" />}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={onPageChange}
      className="flex items-center justify-center gap-2"
      pageClassName="flex items-center justify-center"
      pageLinkClassName="flex h-8 w-8 items-center justify-center rounded-sm text-sm hover:bg-gray-100"
      activeClassName="font-semibold"
      activeLinkClassName="ring-1 ring-gray-300"
      previousClassName="flex items-center justify-center"
      nextClassName="flex items-center justify-center"
      previousLinkClassName="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
      nextLinkClassName="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
      breakClassName="flex items-center justify-center"
      breakLinkClassName="flex h-8 w-8 items-center justify-center"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};
