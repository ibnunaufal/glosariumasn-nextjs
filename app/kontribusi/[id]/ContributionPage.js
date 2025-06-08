"use client";
import Footer from "@/components/Footer";
import HeadComponent from "@/components/HeadComponent";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/utils/auth";
import db from "@/utils/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@firebase/firestore";
import { Accordion, AccordionHeader } from "@radix-ui/react-accordion";
import moment from "moment";
import { useEffect, useState } from "react";

export default function ContributionPage({ id }) {
  const [definitionList, setDefinitionList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [definition, setDefinition] = useState({
    abbreviation: "",
    definition: "",
    created_by: "",
    updated_by: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    if (id) {
      fetchDefinitions();
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName || "User");
        setEmail(user.email || "Email not available");
      }
    });
  }, [id]);

  const fetchDefinitions = async () => {
    try {
      const definitionsRef = collection(
        db,
        "words",
        String(id).toUpperCase(),
        "definitions"
      );
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

  const addDefinition = async () => {
    if (!definition.abbreviation || !definition.definition) {
      alert("Abbreviation and definition cannot be empty.");
      return;
    }

    try {
      // Check if the word exists
      const wordRef = doc(db, "words", String(id).toUpperCase());
      const wordDoc = await getDoc(wordRef);
      if (!wordDoc.exists()) {
        // If the word does not exist, create it
        await setDoc(wordRef, {
          word: String(id).toUpperCase(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: `${name}|${email}`, // Replace with actual user info
          updated_by: `${name}|${email}`, // Replace with actual user info
        });
      }
      // Add the definition to the definitions subcollection
      const definitionsRef = collection(
        db,
        "words",
        String(id).toUpperCase(),
        "definitions"
      );
      const newDefinitionRef = doc(definitionsRef);
      await setDoc(newDefinitionRef, {
        ...definition,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: `${name}|${email}`, // Replace with actual user info
        updated_by: `${name}|${email}`, // Replace with actual user info
      });

      setDefinitionList((prev) => [
        ...prev,
        { id: newDefinitionRef.id, ...definition },
      ]);
      setDefinition({ abbreviation: "", definition: "" });

      // add word to user
      const userWordsRef = collection(db, "users", email, "added_words");
      await addDoc(userWordsRef, {
        word: String(id).toUpperCase(),
        abbreviation: definition.definition,
      });

      // add contribution count
      const userRef = doc(db, "users", email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const contributionCount = (userDoc.data().contribution_count || 0) + 1;
        await setDoc(userRef, { contribution_count: contributionCount }, { merge: true });
      } else {
        await setDoc(userRef, { contribution_count: 1 });
      }

      // add word to list
      let firstChar = String(id).toUpperCase().charAt(0);
      const listRef = collection(db, "list", String(firstChar).toUpperCase(), "content");
      await addDoc(listRef, {
        word: String(id).toUpperCase(),
      });
      // go to page 'pencarian/{id}'
      window.location.href = `/pencarian/${String(id).toUpperCase()}`;
    } catch (error) {
      console.error("Error adding definition:", error);
    }
  };

  return (
    <div className="h-screen py-2">
      <HeadComponent title={`Kontribusi`} />

      <div className="mb-4">
        <h1 className="text-2xl font-bold">Berkontribusi</h1>
        <p className=" mb-1">Ikut berkontribusi dengan menambahkan keterangan pada kata di bawah ini</p>
      </div>

      <Card className="w-full mt-4 mb-8 bg-bg">
        <CardHeader className="mb-2">
          <CardTitle className="text-lg font-semibold">
            Tambah istilah
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
             <div>
              <label className="block text-sm font-medium mb-1">
                Kosakata
              </label>
              <Input
                type="text"
                disabled
                value={String(id).toUpperCase()}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Singkatan dari
              </label>
              <Input
                type="text"
                value={definition.abbreviation}
                onChange={(e) =>
                  setDefinition({
                    ...definition,
                    abbreviation: e.target.value,
                  })
                }
                className="mt-1"
                placeholder="Masukkan singkatan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Definisi</label>
              <Textarea
                value={definition.definition}
                onChange={(e) =>
                  setDefinition({
                    ...definition,
                    definition: e.target.value,
                  })
                }
                className="mt-1"
                placeholder="Masukkan definisi"
              />
            </div>
            <Button
              type="button"
              className="hover:bg-blue-700"
              onClick={() => {
                addDefinition();
              }}
            >
              Tambah Definisi Baru
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 mb-2">
        <p className=" mb-1">Definisi yang telah ditambahkan sebelumnya:</p>
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
        <p className="text-gray-500">Belum ada hasil ditemukan.</p>
      )}
      <Footer />
    </div>

  );
}
