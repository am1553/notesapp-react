import { appAPI } from "../lib/axios-config.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNotes = () => {
  const createNote = async (data: Note & { tags: Tag[] }) => {
    return await appAPI.post("/notes", data);
  };

  const fetchNotes = async (params: Record<string, any>) => {
    const response = await appAPI.get("/notes", { params });
    return response.data;
  };

  const fetchNote = async (params: Record<string, any>) => {
    const response = await appAPI.get(`/notes/${params.id}`, params);
    return response.data;
  };

  const updateNote = async (data: Note & { tags: Tag[] }) => {
    const response = await appAPI.put(`/notes/${data.id}`, data);
    return response.data;
  };

  const deleteNote = async (id: string) => {
    const response = await appAPI.delete(`/notes/${id}`);
    return response.data;
  };

  const useNotesQuery = (params: Record<string, any> = {}) =>
    useQuery({
      queryKey: ["notes", params],
      queryFn: () => fetchNotes(params),
    });

  const useNoteQuery = (params: Record<string, any> = {}) =>
    useQuery({
      queryKey: ["notes", params],
      queryFn: () => fetchNote(params),
      enabled: !!params.id,
    });
  const useCreateNote = () =>
    useMutation({
      mutationKey: ["create_note"],
      mutationFn: createNote,
    });
  const useUpdateNote = () =>
    useMutation({
      mutationKey: ["update_note"],
      mutationFn: updateNote,
    });
  const useDeleteNote = () =>
    useMutation({ mutationKey: ["delete_note"], mutationFn: deleteNote });

  return {
    useNotesQuery,
    useNoteQuery,
    useCreateNote,
    useUpdateNote,
    useDeleteNote,
  };
};
