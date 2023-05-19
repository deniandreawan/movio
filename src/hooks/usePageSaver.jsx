import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDidMount from "./useDidMount";

const usePageSaver = (path) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace("/", "");
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.movioPage ? JSON.parse(localStorage.movioPage)[p] : 1
  );
  const didMount = useDidMount();

  useLayoutEffect(() => {
    const storageItem = localStorage.getItem("movioPage");

    if (storageItem) {
      const movioPage = JSON.parse(storageItem);
      const page = movioPage[p];

      if (typeof movioPage[p] !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        "movioPage",
        JSON.stringify({
          [p]: currentPage,
        })
      );
    }
  }, []);

  useEffect(() => {
    const storageItem = localStorage.getItem("movioPage");

    if (didMount && storageItem) {
      const movioPage = JSON.parse(storageItem);

      localStorage.setItem(
        "movioPage",
        JSON.stringify({
          ...movioPage,
          [p]: currentPage,
        })
      );
    }
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
