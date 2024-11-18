import TagIcon from "../assets/icon-tag.svg";
import ClockIcon from "../assets/icon-clock.svg";
import { Button } from "./ui/button.tsx";
import moment from "moment";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form.tsx";

import { useNotes } from "../service/useNotes.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast.ts";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title cannot be less than 3 characters." }),
  description: z.string().trim(),
  isArchived: z.boolean(),
  tags: z.string(),
});

export default function NoteOverview({
  note,
}: {
  note: Note & { tags: Tag[] };
}) {
  const queryClient = useQueryClient();
  const date = moment(note.updatedAt).format("D MMM YYYY");
  const { useUpdateNote } = useNotes();
  const updateNote = useUpdateNote();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title,
      description: note.description?.replace(/\\n/g, "\n") || "",
      isArchived: note.isArchived || false,
      tags:
        note.tags
          ?.map((tag) => tag.name)
          ?.toString()
          ?.replace(/,/g, ", ") || "",
    },
  });

  const handleSave = async (data: z.infer<typeof formSchema>) => {
    const formatTags = data.tags
      .split(",")
      .map((tag: string) => ({ name: tag }));
    const formData: Note & { tags: Tag[] } = {
      ...data,
      tags: formatTags,
      id: note.id,
    };
    try {
      await updateNote.mutateAsync(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notes", note.id] });
          queryClient.invalidateQueries({ queryKey: ["notes"] });
          queryClient.invalidateQueries({ queryKey: ["tags"] });
          toast({
            title: "Success",
            description: "Note updated successfully.",
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   form.reset({
  //     title: note.title,
  //     description: note.description?.replace(/\\n/g, "\n"),
  //     isArchived: note.isArchived,
  //     tags:
  //       note.tags
  //         ?.map((tag) => tag.name)
  //         ?.toString()
  //         ?.replace(/,/g, ", ") || "",
  //   });
  // }, [form]);

  return (
    <div className={"h-full flex flex-col gap-2"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className={"flex flex-col gap-3 h-full"}
        >
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className={
                      "text-preset-1 font-bold capitalize outline-none w-full"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"tags"}
            render={({ field }) => (
              <FormItem className={""}>
                <div
                  className={
                    "grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 md:gap-y-2 text-preset-6 md:text-preset-4 text-neutral-600"
                  }
                >
                  <div className={"col-start-1 flex items-center gap-1.5"}>
                    <img src={TagIcon} height={16} width={16} alt="tag" />
                    <span>Tags</span>
                  </div>
                  <FormControl>
                    <input
                      className={"py-2 outline-none capitalize"}
                      {...field}
                      placeholder={
                        "Add tags separated by commas (e.g. Work, Planning)"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  <div className={"col-start-1 flex items-center gap-1.5"}>
                    <img src={ClockIcon} height={16} width={16} alt="clock" />
                    <span>Last edited</span>
                  </div>
                  <p className={"col-start-2"}>{date}</p>
                </div>
              </FormItem>
            )}
          />
          <hr />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className={"h-full"}>
                <FormControl>
                  <textarea
                    className={"text-neutral-800 outline-none w-full h-full"}
                    placeholder={"Start typing your note here..."}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex w-full gap-4 max-xl:hidden border-t pt-5"}>
            <Button type={"submit"} className={"w-fit"}>
              Save Note
            </Button>
            <Button variant={"secondary"} className={"w-fit"}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
