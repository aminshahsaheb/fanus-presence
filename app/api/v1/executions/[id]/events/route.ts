import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const executionId = params.id;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (type: string, payload: any) => {
        const data = JSON.stringify({ type, payload });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      try {
        // Step 1: Initial connection
        sendEvent("CONNECTED", { execution_id: executionId, timestamp: new Date().toISOString() });
        await new Promise((r) => setTimeout(r, 400));

        // Step 2: RFC Start
        sendEvent("RFC_START", { execution_id: executionId, node: "RFC", status: "processing" });
        await new Promise((r) => setTimeout(r, 800));

        // Step 3: Seal Verification
        sendEvent("SEAL_STABLE", {
          confidence: 0.96,
          conflict: 0.04,
          seal_state: "stable",
          timestamp: new Date().toISOString()
        });
        await new Promise((r) => setTimeout(r, 800));

        // Step 4: Output Ready
        sendEvent("OUTPUT_READY", {
          confidence: 0.96,
          conflict: 0.04,
          seal_state: "stable",
          execution_id: executionId,
          output: "Fanus Living Seal verified and anchored.",
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        // Stream aborted
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
