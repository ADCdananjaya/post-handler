/**
 * numberOfPosts
 * pageSize
 * onPageChange
 * currentPage
 */

const Pagination = (props) => {
  if (props.count < props.size) return;
  const pages = Math.ceil(props.count / props.size);
  const array = [...Array(pages).keys()].map((key) => key + 1);

  const getClasses = (currentPage) => {
    if (props.currentPage === currentPage)
      return "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out";
    return "mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-transparent p-0 text-sm text-gray-500 transition duration-150 ease-in-out hover:bg-slate-300 hover:cursor-pointer";
  };

  return (
    <ul className="w-full flex justify-center mt-5">
      <li
        className={getClasses(0)}
        aria-label="Previous"
        onClick={() => props.onPageChange("left")}
      >
        <span className="material-icons text-sm">&larr;</span>
      </li>
      {array.map((item) => (
        <li
          key={item}
          className={getClasses(item)}
          onClick={() => props.onPageChange(item)}
        >
          {item}
        </li>
      ))}
      <li
        className={getClasses(0)}
        aria-label="Next"
        onClick={() => props.onPageChange("right")}
      >
        <span className="material-icons text-sm">&rarr;</span>
      </li>
    </ul>
  );
};

export default Pagination;
