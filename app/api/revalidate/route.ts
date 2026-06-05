import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-webhook-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type, slug, country } = body;

    if (_type === "post" && slug?.current) {
      revalidatePath(`/blog/${slug.current}`);
      revalidatePath("/");
      if (country?.slug?.current) {
        revalidatePath(`/destinations/${country.slug.current}`);
      }
    } else if (_type === "country" && slug?.current) {
      revalidatePath(`/destinations/${slug.current}`);
      revalidatePath("/destinations");
    } else if (_type === "city") {
      revalidatePath("/destinations", "layout");
    }

    revalidatePath("/sitemap.xml");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}
