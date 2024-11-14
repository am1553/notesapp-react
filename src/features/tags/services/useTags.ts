import { axiosAPI } from "../../../lib/axios-config.ts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useTags() {
  const { tagID } = useParams();
  const fetchTags = async () => {
    try {
      const response = await axiosAPI.get("/tags");
      return (await response.data) as Tag[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchTag = async () => {
    try {
      const response = await axiosAPI.get(`/tags/${tagID}`);
      return (await response.data) as Tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const tagsQuery = useQuery({ queryKey: ["tags"], queryFn: fetchTags });
  const tagQuery = useQuery({
    queryKey: ["tags", tagID],
    queryFn: fetchTag,
    enabled: !!tagID,
  });
  return { tagsQuery, tagQuery };
}
