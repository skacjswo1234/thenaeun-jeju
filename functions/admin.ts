// admin.html 파일을 읽어서 반환
import adminHtml from '../admin.html?raw';

export async function onRequest(context: any) {
  const { request } = context;
  
  // GET 요청만 처리
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  // admin.html 내용 반환
  return new Response(adminHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
