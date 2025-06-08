import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";

export default function SearchCard() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchButtonClick = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    // Redirect to the search page with the search term
    router.push(`/pencarian/${encodeURIComponent(searchValue.toUpperCase())}`);
  };
  return (
    <Card className="p-6 min-w-[300px] bg-bg mb-2">
      {/* <span className=" flex justify-center caprasimo text-4xl my-5">
          glosarium
        </span> */}
      <div className="flex items-center justify-between"></div>
      <h1 className="text-xl font-bold">Pencarian</h1>

      <span className="text-sm text-gray-600">
        Masukkan kata kunci untuk mencari istilah yang Anda butuhkan.
      </span>

      <div>
        <Input
          type="text"
          placeholder="Cari istilah..."
          className="mt-4"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div>
          <Button className="mt-3" onClick={searchButtonClick}>
            Cari
          </Button>
        </div>
      </div>
    </Card>
  );
}
