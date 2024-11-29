import OrderBy from "@/components/OrderBy";
import { AutoCompleteSearchBarInput } from "@/components/AutoCompleteSearchBar";
import { SearchInfiniteScroll } from "@/components/InfiniteScroll";

export default function Page() {
  return (
    <div className="flex flex-col items-start h-screen md:mt-20 mt-16 py-10">
      <AutoCompleteSearchBarInput />
      <div className="w-full h-full px-4 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <OrderBy type="searchResults" />
        </div>
        <SearchInfiniteScroll />
      </div>
    </div>
  );
}
