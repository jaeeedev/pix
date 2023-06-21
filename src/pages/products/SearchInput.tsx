import type { FormEvent } from "react";
import { useTransition } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchInput = () => {
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="bg-slate-100 py-1 px-2 rounded-md text-sm font-medium"
        />
        <button className="absolute top-1/2 right-2 -translate-y-1/2">
          <HiMagnifyingGlass />
        </button>
      </form>

      <div className="absolute left-0 -bottom-10 w-full p-2 bg-white rounded-md z-[5] text-sm shadow-md">
        dd
      </div>
    </div>
  );
};

export default SearchInput;
