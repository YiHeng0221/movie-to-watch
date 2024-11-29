import { useRef, useEffect } from "react";
const useIntersectionObserver = (
  totalPages: number,
  isLoading: boolean,
  setPage: (page: number) => void,
  page: number,
) => {
  const loader = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const currentLoader = loader.current;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && page < totalPages && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [totalPages, isLoading, page, setPage]);
  return loader;
};

export default useIntersectionObserver;
