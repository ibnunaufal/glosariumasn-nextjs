import { CloudUpload, NotebookPen } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import ContributionDialogButton from "./ContributionDialogButton";

export default function ContributionWithDialog({ user }) {
    
  return (
    <div className="my-5">
      <div className="w-fit py-1 px-5 border-black border-t-2 border-x-2 rounded-t-base flex items-center font-bold">
        <NotebookPen className="mr-2 w-5 h-5" />
        Contribute
      </div>
      <div className="bg-bg p-4 rounded-r-base rounded-b-base border-2 border-black">
        <p className="text-sm text-justify">
          Ikut berkontribusi dengan menambahkan kata, istilah, atau singkatan
          beserta dengan definisinya agar dapat diketahui oleh masyarakat luas.
          😉{" "}
        </p>
        <br />
        <ContributionDialogButton user={user} />
      </div>
    </div>
  );
}
