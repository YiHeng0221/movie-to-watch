import { MovieWrapper } from "./components";

export default function FavoritesPage() {
  return (
    <section className="px-4">
      <div className="flex justify-between items-center md:mt-20 mt-16 py-10">
        <h1 className="text-3xl font-bold">Favorites</h1>
      </div>
      <MovieWrapper />
    </section>
  );
}
