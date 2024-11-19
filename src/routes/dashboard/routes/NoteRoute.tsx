import NoteOverview from "../../../components/NoteOverview.tsx";
import ContentHeader from "../../../components/ContentHeader.tsx";
import { useEffect, useRef } from "react";
import { useNotes } from "../../../service/useNotes.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast.ts";

export default function NoteRoute() {
  const { noteID } = useParams();
  const { useNoteQuery, useUpdateNote, useDeleteNote } = useNotes();
  const queryClient = useQueryClient();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const note = useNoteQuery({ id: noteID });
  const navigate = useNavigate();
  const { toast } = useToast();
  const noteRef =
    useRef<
      React.ForwardRefExoticComponent<
        { note: Note & { tags: Tag[] } } & React.RefAttributes<unknown>
      >
    >(null);
  useEffect(() => {
    console.log(note);
  }, [note]);

  const handleSave = () => {
    if (!noteRef.current) return;
    // @ts-ignore
    noteRef.current.submit();
  };

  const handleArchive = async () => {
    console.log(note.data);
    await updateNote.mutateAsync(
      { ...note.data, isArchived: true },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["notes", noteID] });
          navigate(-1);
          toast({
            title: "Success",
            description: "Note moved to archives.",
          });
        },
      },
    );
  };

  const handleDelete = async () => {
    await deleteNote.mutateAsync(noteID!, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["notes"] });
        navigate(-1);
        toast({
          title: "Success",
          description: "Note deleted.",
        });
      },
    });
  };

  if (note.isLoading) return <div>Loading...</div>;
  if (note.isError) return <div>Error</div>;
  console.log(note);
  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <ContentHeader
        onSave={handleSave}
        onArchive={handleArchive}
        isArchived={note.data.isArchived}
        onDelete={handleDelete}
      />
      <hr className={"xl:hidden"} />
      <NoteOverview ref={noteRef} note={note.data} />
    </div>
  );
}
