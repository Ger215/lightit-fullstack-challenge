export interface PaginationResult<T> {
  paginatedData: T[];
  totalPages: number;
}

export function paginate<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): PaginationResult<T> {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { paginatedData, totalPages };
}

export function goToNextPage(currentPage: number, totalPages: number): number {
  return currentPage < totalPages ? currentPage + 1 : currentPage;
}

export function goToPreviousPage(currentPage: number): number {
  return currentPage > 1 ? currentPage - 1 : currentPage;
}

export function goToPage(page: number, totalPages: number): number {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}
