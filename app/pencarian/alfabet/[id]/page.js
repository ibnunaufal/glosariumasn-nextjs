"use client";
import ContributionCard from "@/components/ContributionCard";
import Footer from "@/components/Footer";
import HeadComponent from "@/components/HeadComponent";
import SearchCard from "@/components/SearchCard";
import db from "@/utils/firestore";
import { collection, getDocs } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function AlphabetSearch({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (id) {
      fetchResults();
    }
  }, [id]);
  const fetchResults = async () => {
    try {
      // Simulate fetching results based on the alphabet letter
      // Replace this with actual data fetching logic
      const alphabetRef = collection(
        db,
        "list",
        String(id).toUpperCase(),
        "content"
      );
      const querySnapshot = await getDocs(alphabetRef);
      let temp = [];
      const words = querySnapshot.docs.map((doc) => {
        console.log("Document data:", doc.data()), doc.data().word;
        temp.push(doc.data().word);
      });
      console.log("Fetched words:", temp);
      setResults(temp);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="h-screen py-2">
      <HeadComponent title={`Pencarian`} />

      <div className="my-4 ">
        <h3 className="text-xl font-bold">
          Cari berdasarkan abjad:
          <br />
          <span className="text-blue-500 underline">{id}</span>
        </h3>
        <div>
          Total kata: <span className="font-bold">{results.length}</span>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="w-full">
          {results.map((word, index) => (
            <div key={index} className="p-1 border-b border-gray-200">
              <a
                href={`/pencarian/${encodeURIComponent(word)}`}
                className="underline hover:font-bold"
              >
                {word}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
      )}

      <Footer />
    </div>
  );
}
