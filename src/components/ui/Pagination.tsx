import { usePagination, DOTS } from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import ChevrontLeft from "../icons/chevron/Left";
import ChevrontRight from "../icons/chevron/Right";

type TPagination = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};

const Pagination: React.FC<TPagination> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const navigate = useNavigate();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as (string | number)[] | undefined;

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    navigate(`/dashboard?current_page=${currentPage + 1}`);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    navigate(`/dashboard?current_page=${currentPage - 1}`);
  };

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  return (
    <ul className={className || ""}>
      <li
        id="pagination-item"
        className={`mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-center text-black/[0.87] sm:mx-1.5 ${currentPage === 1 ? "pointer-events-none text-black/[0.43]" : ""} hover:bg-black/[0.04] hover:dark:bg-white/[0.08]`}
        onClick={onPrevious}
      >
        <ChevrontLeft className="size-4 stroke-gray-900 stroke-1 dark:stroke-gray-200" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className="mx-1 flex h-8 w-8 cursor-default items-center justify-center text-center text-gray-900 sm:mx-1.5 dark:text-gray-200"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            id="item-number"
            key={index}
            className={`mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-center text-gray-900 sm:mx-1.5 dark:text-gray-200 ${pageNumber === currentPage ? "bg-black/[0.08] dark:bg-white/[0.08]" : "hover:bg-black/[0.04] hover:dark:bg-white/[0.08]"} text-[13px] leading-[1.43] tracking-[0.01071em]`}
            onClick={() => {
              onPageChange(pageNumber as number);
              navigate(`/dashboard?current_page=${pageNumber}`);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-center text-black/[0.87] sm:mx-1.5 ${currentPage === lastPage ? "pointer-events-none text-black/[0.43]" : ""} text-gray-900 hover:bg-black/[0.04] dark:text-gray-200`}
        onClick={onNext}
      >
        <ChevrontRight className="size-4 stroke-gray-900 stroke-1 dark:stroke-gray-200" />
      </li>
    </ul>
  );
};

export default Pagination;
