import { useEffect, useState } from "react";

// 當輸入值（value）改變時，會在指定的延遲時間（delay）後更新 debouncedValue
// 這樣可以避免在短時間內頻繁的觸發更新操作
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 設置一個定時器，在延遲時間後更新 debouncedValue
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // 在 useEffect 清理階段清除定時器，避免 memory leak
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
