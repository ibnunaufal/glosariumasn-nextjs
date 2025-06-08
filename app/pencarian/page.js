"use client";
import ContributionCard from "@/components/ContributionCard";
import Footer from "@/components/Footer";
import HeadComponent from "@/components/HeadComponent";
import SearchCard from "@/components/SearchCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeSearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const listOfAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleSearchButtonClick = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    // Redirect to the search page with the search term
    router.push(`/pencarian/${encodeURIComponent(searchValue.toUpperCase())}`);
  };

  return (
    <div className="h-screen py-2">
      <HeadComponent title={`Pencarian`} />

      <div className="my-4">
        <h1 className="text-xl font-bold">Cari berdasarkan abjad</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {listOfAlphabet.map((letter) => (
            <button
              key={letter}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => {
                router.push(`/pencarian/alfabet/${letter}`);
              }}
            >
              {letter}
            </button>
          ))}
          </div>
      </div>
      <SearchCard />
      {/* contribute */}
      <ContributionCard />

      <Footer />
    </div>
  );
}
