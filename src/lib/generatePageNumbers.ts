// Helper function to generate page numbers with ellipsis
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblings: number = 1
): (number | 'ellipsis')[] {
  // Always show at least 2 pages at start and end
  const boundaryCount = 2;
  const totalPageNumbers = siblings * 2 + boundaryCount * 2 + 3;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, boundaryCount + 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblings,
    totalPages - boundaryCount
  );

  const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

  const pages: (number | 'ellipsis')[] = [];

  // Add first boundary pages
  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    pages.push(i);
  }

  // Left ellipsis
  if (showLeftEllipsis) {
    pages.push('ellipsis');
  }

  // Page numbers around current page
  const startPage = showLeftEllipsis ? leftSiblingIndex : boundaryCount + 1;
  const endPage = showRightEllipsis
    ? rightSiblingIndex
    : totalPages - boundaryCount;

  for (let i = startPage; i <= endPage; i++) {
    if (i > boundaryCount && i <= totalPages - boundaryCount) {
      pages.push(i);
    }
  }

  // Right ellipsis
  if (showRightEllipsis) {
    pages.push('ellipsis');
  }

  // Add last boundary pages
  for (
    let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1);
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return pages;
}
