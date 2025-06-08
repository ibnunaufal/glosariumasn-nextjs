import { CloudUpload, NotebookPen } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContributionDialogButton({ user }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const addButtonClick = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    // Redirect to the search page with the search term
    router.push(`/kontribusi/${encodeURIComponent(searchValue.toUpperCase())}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 w-full">
          <CloudUpload className="mr-1 w-5 h-5" />
          Berkontribusi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-md font-bold">Berkontribusi</DialogTitle>
        {
          // if logged in, show the form to contribute
          user ? (
            <div className="items-center">
              <span className="text-sm text-gray-600">
                Masukkan kata, istilah, atau singkatan yang ingin ditambahkan.
              </span>

              <div>
                <Input
                  type="search"
                  placeholder="Masukkan istilah..."
                  className="mt-4"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <div>
                  <Button className="mt-3" onClick={addButtonClick}>
                    Tambahkan
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Anda dapat menambahkan detail istilah, singkatan, atau kata baru
                beserta definisinya setelah menekan tombol "Tambahkan".
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">
                Silakan login untuk berkontribusi
              </h2>
              <Button
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Button>
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  );
}
