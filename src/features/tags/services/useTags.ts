import { appAPI } from "../../../lib/axios-config.ts";
import { useQuery } from "@tanstack/react-query";

export default function useTags() {
  const fetchTags = async () => {
    try {
      const response = await appAPI.get("/tags");
      return response.data as Tag[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchTag = async (id: string) => {
    try {
      const response = await appAPI.get(`/tags/${id}`);
      return response.data as Tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const useTagsQuery = () =>
    useQuery({ queryKey: ["tags"], queryFn: fetchTags });
  const useTagQuery = (id: string) =>
    useQuery({
      queryKey: ["tags", id],
      queryFn: () => fetchTag(id),
    });
  return { useTagsQuery, useTagQuery };
}
