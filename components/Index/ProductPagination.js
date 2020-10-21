import { Container, Pagination } from 'semantic-ui-react';
import { useRouter } from 'next/router';

function ProductPagination({ totalPages }) {
  const router = useRouter();
  return (
    <Container textAlign="center" style={{ margin: '2em 0' }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(e, data) => {
          data.activePage === 1
            ? router.push('/')
            : router.push(`/?page=${data.activePage}`);
        }}
      />
    </Container>
  );
}

export default ProductPagination;
