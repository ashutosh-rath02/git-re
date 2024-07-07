import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const req = request;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Environment variables for Supabase are missing');
    return new NextResponse('Environment variables for Supabase are missing', { status: 500 });
  }

  await updateSession(req);

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
