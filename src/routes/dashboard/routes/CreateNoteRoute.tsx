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
              description: `${data.title} note added.`,
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
    <div className={"h-full flex flex-col gap-2"}>
      <ContentHeader
        showDelete={false}
        showArchive={false}
        showCancel={true}
        showSave={true}
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
                      "text-preset-1 font-bold capitalize outline-none w-full placeholder:normal-case"
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
                      className={
                        "py-2 outline-none capitalize placeholder:normal-case"
                      }
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
                  <p className={"col-start-2"}>Not yet saved.</p>
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
          <div className={"flex w-fit gap-4 max-xl:hidden"}>
            <Button type={"submit"}>Save Note</Button>
            <Button variant={"secondary"}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
