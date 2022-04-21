import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component tests', () => {
  test('pages count is 11 but should be showed only 10', () => {
    const { container } = render(<Pagination isFetching={false} totalItemsCount={11} pageSize={1} portionSize={10} />);
    const li = container.querySelectorAll('li');
    expect(li.length).toBe(10);
  });

  test('if pages count is more than 10 arrow Next should be presesnt', () => {
    const { container } = render(<Pagination isFetching={false} totalItemsCount={11} pageSize={1} portionSize={10} />);
    const arrows = container.querySelectorAll('.pagging__arrow');
    expect(arrows.length).toBe(1);
  });
})
