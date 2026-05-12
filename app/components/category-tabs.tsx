import Link from "next/link";

type Props = {
  categories: string[];
  active?: string;
};

export function CategoryTabs({ categories, active }: Props) {
  const all = [{ slug: "", label: "All" }].concat(
    categories.map((c) => ({ slug: c, label: prettify(c) })),
  );

  return (
    <div className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-6 overflow-x-auto -mb-px">
          {all.map((tab) => {
            const isActive =
              (tab.slug === "" && !active) || tab.slug === active;
            const href = tab.slug
              ? `/?category=${encodeURIComponent(tab.slug)}`
              : "/";
            return (
              <Link
                key={tab.label}
                href={href}
                className={
                  "whitespace-nowrap py-3 text-sm border-b-2 transition-colors " +
                  (isActive
                    ? "border-black text-black"
                    : "border-transparent text-[var(--muted)] hover:text-black")
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function prettify(category: string): string {
  return category
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
