export async function onRequest(context: any) {
  const { request, env } = context;
  const db = env['thenaeun-jeju-db'];
  const url = new URL(request.url);
  const method = request.method;

  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS 요청 처리
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // GET: 문의 내역 조회
    if (method === 'GET') {
      const id = url.searchParams.get('id');
      
      if (id) {
        // 특정 문의 내역 조회
        const result = await db.prepare(
          'SELECT * FROM inquiries WHERE id = ?'
        ).bind(id).first();
        
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        // 전체 문의 내역 조회
        const result = await db.prepare(
          'SELECT * FROM inquiries ORDER BY created_at DESC'
        ).all();
        
        return new Response(JSON.stringify(result.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // POST: 문의 내역 생성
    if (method === 'POST') {
      const body = await request.json();
      const { name, phone, age, message } = body;

      if (!name || !phone || !age || !message) {
        return new Response(
          JSON.stringify({ error: '모든 필드를 입력해주세요.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const result = await db.prepare(
        'INSERT INTO inquiries (name, phone, age, message) VALUES (?, ?, ?, ?)'
      ).bind(name, phone, age, message).run();

      return new Response(
        JSON.stringify({ id: result.meta.last_row_id, success: true }),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // PUT: 문의 내역 상태 업데이트
    if (method === 'PUT') {
      const body = await request.json();
      const { id, status } = body;

      if (!id || !status) {
        return new Response(
          JSON.stringify({ error: 'id와 status가 필요합니다.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      await db.prepare(
        'UPDATE inquiries SET status = ? WHERE id = ?'
      ).bind(status, id).run();

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // DELETE: 문의 내역 삭제
    if (method === 'DELETE') {
      const id = url.searchParams.get('id');

      if (!id) {
        return new Response(
          JSON.stringify({ error: 'id가 필요합니다.' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      await db.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run();

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: '지원하지 않는 메서드입니다.' }),
      {
        status: 405,
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
