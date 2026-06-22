import { useState, useEffect, useRef } from "react";
import { Loader2, Plus, Trash2, Pencil, X, Save, Upload, AlertCircle, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { fetchBlogs, getAdminHeader, type Blog } from "@/lib/blogs";

type FormState = {
  heading: string;
  text: string;
  tags: string;
};

const emptyForm: FormState = { heading: "", text: "", tags: "" };

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null); // null = create mode
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(""); // existing image URL or object URL
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      setBlogs(await fetchBlogs());
    } catch (e) {
      console.error(e);
      toast.error("Error fetching blogs. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({ heading: blog.heading, text: blog.text || "", tags: (blog.tags || []).join(", ") });
    setImageFile(null);
    setImagePreview(blog.image || "");
    if (fileInputRef.current) fileInputRef.current.value = "";
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heading.trim()) {
      toast.error("Heading is required");
      return;
    }

    const formData = new FormData();
    formData.append("heading", form.heading.trim());
    formData.append("text", form.text);
    formData.append("tags", form.tags); // comma-separated; server parses
    if (imageFile) formData.append("image", imageFile);

    setIsSaving(true);
    try {
      const res = await fetch(editingId ? `/api/blogs/${editingId}` : "/api/blogs", {
        method: editingId ? "PUT" : "POST",
        headers: getAdminHeader(),
        body: formData,
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized: Invalid password");
        throw new Error("Save failed");
      }
      toast.success(editingId ? "Blog updated" : "Blog created");
      resetForm();
      loadBlogs();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Error saving blog");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: getAdminHeader(),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized: Invalid password");
        throw new Error("Delete failed");
      }
      toast.success("Blog deleted");
      if (editingId === id) resetForm();
      loadBlogs();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Error deleting blog");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Blogs</h1>
        <p className="font-body text-muted-foreground mt-1 text-sm">
          Create, edit and remove blog posts shown under Resources → Blogs.
        </p>
      </div>

      {/* Create / Edit form */}
      <div ref={formRef} className="bg-background rounded-xl p-6 shadow-sm border border-border mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-foreground">
            {editingId ? "Edit Blog" : "Add New Blog"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" /> Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Heading */}
          <div>
            <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Heading *</label>
            <input
              type="text"
              value={form.heading}
              onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))}
              placeholder="Blog heading"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              required
            />
          </div>

          {/* Text */}
          <div>
            <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Text</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              placeholder="Blog content / description"
              rows={6}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-y"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Tags</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="Comma separated, e.g. PTFE, Engineering Plastics"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate tags with commas.</p>
          </div>

          {/* Image */}
          <div>
            <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Image</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-40 aspect-[16/10] rounded-lg border border-border bg-muted overflow-hidden flex items-center justify-center flex-shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <Newspaper className="w-7 h-7 text-muted-foreground/40" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  id="blog-image"
                />
                <label
                  htmlFor="blog-image"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body font-semibold text-sm cursor-pointer bg-muted text-foreground hover:bg-muted/70 transition-colors border border-border"
                >
                  <Upload className="w-4 h-4" /> {imagePreview ? "Change image" : "Upload image"}
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  {editingId ? "Leave unchanged to keep the current image." : "Optional, but recommended."}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-body font-bold text-sm transition-colors ${
                isSaving
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-accent shadow-sm"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : editingId ? (
                <>
                  <Save className="w-4 h-4" /> Update Blog
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Create Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Existing blogs */}
      <h2 className="font-heading text-xl font-bold text-foreground mb-4">
        Existing Blogs {blogs.length > 0 && <span className="text-muted-foreground font-normal">({blogs.length})</span>}
      </h2>
      <div className="bg-background rounded-xl p-6 shadow-sm border border-border min-h-[200px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="font-body text-sm">Fetching blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground gap-3">
            <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
            <p className="font-body text-sm">No blogs yet. Create your first one above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col sm:flex-row gap-4 items-start border border-border rounded-lg p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="w-full sm:w-28 aspect-[16/10] rounded-md bg-muted overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {blog.image ? (
                    <img src={blog.image} alt={blog.heading} className="w-full h-full object-cover" />
                  ) : (
                    <Newspaper className="w-6 h-6 text-muted-foreground/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-foreground truncate">{blog.heading}</h3>
                  {blog.text && (
                    <p className="font-body text-sm text-muted-foreground line-clamp-2 mt-1">{blog.text}</p>
                  )}
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-body font-semibold uppercase tracking-wide bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(blog)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-body font-semibold text-foreground bg-muted hover:bg-muted/70 border border-border transition-colors"
                    title="Edit blog"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-body font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
