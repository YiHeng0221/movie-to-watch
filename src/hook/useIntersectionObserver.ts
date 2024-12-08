import { useRef, useEffect } from "react";

const useIntersectionObserver = (
  totalPages: number, // 總頁數
  isLoading: boolean, // 當前是否正在加載
  setPage: (page: number) => void, // 設置頁數的函數
  page: number, // 當前頁數
) => {
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // IntersectionObserver 的配置選項
    const options = {
      root: null, // root element 為視窗
      rootMargin: "20px", // root element 的外邊距
      threshold: 1.0, // 目標 element 完全進入視窗時觸發
    };

    // 保存當前的 loader 以便在清理時使用
    const currentLoader = loader.current;

    // IntersectionObserver 是一個用於監聽元素是否進入視窗的 API
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      // 當目標 element 進入視窗，且頁數未達到總頁數，且不在加載中時，頁數加一
      if (target.isIntersecting && page < totalPages && !isLoading) {
        setPage(page + 1);
      }
    };

    // 創建 IntersectionObserver instance
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current); // 開始觀察目標 element
    }

    // 取消觀察
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [totalPages, isLoading, page, setPage]);

  // 返回 ref 以便在組件中綁定到 DOM  element
  return loader; // 返回 ref 對象
};

export default useIntersectionObserver;
