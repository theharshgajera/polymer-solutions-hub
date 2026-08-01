import { Star } from "lucide-react";
import type { ProductReview } from "@/lib/productReviews";

type ReviewsSectionProps = {
  reviews: ProductReview[];
  aggregate: { ratingValue: number; reviewCount: number } | null;
  /** Product name, used in the heading. */
  productName: string;
};

const Stars = ({ rating, label }: { rating: number; label: string }) => (
  <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`w-4 h-4 ${
          i <= Math.round(rating) ? "fill-gold text-gold" : "text-muted-foreground/30"
        }`}
      />
    ))}
  </span>
);

/**
 * Renders genuine customer reviews. The Review / aggregateRating JSON-LD is
 * emitted alongside this from the product page — Google requires that marked-up
 * reviews are visible on the page, so the two must never diverge. Nothing
 * renders when there are no reviews, which is also when no rating markup is
 * emitted.
 */
const ReviewsSection = ({ reviews, aggregate, productName }: ReviewsSectionProps) => {
  if (!reviews.length || !aggregate) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              What Our Customers Say About {productName}
            </h2>
          </div>

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <Stars
              rating={aggregate.ratingValue}
              label={`${aggregate.ratingValue} out of 5 stars`}
            />
            <span className="font-body text-sm text-foreground/80">
              <strong className="font-semibold">{aggregate.ratingValue.toFixed(1)}</strong> out of 5
              {" — "}
              {aggregate.reviewCount} {aggregate.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>

          <ul className="space-y-6">
            {reviews.map((r, i) => (
              <li
                key={`${r.author}-${i}`}
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
              >
                <Stars rating={r.rating} label={`${r.rating} out of 5 stars`} />
                <blockquote className="font-body text-base text-foreground/85 leading-relaxed mt-3 mb-4">
                  “{r.body}”
                </blockquote>
                <footer className="font-body text-sm text-muted-foreground">
                  <cite className="not-italic font-semibold text-foreground/80">{r.author}</cite>
                  {r.organisation && <span> · {r.organisation}</span>}
                  <span> · </span>
                  <time dateTime={r.date}>
                    {new Date(r.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </time>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
