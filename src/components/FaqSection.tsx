import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type Faq = { q: string; a: string };

type FaqSectionProps = {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
  className?: string;
};

/**
 * Renders an accessible FAQ accordion. The FAQPage JSON-LD is emitted separately
 * via the page's <Seo> component (using faqSchema) so structured data and the
 * visible content stay in sync.
 */
const FaqSection = ({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow = "FAQs",
  className = "bg-slate-light",
}: FaqSectionProps) => {
  if (!faqs.length) return null;

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-accent font-body font-semibold text-sm tracking-[0.15em] uppercase mb-2">{eyebrow}</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{heading}</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl bg-background px-5 shadow-sm"
            >
              <AccordionTrigger className="text-left font-heading text-base md:text-lg font-bold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
