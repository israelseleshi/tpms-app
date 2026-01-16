import { NextResponse, NextRequest } from "next/server";
import { getPgPool } from "@/lib/db";


export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
    try {
    const pgPool = getPgPool();
    const { rows } = await pgPool.query(
      `select file_bytes, original_name from public.trademark_files where id = $1`,
      [id]
    );
    if (rows.length === 0 || !rows[0].file_bytes) {
      return NextResponse.json({ error: "not-found" }, { status: 404 });
    }
    const buf: Buffer = rows[0].file_bytes as Buffer;
    const filename = rows[0].original_name || "trademark.pdf";
    const uint8 = new Uint8Array(buf);
    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("download route error", err);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}
