-- 관리자 비밀번호 초기 설정
-- 비밀번호를 원하는 값으로 변경하세요 (예: 'admin123')
INSERT OR REPLACE INTO admin_password (id, password, updated_at) 
VALUES (1, 'admin123', CURRENT_TIMESTAMP);
