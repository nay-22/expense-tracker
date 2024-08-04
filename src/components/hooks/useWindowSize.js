import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [winSize, setWinSize] = useState({
        width: 0, height: 0
    });

    useEffect(() => {
        const handleResize = () => {
            setWinSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return winSize;

}

export default useWindowSize;