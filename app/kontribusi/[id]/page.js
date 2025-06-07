
import { doc, getDoc } from "@firebase/firestore";
import db from "@/utils/firestore";
import ContributionPage from "./ContributionPage";

export async function generateMetadata({ params }) {
  // Ensure params is awaited properly
  const id = params?.id; 
  if (!id) {
    return {
      title: "Pencarian | GlosariumASN",
      description: "Hasil pencarian di GlosariumASN",
    };
  }

  // // Fetch data from Firestore
  // const qrisRef = doc(db, "words", id);
  // try {
  //   const docSnap = await getDoc(qrisRef);
  //   if (docSnap.exists()) {
  //     return {
  //       title: `QRIS ${docSnap.data().name} | Glosarium` || "QRIS Page | Glosarium",
  //       description: `: ${docSnap.data().name}`,
  //     };
  //   }
  // } catch (error) {
  //   console.error("Error fetching metadata:", error);
  // }

  return {
    title: `Pencarian ${id} | Glosarium`,
    description: "Hasil pencarian " + id,
  };
}

export default function Contribute({ params }) {
  return <ContributionPage id={params.id} />;
}