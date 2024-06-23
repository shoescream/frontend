import styled from 'styled-components';

interface PagingProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const RenderPageNumbers = ({
  totalPages,
  currentPage,
  handlePageChange,
}: PagingProps) => {
  const startPage = Math.max(1, currentPage - Math.floor(10 / 2));
  const endPage = Math.min(totalPages, startPage + 10 - 1);

  const pageNumbers = [];
  if (startPage > 1) {
    pageNumbers.push(
      <PageNumber key="first" onClick={() => handlePageChange(1)}>
        {1}
      </PageNumber>
    );
  }

  if (startPage > 2) {
    pageNumbers.push(
      <PageNumber key="firstDot" disabled>
        ...
      </PageNumber>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <PageNumber
        key={i}
        onClick={() => handlePageChange(i)}
        active={currentPage === i ? 1 : 0}
      >
        {i}
      </PageNumber>
    );
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push(
      <PageNumber key="lastDot" disabled>
        ...
      </PageNumber>
    );
  }

  if (endPage < totalPages) {
    pageNumbers.push(
      <PageNumber key="last" onClick={() => handlePageChange(totalPages)}>
        {totalPages}
      </PageNumber>
    );
  }
  return <Pagination>{pageNumbers}</Pagination>;
};

const Pagination = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`;

const PageNumber = styled.span<{ active?: number; disabled?: boolean }>`
  margin: 0 0.5rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

export default RenderPageNumbers;
