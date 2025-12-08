# 더나은물류 제주 노선 전문 물류 서비스

## 프로젝트 구조

```
thenaeun-jeju/
├── functions/          # Cloudflare Pages Functions
│   └── api/
│       ├── inquiries.ts  # 문의 내역 CRUD API
│       └── stats.ts      # 통계 API
├── images/             # 이미지 파일들
├── admin.html          # 관리자 화면
├── index.html          # 메인 페이지
├── script.js           # 클라이언트 스크립트
├── style.css           # 스타일시트
├── schema.sql          # 데이터베이스 스키마
└── wrangler.toml       # Cloudflare 설정 파일
```

## 데이터베이스 설정

### D1 데이터베이스 정보
- Database ID: `8eb54fc2-7408-4e78-9759-698bbd9a486d`
- Variable Name: `thenaeun-jeju-db`
- Bind Name: `thenaeun-jeju-db`

### 데이터베이스 초기화

로컬 개발 환경에서 데이터베이스를 초기화하려면:

```bash
npx wrangler d1 execute thenaeun-jeju-db --file=schema.sql --local
npx wrangler d1 execute thenaeun-jeju-db --file=init-password.sql --local
```

프로덕션 환경에서:

```bash
npx wrangler d1 execute thenaeun-jeju-db --file=schema.sql
npx wrangler d1 execute thenaeun-jeju-db --file=init-password.sql
```

**참고**: `init-password.sql` 파일에서 기본 비밀번호를 원하는 값으로 변경한 후 실행하세요.

## API 엔드포인트

### 문의 내역 API (`/api/inquiries`)

- **GET** `/api/inquiries` - 전체 문의 내역 조회
- **GET** `/api/inquiries?id={id}` - 특정 문의 내역 조회
- **POST** `/api/inquiries` - 문의 내역 생성
- **PUT** `/api/inquiries` - 문의 내역 상태 업데이트
- **DELETE** `/api/inquiries?id={id}` - 문의 내역 삭제

### 통계 API (`/api/stats`)

- **GET** `/api/stats` - 문의 통계 조회
  - 전체 문의 수
  - 상태별 문의 수 (대기 중, 연락 완료, 처리 완료)
  - 오늘 문의 수

### 관리자 로그인 API (`/api/admin/login`)

- **POST** `/api/admin/login` - 관리자 로그인
  - 요청 본문: `{ "password": "비밀번호" }`
  - 단순 비밀번호 비교 방식 (username, 토큰 불필요)

## 관리자 화면

`admin.html` 파일을 브라우저에서 열거나 배포된 사이트의 `/admin.html` 경로로 접속하면 관리자 화면을 사용할 수 있습니다.

### 로그인
- 비밀번호만 입력하여 로그인 (username 불필요)
- 로그인 상태는 브라우저 로컬 스토리지에 저장
- 로그아웃 버튼으로 로그아웃 가능

### 기능
- 문의 내역 조회 및 필터링
- 문의 상태 변경 (대기 중 → 연락 완료 → 처리 완료)
- 문의 내역 삭제
- 실시간 통계 확인

### 비밀번호 설정
1. `init-password.sql` 파일을 열어 비밀번호를 원하는 값으로 변경
2. 데이터베이스에 실행하여 비밀번호 설정
3. 관리자 화면에서 설정한 비밀번호로 로그인

## 배포

Cloudflare Pages에 배포하면 자동으로 Functions가 활성화됩니다.

1. GitHub 저장소에 코드 푸시
2. Cloudflare Pages에서 프로젝트 연결
3. 빌드 설정:
   - 빌드 명령: (없음)
   - 출력 디렉토리: (루트)
4. D1 데이터베이스 바인딩 확인
5. 배포 후 `schema.sql` 실행하여 데이터베이스 초기화
