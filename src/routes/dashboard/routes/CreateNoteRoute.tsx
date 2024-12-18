import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form.tsx";
import { Button } from "../../../components/ui/button.tsx";
import TagIcon from "../../../assets/icon-tag.svg";
import ClockIcon from "../../../assets/icon-clock.svg";
import ContentHeader from "../../../components/ContentHeader.tsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/use-toast.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useNotes } from "../../../service/useNotes.ts";
import { useStyleContext } from "../../../context/StyleContext.tsx";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title cannot be less than 3 characters." })
    .trim(),
  description: z.string().trim().trim(),
  isArchived: z.boolean(),
  tags: z.string().trim(),
});
export default function CreateNoteRoute() {
  const { toast } = useToast();
  const { theme } = useStyleContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { useCreateNote } = useNotes();
  const createNote = useCreateNote();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isArchived: false,
      tags: "",
    },
  });

  const handleSave = async (formData: z.infer<typeof formSchema>) => {
    const tags: Tag[] = formData.tags
      .split(",")
      .map((tagStr) => ({ name: tagStr }));
    try {
      await createNote.mutateAsync(
        { ...formData, tags: tags },
        {
          onSuccess: async (res) => {
            const data = res.data;
            await queryClient.invalidateQueries({
              queryKey: ["notes"],
            });
            await queryClient.invalidateQueries({
              queryKey: ["tags"],
            });
            navigate(`/app/home/${data.id}`);
            toast({
              title: "Success!",
              description: `Note created successfully.`,
            });
          },
        },
      );
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed.",
        description: `Please check the data provided.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={"h-full flex flex-col gap-2 px-4 py-5 md:px-8 md:py-6"}>
      <ContentHeader
        showAction={false}
        onSave={form.handleSubmit(handleSave)}
      />
      <hr
        className={`my-2 xl:hidden ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
      />
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
                    placeholder={"Enter a title..."}
                    className={
                      "text-preset-1 font-bold capitalize outline-none w-full placeholder:normal-case bg-transparent"
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
                      className={`py-2 outline-none ${theme === "light" ? "text-neutral-800" : "text-white"} capitalize placeholder:normal-case bg-transparent`}
                      {...field}
                      placeholder={"e.g. Work, Planning"}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className={"col-start-1 flex items-center gap-1.5"}>
                    <img src={ClockIcon} height={16} width={16} alt="clock" />
                    <span>Last edited</span>
                  </div>
                  <p className={"col-start-2"}>Not yet saved.</p>
                </div>
              </FormItem>
            )}
          />
          <hr
            className={`my-2 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className={"h-full"}>
                <FormControl>
                  <textarea
                    className={`text-neutral-800 py-6 outline-none w-full h-full bg-transparent focus-visible:placeholder:opacity-0 ${theme === "light" ? "text-neutral-800" : "text-white"}`}
                    placeholder={"Start typing your note here..."}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex w-fit gap-4 max-xl:hidden"}>
            <Button type={"submit"}>Save Note</Button>
            <Button variant={"secondary"}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
