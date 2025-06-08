"use client";
import ContributionCard from "@/components/ContributionCard";
import Footer from "@/components/Footer";
import HeadComponent from "@/components/HeadComponent";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auth } from "@/utils/auth";
import db from "@/utils/firestore";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { Accordion, AccordionHeader } from "@radix-ui/react-accordion";
import { CloudUpload, Link, NotebookPen, Share } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function SearchPage({ id }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [definitionList, setDefinitionList] = useState([]);

  useEffect(() => {
    if (id) {
      fetchDefinitions();
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [id]);

  const fetchDefinitions = async () => {
    try {
      const definitionsRef = collection(db, "words", id, "definitions");
      const querySnapshot = await getDocs(definitionsRef);
      const definitions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Definitions:", definitions);
      var tempDefinitions = [];
      definitions.map((def) => {
        let t = {
          id: def.id,
          definition:
            def.definition ||
            def.text ||
            def.content ||
            "No definition available",
          abbreviation: def.abbreviation || "No abbreviation available",
          created_at: def.created_at || "No date available",
          created_by: def.created_by || "No creator available",
          updated_at: def.updated_at || "No date available",
          updated_by: def.updated_by || "No updater available",
        };
        tempDefinitions.push(t);
      });
      console.log("Temp Definitions:", tempDefinitions);
      if (tempDefinitions.length != 0) setDefinitionList(tempDefinitions);
    } catch (error) {
      console.error("Error fetching definitions:", error);
    }
  };

  const addButtonClick = () => {
    // Redirect to the search page with the search term
    if (!user) {
      router.push(
        "/login?message=Silahkan login dahulu&redirect=kontribusi/" +
          id
      );
    } else {
      router.push("/kontribusi/" + id);
    }
  };
  return (
    <div className="h-screen py-2">
      <HeadComponent title={`Pencarian`} />

      <div className="mb-4">
        <p className=" mb-1">Berikut hasil Pencarian untuk kata</p>
        <h1 className="text-2xl font-bold">{id}</h1>
      </div>

      {definitionList.length > 0 ? (
        <div key={id} className="w-full">
          <Accordion
            className="w-full mb-2 lg:w[unset]"
            type="single"
            collapsible
            defaultValue={`item-0`}
          >
            {definitionList.map((word, index) => (
              <AccordionItem key={index} value={`item-${index}}`}>
                <AccordionHeader>
                  <AccordionTrigger className="w-full text-left">
                    {word.abbreviation || "No abbreviation available"}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="p-4">
                  {/* You can add more content here if needed */}
                  <p>Definisi:</p>
                  <p className="text-md">{word.definition}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {moment(word.created_at).format("DD MMMM YYYY HH:mm")}
                    <br />
                    Oleh: {word.created_by}
                    <br />
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
      )}

      <div className=" text-center items-center mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="neutral" className="mt-2">
              <Share size={24} />
              Bagikan Halaman Ini
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <span className="flex justify-center mb-2">Bagikan melalui</span>
              <div className="flex justify-evenly p-1">
                <WhatsappShareButton
                  url={`https://yaw.my.id/qris/${id}`}
                  title={`${id}`}
                >
                  <WhatsappIcon size={24} />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={`https://yaw.my.id/qris/${id}`}
                  title={`${id}`}
                >
                  <TelegramIcon size={24} />
                </TelegramShareButton>
                <FacebookShareButton
                  url={`https://yaw.my.id/qris/${id}`}
                  quote={`${id}`}
                >
                  <FacebookIcon size={24} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://yaw.my.id/qris/${id}`}
                  title={`${id}`}
                >
                  <TwitterIcon size={24} />
                </TwitterShareButton>
              </div>
              <span className="flex justify-center mb-2">Atau</span>
              <Button className="w-full bg-white">
                <Link size={24} />
                Salin link
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* contribute */}
      <ContributionCard id={id} />
      <Footer />
    </div>
  );
}
