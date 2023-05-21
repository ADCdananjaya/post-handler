/**
 * posts
 * currentPage
 * Size
 */

const paginate = (items, page, size) => {
  const array = [...items];
  const startIndex = (page - 1) * size;
  return array.splice(startIndex, size);
};

export default paginate;
