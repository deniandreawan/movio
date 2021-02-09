import { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
    useLayoutEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = "Movio | Movie Browser";
        }
    }, [title]);
};

export default useDocumentTitle;
