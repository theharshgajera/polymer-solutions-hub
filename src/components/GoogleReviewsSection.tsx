import { Star, ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/seo";
import { formatReviewDate, type GoogleReview } from "@/lib/googleReviews";

type GoogleReviewsSectionProps = {
  reviews: GoogleReview[];
  heading?: string;
  className?: string;
};

/**
 * Attributed testimonials from the Google Business Profile.
 *
 * Deliberately emits NO Review or aggregateRating JSON-LD: Google does not
 * allow reviews collected on another site to be re-marked-up as your own, and
 * business-level reviews are excluded as self-serving. These are here for
 * visitors, not for rich results — every quote is verbatim and linked back to
 * the public profile so it can be checked.
 */
const GoogleReviewsSection = ({
  reviews,
  heading = "What Our Customers Say",
  className = "bg-slate-light",
}: GoogleReviewsSectionProps) => {
  if (!reviews.length) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="mb-8">
            <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">
              Customer Reviews
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              {heading}
            </h2>

            <a
              href={BUSINESS.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= Math.round(BUSINESS.googleRating)
                        ? "fill-gold text-gold"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </span>
              <span>
                <strong className="font-semibold">{BUSINESS.googleRating}</strong> on Google
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <ul className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <li
                key={`${r.author}-${i}`}
                className="bg-background rounded-xl p-6 border border-border shadow-sm flex flex-col"
              >
                <blockquote className="font-body text-sm md:text-base text-foreground/85 leading-relaxed mb-4">
                  “{r.body}”
                </blockquote>
                <footer className="mt-auto font-body text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">{r.author}</span>
                  {r.localGuide && <span> · Local Guide</span>}
                  <span> · </span>
                  <time dateTime={r.date}>{formatReviewDate(r.date)}</time>
                  <span> · via Google</span>
                  {r.translatedFrom && (
                    <span className="block mt-1 italic">
                      Translated by Google from {r.translatedFrom}
                    </span>
                  )}
                </footer>
              </li>
            ))}
          </ul>

          <a
            href={BUSINESS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-8 font-body font-semibold text-sm text-accent hover:underline"
          >
            Read all reviews on Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
