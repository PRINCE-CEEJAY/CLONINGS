import {
  Bell,
  ListCollapse,
  MicIcon,
  Plus,
  Search,
  Youtube,
} from "lucide-react";
import React, { useState } from "react";

const YoutubeNav = () => {
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
      <ListCollapse className=" cursor-pointer" />
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
        <button
          className="p-1 bg-gray-100 rounded-lg cursor-pointer"
          onClick={handleSearch}
        >
          <Search size={30} />
        </button>
        <MicIcon
          size={40}
          className="p-1 ml-3 cursor-pointer bg-gray-100 rounded-md "
        />
      </div>
      <div></div>

      <div className="flex gap-4 items-center">
        <button className="flex text-xl  cursor-pointer justify-between items-center w-[120%] rounded-lg p-2 bg-gray-100">
          <Plus />
          Create
        </button>
        <Bell size={55} className=" cursor-pointer" />
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

export default YoutubeNav;
