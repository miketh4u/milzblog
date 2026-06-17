import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body?._type;

    if (type === "post") {
      revalidatePath("/blog/[slug]", "page");
      revalidatePath("/", "page");
    } else if (type === "country") {
      revalidatePath("/destinations/[country]", "page");
      revalidatePath("/destinations", "page");
    } else if (type === "city") {
      revalidatePath("/destinations/[country]/[city]", "page");
    } else {
      // Revalidate everything if type unknown
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
