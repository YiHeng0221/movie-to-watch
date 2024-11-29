import { InfiniteScroll } from "@/components/InfiniteScroll";
export default function ListPage({ params }: { params: { type: string } }) {
  return (
    <section className="px-4">
      <div className="flex justify-between items-center md:mt-20 mt-16 py-10">
        <h1 className="text-3xl font-bold">
          {params.type.charAt(0).toUpperCase() + params.type.slice(1)}
        </h1>
      </div>
      <InfiniteScroll type={params.type} />
    </section>
  );
}
