import useDidMount from "@/hooks/useDidMount";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 *
 * @param {string} path
 */

const usePageSaver = (path) => {
    const { pathname } = useLocation();
    const p = path || pathname.replace("/", "");
    const [currentPage, setCurrentPage] = useState(() =>
        localStorage.movioPage ? JSON.parse(localStorage.movioPage)[p] : 1
    );
    const didMount = useDidMount();

    useLayoutEffect(() => {
        if (localStorage.movioPage) {
            const movioPage = JSON.parse(localStorage.getItem("movioPage"));
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
    }, [currentPage, p]);

    useEffect(() => {
        if (didMount) {
            const movioPage = JSON.parse(localStorage.getItem("movioPage"));

            localStorage.setItem(
                "movioPage",
                JSON.stringify({
                    ...movioPage,
                    [p]: currentPage,
                })
            );
        }
    }, [currentPage, didMount, p]);

    return { currentPage, setCurrentPage };
};

export default usePageSaver;
