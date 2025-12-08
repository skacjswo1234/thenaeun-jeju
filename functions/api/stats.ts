export async function onRequest(context: any) {
  const { request, env } = context;
  const db = env['thenaeun-jeju-db'];

  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 전체 문의 수
    const totalResult = await db.prepare('SELECT COUNT(*) as count FROM inquiries').first();
    const total = totalResult?.count || 0;

    // 상태별 문의 수
    const pendingResult = await db.prepare(
      "SELECT COUNT(*) as count FROM inquiries WHERE status = 'pending'"
    ).first();
    const pending = pendingResult?.count || 0;

    const contactedResult = await db.prepare(
      "SELECT COUNT(*) as count FROM inquiries WHERE status = 'contacted'"
    ).first();
    const contacted = contactedResult?.count || 0;

    const completedResult = await db.prepare(
      "SELECT COUNT(*) as count FROM inquiries WHERE status = 'completed'"
    ).first();
    const completed = completedResult?.count || 0;

    // 오늘 문의 수
    const todayResult = await db.prepare(
      "SELECT COUNT(*) as count FROM inquiries WHERE DATE(created_at) = DATE('now')"
    ).first();
    const today = todayResult?.count || 0;

    return new Response(
      JSON.stringify({
        total,
        pending,
        contacted,
        completed,
        today,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
