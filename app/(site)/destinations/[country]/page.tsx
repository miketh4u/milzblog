import { CountryPageClient } from "./CountryPageClient";

export async function generateStaticParams() {
  return [];
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  return <CountryPageClient countrySlug={country} />;
}
