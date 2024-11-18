import { Button } from "./ui/button.tsx";
import ArchiveIcon from "../assets/icon-archive.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import RestoreIcon from "../assets/icon-restore.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import { useNotes } from "../service/useNotes.ts";
export default function ActionBar() {
  const { useDeleteNote, useNotesQuery } = useNotes();
  const notes = useNotesQuery();
  const deleteNote = useDeleteNote();
  const location = useLocation();
  const navigate = useNavigate();
  const { noteID } = useParams();
  const pathname = location.pathname.split("/");
  const queryClient = useQueryClient();

  const handleArchive = async () => {};

  const handleDelete = async () => {
    const index = notes.data.findIndex((note: Note) => note.id === noteID);
    const navigateToNoteIndex: Note | null =
      notes.data.length > 1 ? notes.data[index - 1] : null;
    try {
      await deleteNote.mutateAsync(noteID!, {
        onSuccess: () => {
          if (navigateToNoteIndex) {
            navigate(`/app/home/${navigateToNoteIndex.id}`);
          } else {
            navigate(`/app/home`);
          }
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
    } catch (err) {
      console.error(err);
    }
  };

  return pathname[2] === "home" ? (
    <div className={"flex flex-col gap-2"}>
      <Dialog>
        <DialogTrigger>
          <div
            className={
              "inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus w-full gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
            }
          >
            <img src={ArchiveIcon} height={18} width={18} alt="archive" />
            <span>Archive Note</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will move the note to archives.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex gap-4 w-full"}>
            <DialogClose
              onClick={handleArchive}
              className={
                "w-fit inline-flex items-center justify-start px-4 py-3 bg-blue-500 text-white hover:bg-blue-700 hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
              }
            >
              Archive Note
            </DialogClose>
            <DialogClose
              className={
                "w-fit inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
              }
            >
              Cancel
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <div
            className={
              "inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus w-full gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
            }
          >
            <img src={DeleteIcon} height={18} width={18} alt="delete" />
            <span>Delete Note</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the note.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex gap-4 w-full"}>
            <DialogClose
              onClick={handleDelete}
              className={
                "w-fit inline-flex items-center justify-start px-4 py-3 bg-red-500 text-white hover:bg-red-600 hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
              }
            >
              Delete Note
            </DialogClose>
            <DialogClose
              className={
                "w-fit inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
              }
            >
              Cancel
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
    <div className={"flex flex-col gap-2"}>
      <Button
        className={
          "inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus w-full gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
        }
      >
        <img src={RestoreIcon} height={18} width={18} alt="restore" />
        <span>Restore Note</span>
      </Button>
      <Button
        className={
          "inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus w-full gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
        }
      >
        <img src={DeleteIcon} height={18} width={18} alt="delete" />
        <span>Delete Note</span>
      </Button>
    </div>
  );
}
