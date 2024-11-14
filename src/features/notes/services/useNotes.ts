import { axiosAPI } from "../../../lib/axios-config.ts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useNotes(filters?: Record<string, any>) {
  const { noteID } = useParams();

  const fetchNotes = async () => {
    const params = new URLSearchParams(filters).toString();
    try {
      const response = await axiosAPI.get(`/notes?${params}`);
      return (await response.data) as Note[];
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

  const notesQuery = useQuery({
    queryKey: ["notes", filters],
    queryFn: fetchNotes,
  });
  const noteQuery = useQuery({
    queryKey: ["note", noteID],
    queryFn: fetchNote,
    enabled: !!noteID,
  });
  return { notesQuery, noteQuery };
}
