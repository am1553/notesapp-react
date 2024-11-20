import RestoreIcon from "../assets/icon-restore.svg";
import ArchiveIcon from "../assets/icon-archive.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../service/useNotes.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useStyleContext } from "../context/StyleContext.tsx";

type ActionDialog = {
  type: "archive" | "restore" | "delete";
};

export default function ActionDialog({ type }: ActionDialog) {
  const { noteID } = useParams();
  const { theme } = useStyleContext();
  const { useUpdateNote, useNoteQuery, useNotesQuery, useDeleteNote } =
    useNotes();
  const notes = useNotesQuery();
  const noteQuery = useNoteQuery({ id: noteID });
  const navigate = useNavigate();
  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();
  const queryClient = useQueryClient();

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

  const handleArchiveRestore = async (value: boolean) => {
    const note = noteQuery.data;
    try {
      await updateNote.mutateAsync(
        { ...note, isArchived: value },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["notes", noteID],
            });
            await queryClient.invalidateQueries({ queryKey: ["notes", {}] });
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`inline-flex items-center justify-start px-4 py-3 ${theme === "light" ? "bg-neutral-100 text-neutral-600 hover:bg-white" : "bg-neutral-950 border border-neutral-600"} hover:outline-neutral-300 hover:outline focus w-full gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50`}
        >
          <img
            src={
              type === "archive"
                ? ArchiveIcon
                : type === "restore"
                  ? RestoreIcon
                  : DeleteIcon
            }
            height={18}
            width={18}
            alt="archive"
            className={`${theme === "light" ? "" : "filter-white-icon"}`}
          />
          <span>
            {type === "archive"
              ? "Archive Note"
              : type === "restore"
                ? "Restore Note"
                : "Delete Note"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent
        className={`${theme === "light" ? "bg-white text-neutral-950" : "bg-neutral-950 text-white"}`}
      >
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {type === "archive"
              ? "This will move the note to archives."
              : type === "restore"
                ? "This will remove the note from archives."
                : "This will permanently delete the note and cannot be restored."}
          </DialogDescription>
        </DialogHeader>
        <div className={"flex gap-4 w-full"}>
          <DialogClose
            onClick={
              type === "archive"
                ? () => handleArchiveRestore(true)
                : type === "restore"
                  ? () => handleArchiveRestore(false)
                  : handleDelete
            }
            className={
              type === "delete"
                ? "w-fit inline-flex items-center justify-start px-4 py-3 bg-red-500 text-white hover:bg-red-600 hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
                : "w-fit inline-flex items-center justify-start px-4 py-3 bg-blue-500 text-white hover:bg-blue-700 hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
            }
          >
            <span>
              {type === "archive"
                ? "Archive Note"
                : type === "restore"
                  ? "Restore Note"
                  : "Delete Note"}
            </span>
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
  );
}
