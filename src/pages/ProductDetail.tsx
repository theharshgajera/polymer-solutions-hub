import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ProductSlideshow } from "@/components/ProductSlideshow";
import { breadcrumbSchema, productSchema, SITE_NAME } from "@/lib/seo";
import { getProductBySlug, rawProducts, type Product } from "@/lib/products";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Check, Phone, MessageCircle, AlertCircle } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/919898470707?text=";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const base = getProductBySlug(id);
  const [product, setProduct] = useState<Product | undefined>(base);

  // Keep local state in sync when navigating between product pages.
  useEffect(() => {
    setProduct(getProductBySlug(id));
  }, [id]);

  // Fetch this product's images from ImageKit.
  useEffect(() => {
    if (!id || !base) return;
    let active = true;
    fetch(`/api/images?folder=/products/${id}&t=${Date.now()}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { url: string }[]) => {
        if (active) setProduct((prev) => (prev ? { ...prev, images: data.map((img) => img.url) } : prev));
      })
      .catch(() => {
        /* keep the page usable without images */
      });
    return () => {
      active = false;
    };
  }, [id, base]);

  // Unknown slug — noindex + friendly fallback.
  if (!base) {
    return (
      <div className="min-h-screen">
        <Seo
          title="Product Not Found | Multi-Tech Polymers"
          description="The product you are looking for could not be found."
          path={`/products/${id ?? ""}`}
          noindex
        />
        <Header />
        <section className="pt-40 pb-24 bg-background min-h-[60vh]">
          <div className="container mx-auto px-4 max-w-2xl text-center flex flex-col items-center gap-4">
            <AlertCircle className="w-10 h-10 text-muted-foreground/50" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Product not found</h1>
            <p className="font-body text-muted-foreground">
              We couldn't find that product. Browse our full range instead.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-6 py-3 rounded-md font-body font-bold text-sm hover:bg-accent transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const p = product ?? base;
  const metaTitle = p.metaTitle || `${p.name} in Ahmedabad, Gujarat | ${SITE_NAME}`;
  const metaDescription = (p.metaDescription || p.desc).slice(0, 160);
  const enquireHref = `${WHATSAPP_BASE}${encodeURIComponent(`Hey, I have a requirement regarding ${p.name}`)}`;

  const related = rawProducts.filter((r) => r.id !== p.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Seo
        title={metaTitle}
        description={metaDescription}
        path={`/products/${p.id}`}
        keywords={`${p.name}, ${p.items.join(", ")}, engineering plastics Ahmedabad, Gujarat`}
        image={p.images && p.images.length ? p.images[0] : undefined}
        schema={[
          productSchema({
            id: p.id,
            name: p.name,
            desc: p.desc,
            items: p.items,
            images: p.images,
            metaDescription,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: p.name, path: `/products/${p.id}` },
          ]),
        ]}
      />
      <Header />

      {/* Breadcrumb */}
      <section className="gradient-hero pt-36 pb-6">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-body text-primary-foreground/70">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
            <span>/</span>
            <span className="text-primary-foreground font-semibold">{p.name}</span>
          </nav>
        </div>
      </section>

      {/* Overview: gallery + key info */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductSlideshow images={p.images || []} />
            </div>

            {/* Info */}
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
                {p.name}
              </h1>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                {p.overview || p.desc}
              </p>

              {p.items.length > 0 && (
                <div className="mb-6">
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2.5">
                    Available Forms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 text-sm font-body font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded"
                      >
                        <Check className="w-3.5 h-3.5 text-accent" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {p.variants && (
                <div className="mb-6">
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2.5">
                    {p.variants.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.variants.values.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center gap-1 text-sm font-body font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded"
                      >
                        <Check className="w-3.5 h-3.5 text-accent" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={enquireHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-body font-bold text-sm hover:bg-accent transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                </a>
                <a
                  href="tel:+919898470707"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-md font-body font-bold text-sm hover:bg-muted transition-colors"
                >
                  <Phone className="w-4 h-4" /> +91 98984 70707
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Applications */}
      {(p.features?.length || p.applications?.length) && (
        <section className="py-16 bg-slate-light">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {p.features && p.features.length > 0 && (
                <div className="bg-background rounded-xl p-7 border border-border shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-navy mb-5">Key Features &amp; Benefits</h2>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-body text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {p.applications && p.applications.length > 0 && (
                <div className="bg-background rounded-xl p-7 border border-border shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-navy mb-5">Typical Applications</h2>
                  <ul className="space-y-3">
                    {p.applications.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 font-body text-sm text-foreground/80">
                        <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Related Engineering Plastics
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/products/${r.id}`}
                  className="group flex flex-col bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-accent transition-colors">
                    {r.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">{r.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-body font-semibold text-sm text-accent">
                    View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Need {p.name} to Your Specification?
          </h2>
          <p className="font-body text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            We manufacture and machine engineering plastics to your drawings and requirements. Get a quotation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" /> Request a Quote
            </a>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-md font-body font-bold text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
