export async function onRequest(context: any) {
  const { request, env } = context;
  const db = env['thenaeun-jeju-db'];

  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'PUT') {
    return new Response(
      JSON.stringify({ error: 'PUT 메서드만 지원합니다.' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ error: '현재 비밀번호와 새 비밀번호를 입력해주세요.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 현재 비밀번호 확인
    const adminPassword = await db.prepare(
      'SELECT password FROM admin_password WHERE id = 1'
    ).first();

    if (!adminPassword) {
      return new Response(
        JSON.stringify({ error: '관리자 비밀번호가 설정되지 않았습니다.' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 현재 비밀번호 확인
    if (currentPassword !== adminPassword.password) {
      return new Response(
        JSON.stringify({ error: '현재 비밀번호가 일치하지 않습니다.' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 비밀번호 업데이트
    await db.prepare(
      'UPDATE admin_password SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1'
    ).bind(newPassword).run();

    return new Response(
      JSON.stringify({ success: true }),
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
