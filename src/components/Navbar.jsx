import { Bell, ListCollapse, Plus, Search, Youtube } from "lucide-react";
import React, { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Enter a value to search for");
      return;
    }
    alert(`Searching for: ${search}`);
  };
  return (
    <div className="flex p-2 justify-around items-center">
      <ListCollapse />
      <div className="flex gap-1 items-center cursor-pointer">
        <Youtube size={35} className="bg-red-700 text-white p-1 rounded-md" />
        <h2 className="font-bold text-2xl">Youtube</h2>
        <p>NG</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="search"
          value={search}
          placeholder="Search Here ..."
          onChange={(e) => setSearch(e.target.value)}
          className="font-bold w-sm border-2 border-black h-10 rounded-[40px] p-2"
        />
        <button className="p-1 bg-gray-300 rounded-lg" onClick={handleSearch}>
          <Search size={35} />
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <button className="flex text-xl justify-between items-center w-[120%] rounded-lg p-2 bg-gray-200">
          <Plus />
          Create
        </button>
        <Bell size={55} />
      </div>
      <div>
        <img
          width={40}
          src="/profile.jpg"
          alt="Sign In"
          className="rounded-full cursor-pointer p-2"
        />
      </div>
    </div>
  );
};

export default Navbar;
