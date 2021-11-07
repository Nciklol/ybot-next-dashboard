import { NextResponse, NextRequest } from "next/server";
export async function middleware(req: any) {
  // I have no idea where this req comes from, express, node-fetcher, or next
  const { pathname } = req.nextUrl;
  if (pathname == "/invite") {
    return NextResponse.redirect(
      "https://discord.com/oauth2/authorize?client_id=480926911095111682&permissions=536870780887&scope=bot%20applications.commands"
    );
  }
  if (pathname == "/support") {
    return NextResponse.redirect("https://discord.gg/STe9YQgtz2");
  }
  if (pathname == "/privacy") {
    return NextResponse.redirect("/docs/privacy");
  }
  return NextResponse.next();
}
