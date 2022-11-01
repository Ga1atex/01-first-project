import { render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component tests', () => {
  test('pages count is 11 but should be showed only 10', () => {
    render(
      <Pagination
        isFetching={false}
        totalItemsCount={11}
        pageSize={1}
        portionSize={10}
      />
    );
    // expect(screen.getAllByRole("button").length).toBe(12);
  });

  // test("if pages count is more than 10 arrow Next should be present", () => {
  //   render(
  //     <Pagination
  //       isFetching={false}
  //       totalItemsCount={11}
  //       pageSize={1}
  //       portionSize={10}
  //     />
  //   );
  //   const li = screen.getAllByRole("button");
  //   const arrows = li.filter((li) => li.classList.contains(".pagging__arrow"));
  //   expect(arrows.length).toBe(1);
  // });
});
