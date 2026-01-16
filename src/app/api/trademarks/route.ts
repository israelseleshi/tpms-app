import { NextRequest, NextResponse } from "next/server";
import { pgPool } from "@/lib/db";

// GET: list all trademarks with their primary PDF file title
export async function GET() {
  try {
    const { rows } = await pgPool.query(
      `select f.id as file_id,
              t.id as trademark_id,
              t.mark_name,
              t.application_number,
              f.original_name as pdf_title
       from public.trademarks t
       join public.trademark_files f on f.trademark_id = t.id
       where f.file_type = 'pdf'
       order by t.created_at desc`);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/trademarks error", err);
    return NextResponse.json({ error: "db-error" }, { status: 500 });
  }
}

// POST: upload a new generated PDF and (optionally) insert trademark record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      markName,
      applicationNumber,
      pdfBase64,
      pdfFileName = "trademark.pdf"
    } = body as {
      markName: string;
      applicationNumber?: string;
      pdfBase64: string; // base64 encoded string of pdf
      pdfFileName?: string;
    };

    if (!markName || !pdfBase64) {
      return NextResponse.json({ error: "invalid-body" }, { status: 400 });
    }

    // upsert trademark
    const { rows: upsertRows } = await pgPool.query(
      `insert into public.trademarks (mark_name, application_number)
       values ($1,$2)
       on conflict (application_number) do update set mark_name = excluded.mark_name
       returning id`,
      [markName, applicationNumber]
    );
    const trademarkId = upsertRows[0].id as string;

    // insert file
    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    const { rows: fileRows } = await pgPool.query(
      `insert into public.trademark_files (trademark_id, file_type, original_name, mime_type)
       values ($1,'pdf',$2,'application/pdf') returning id`,
      [trademarkId, pdfFileName]
    );

    await pgPool.query(
      `update public.trademark_files set file_bytes = $2 where id = $1`,
      [fileRows[0].id, pdfBuffer]
    );

    return NextResponse.json({ ok: true, fileId: fileRows[0].id });
  } catch (err) {
    console.error("POST /api/trademarks error", err);
    return NextResponse.json({ error: (err as Error).message ?? 'server-error' }, { status: 500 });
  }
}
