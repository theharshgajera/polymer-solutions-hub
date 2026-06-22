import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { breadcrumbSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ArrowRight, Newspaper } from "lucide-react";
import { fetchBlogs, type Blog } from "@/lib/blogs";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title="Blogs & Resources | Engineering Plastics Guides | Multi-Tech Polymers"
        description="Read guides and articles on PTFE, Teflon, Nylon, Delrin, PEEK and engineering plastics — material selection, applications and industry tips from Multi-Tech Polymers, Ahmedabad."
        path="/blogs"
        keywords="engineering plastics blog, PTFE guide, Teflon vs Nylon, polymer material selection, Multi-Tech Polymers resources"
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
        ])}
      />
      <Header />

      {/* Banner */}
      <section className="gradient-hero pt-40 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase mb-2">Resources</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">Blogs</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-body text-sm">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
              <p className="font-body text-sm">Couldn't load blogs. Please try again later.</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Newspaper className="w-10 h-10 text-muted-foreground/40" />
              <p className="font-body text-base">No blogs yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blogs/${blog._id}`}
                  className="group flex flex-col bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.heading}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                        <Newspaper className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-body font-semibold uppercase tracking-wide bg-accent/10 text-accent px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {blog.heading}
                    </h2>
                    {blog.text && (
                      <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">{blog.text}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 font-body font-semibold text-sm text-accent">
                      Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;
