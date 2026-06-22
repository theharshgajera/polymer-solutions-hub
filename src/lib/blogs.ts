export type Blog = {
  _id: string;
  heading: string;
  text: string;
  tags: string[];
  image: string;
  imageFileId?: string;
  createdAt: string;
  updatedAt: string;
};

export const getAdminHeader = (): Record<string, string> => ({
  "x-admin-password": localStorage.getItem("admin_token") || "",
});

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`/api/blogs?t=${Date.now()}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlog(id: string): Promise<Blog> {
  const res = await fetch(`/api/blogs/${id}?t=${Date.now()}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}
