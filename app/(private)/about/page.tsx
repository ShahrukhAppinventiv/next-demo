

async function fetchCmsDetails(): Promise<any> {
  const res = await fetch(
    "https://api.urban-sandbox.com/api/admin/cms/v1/detail/1",
    {next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to load CMS details");
  }

  const data = await res.json();
  return data;
}

export const metadata = {
  title: 'About Us',
  description: 'Learn about us, our mission, and the team behind our curated products.',
}

export default async function AboutPage() {
  const cmsDetails = await fetchCmsDetails();

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto mt-12 max-w-6xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              About Us
            </h2>
            <p
              className="mt-2 text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: cmsDetails.result }}
            ></p>
          </div>
        </div>
      </section>
    </main>
  );
}


