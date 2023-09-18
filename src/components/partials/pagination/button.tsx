import { cn } from "paperwork-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  pagination: PaginationMeta;
  handleChange: (page: number) => void;
  pageLimit?: number;
};

export default function PaginationButton({ pagination, handleChange, pageLimit = 3 }: Props): JSX.Element | null {
  if (!pagination || pagination.total_count === 0) return null;

  const currentPage = pagination.current_page;
  const totalPages = pagination.page_count;

  const startPage = Math.max(pagination.current_page - Math.floor(pageLimit / 2), 1);
  const endPage = Math.min(startPage + pageLimit - 1, pagination.page_count);

  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <nav>
      <ul className="flex items-center h-10 space-x-2 text-sm">
        <li>
          <span
            onClick={() => (pagination.previous_page ? handleChange(pagination.previous_page) : null)}
            className={cn(
              "flex items-center justify-center w-10 h-10 leading-tight text-muted-foreground bg-white border border-input hover:bg-muted rounded-md cursor-pointer",
              (pagination.is_first_page || pagination.previous_page == null) && "cursor-not-allowed bg-white hover:bg-white text-muted-foreground/30"
            )}
          >
            <span className="sr-only">Sebelumnya</span>
            <ChevronLeft className="w-4 h-4" />
          </span>
        </li>
        {currentPage > pageLimit - 1 && (
          <li>
            <span
              className={cn(
                "cursor-pointer flex items-center justify-center h-10 w-10 rounded-md leading-tight border select-none",
                "bg-white text-muted-foreground border-input hover:bg-muted cursor-not-allowed"
              )}
            >
              ...
            </span>
          </li>
        )}
        {pagesToShow.map((page) => {
          return (
            <li key={page}>
              <span
                onClick={() => (currentPage !== page ? handleChange(page) : null)}
                className={cn(
                  "cursor-pointer flex items-center justify-center h-10 w-10 rounded-md leading-tight border select-none",
                  page === currentPage
                    ? "text-white border-primary bg-primary hover:bg-primary/90 pointer-events-none"
                    : "bg-white text-muted-foreground border-input hover:bg-muted"
                )}
              >
                {page}
              </span>
            </li>
          );
        })}
        {currentPage < totalPages - pageLimit + 2 && (
          <li>
            <span
              className={cn(
                "cursor-pointer flex items-center justify-center h-10 w-10 rounded-md leading-tight border select-none",
                "bg-white text-muted-foreground border-input hover:bg-muted cursor-not-allowed"
              )}
            >
              ...
            </span>
          </li>
        )}
        <li>
          <span
            onClick={() => (pagination.next_page ? handleChange(pagination.next_page) : null)}
            className={cn(
              "flex items-center justify-center w-10 h-10 leading-tight text-muted-foreground bg-white border border-input hover:bg-muted rounded-md cursor-pointer",
              (pagination.is_last_page || pagination.next_page == null) && "cursor-not-allowed bg-white hover:bg-white text-muted-foreground/30"
            )}
          >
            <span className="sr-only">Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </li>
      </ul>
    </nav>
  );
}
