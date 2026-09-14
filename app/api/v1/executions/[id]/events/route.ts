import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const executionId = params.id;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (type: string, payload: Record<string, unknown> = {}) => {
        const data = JSON.stringify({ type, payload });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      try {
        // SSE is lifecycle-only. Verification truth comes from /api/v1/execute.
        sendEvent("CONNECTED", {
          execution_id: executionId,
          timestamp: new Date().toISOString(),
        });
        await new Promise((r) => setTimeout(r, 400));

        sendEvent("RFC_START", {
          execution_id: executionId,
          node: "RFC",
          status: "processing",
        });
        await new Promise((r) => setTimeout(r, 800));

        sendEvent("SEAL_EVALUATED", {
          execution_id: executionId,
          node: "SEAL",
          status: "evaluated",
        });
        await new Promise((r) => setTimeout(r, 800));

        sendEvent("OUTPUT_READY", {
          execution_id: executionId,
          node: "OUTPUT",
          status: "ready",
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        // Stream aborted by client or runtime.
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
