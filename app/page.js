"use client";
import { auth } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AppWindow,
  BookOpenText,
  CloudUpload,
  HandCoins,
  Lightbulb,
  ListChecks,
  LogOut,
  MapPinned,
  Menu,
  MessageCircleQuestion,
  NotebookPen,
  Scroll,
  Search,
  Sparkles,
  Sun,
  UploadCloud,
  User,
} from "lucide-react";
import moment from "moment";
import JadwalSholat from "./JadwalSholat";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import Hijriah1446 from "./HijriCalendar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import SearchCard from "@/components/SearchCard";
import ContributionWithDialog from "@/components/ContributionWithDialog";
import ContributionDialogButton from "@/components/ContributionDialogButton";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const menu = [
    {
      name: "Kontribusi",
      href: "/kontribusi",
      icon: <UploadCloud />,
    },
   
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // router.push("/login");
      } else {
        // console.log(JSON.stringify(authUser));
        setUser(authUser);
      }
    });
    // getNextPrayer();
    // console.log(JSON.stringify(user));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const searchButtonClick = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    // Redirect to the search page with the search term
    router.push(`/pencarian/${encodeURIComponent(searchValue.toUpperCase())}`);
  };

   

  return (
    <div>
      {/* top item */}
      <div className="flex justify-between my-5">
        <div className="flex flex-col justify-center">
          <span className=" text-lg caprasimo"></span>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <span className=" text-lg">GlosariumASN</span>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {user ? (
                  <div className="flex flex-col items-center">
                    <Avatar className="mb-2">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>
                        {String(user.displayName).substring(0, 3)}
                      </AvatarFallback>
                    </Avatar>
                    <span className=" text-sm mb-4">{user.displayName}</span>
                    <Button
                        onClick={() => {
                          router.push("/pencarian");
                        }}
                        className=" w-full mb-4"
                      >
                        <Search className="mr-2 w-5 h-5" />
                        Pencarian
                      </Button>
                    <ContributionDialogButton user={user} />
                    <hr className="w-full my-5" />
                    <Button
                      onClick={() => {
                        router.push("/profile");
                      }}
                      className=" w-full mb-4"
                    >
                      <User className="mr-2 w-5 h-5" />
                      Profile
                    </Button>
                    <hr className="w-full mt-5" />
                    <Button className="mt-5" onClick={handleLogout}>
                      <LogOut className="mr-2 w-5 h-5" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* welcome section */}
      <div className=" flex items-center rounded-md my-10">
        <div>
          <h6 className=" text-sm font-normal">Selamat Datang di </h6>
          <div>
            <h2 className=" text-2xl font-bold">GlosariumASN 👋</h2>
            <span className=" text-sm">
              Aplikasi daftar istilah yang sering digunakan dalam lingkungan ASN
            </span>
          </div>
        </div>
        <div className="ml-4">
          <Image
            src="/logo.png"
            alt="Glosarium ASN Logo"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
      </div>

     <SearchCard />

      {/* app explanation */}
      <div className="my-5">
        <div className="w-fit bg-card-primary py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
          <Lightbulb className="mr-2 w-5 h-5" />
          Apa itu Glosarium?
        </div>
        <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
          <p className="text-sm text-justify">
            GlosariumASN adalah aplikasi yang menyediakan daftar istilah yang
            sering digunakan dalam lingkungan ASN (Aparatur Sipil Negara).
            Aplikasi ini bertujuan untuk membantu ASN memahami istilah-istilah
            yang mungkin belum familiar, sehingga dapat meningkatkan pemahaman
            dan kinerja dalam tugas-tugas mereka.
          </p>
        </div>
      </div>

      {/* contribute */}
      <ContributionWithDialog user={user} />

      <Footer />
    </div>
  );
}
