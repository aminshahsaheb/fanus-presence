import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "alive",
    flame: "Shōle-ān zende ast",
    version: "1.0.0"
  });
}
