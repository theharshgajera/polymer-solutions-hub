import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ArrowLeft, Newspaper } from "lucide-react";
import { fetchBlog, type Blog } from "@/lib/blogs";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetchBlog(id)
      .then(setBlog)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-accent hover:gap-2.5 transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-body text-sm">Loading...</p>
            </div>
          ) : error || !blog ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
              <p className="font-body text-sm">This blog could not be found.</p>
            </div>
          ) : (
            <article>
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body font-semibold uppercase tracking-wide bg-accent/10 text-accent px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {blog.heading}
              </h1>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-8 shadow-sm border border-border">
                {blog.image ? (
                  <img src={blog.image} alt={blog.heading} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                    <Newspaper className="w-12 h-12" />
                  </div>
                )}
              </div>

              {blog.text && (
                <div className="font-body text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                  {blog.text}
                </div>
              )}
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
