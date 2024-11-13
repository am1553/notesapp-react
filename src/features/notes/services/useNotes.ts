import { axiosAPI } from "../../../lib/axios-config.ts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useNotes() {
  const { noteID } = useParams();
  const fetchNotes = async () => {
    try {
      const response = await axiosAPI.get("/notes");
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNote = async () => {
    if (!noteID) throw new Error("Not found.");
    try {
      const response = await axiosAPI.get(`/notes/${noteID}`);
      return await response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const notesQuery = useQuery({ queryKey: ["notes"], queryFn: fetchNotes });
  const noteQuery = useQuery({
    queryKey: ["note", noteID],
    queryFn: fetchNote,
    enabled: !!noteID,
  });
  return { notesQuery, noteQuery };
}
