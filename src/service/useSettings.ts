import { appAPI } from "../lib/axios-config.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSettings = () => {
  const queryClient = useQueryClient();
  const getSettings = async () => {
    const settings = await appAPI.get("/settings");
    return settings.data;
  };

  const updateSettings = async (body: {
    theme?: "light" | "dark" | "system";
    font?: string;
  }) => {
    const settings = await appAPI.put("/settings", body);
    console.log(settings);
    return settings.data;
  };

  const useSettingsQuery = () =>
    useQuery({
      queryKey: ["settings"],
      queryFn: getSettings,
    });

  const useUpdateSettings = () =>
    useMutation({
      mutationKey: ["update_settings"],
      mutationFn: updateSettings,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
    });

  return { useSettingsQuery, useUpdateSettings };
};
