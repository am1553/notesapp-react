type Tag = { id: string; name: string };

declare interface Note {
  id: string;
  title: string;
  description: string;
  is_archived: boolean;
  updated_at: string;
  tags: Tag[];
}
