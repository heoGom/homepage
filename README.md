# Homepage

Spring Boot와 Next.js로 구현한 게시판 기반 풀스택 웹 애플리케이션입니다. 인증, 게시글, 댓글, 좋아요, 검색, 식당 추천 기능을 한 프로젝트 안에서 설계하고, 백엔드와 프론트엔드를 monorepo로 관리합니다.

이 프로젝트는 단순 CRUD 예제를 넘어, 실제 서비스에서 자주 마주치는 인증, 권한 검증, 소프트 딜리트, 변경 이력, 정렬/검색, Docker 실행 환경, 프론트엔드 API 연동까지 한 흐름으로 구성하는 데 초점을 두었습니다.

## Highlights

- JWT 기반 인증과 Spring Security 필터 체인 구성
- 게시글/댓글 작성자 권한 검증
- 게시글, 댓글 소프트 딜리트와 변경 이력 저장
- 게시글 조회수, 좋아요 수, 댓글 수 기반 정렬
- 댓글/대댓글 트리 구조
- 외국인 대상 한국 음식점 추천 도메인 추가
- Next.js App Router 기반 화면 구성
- TypeScript API client와 인증 fetch wrapper 분리
- 라이트/다크 테마 지원
- Docker Compose 기반 MySQL + Backend 실행 환경
- Backend, Frontend를 하나의 Git monorepo로 정리

## Tech Stack

| Area | Stack |
| --- | --- |
| Backend | Java 17, Spring Boot 3.5, Spring Security, Spring Data JPA, Gradle |
| Database | H2 for local, MySQL for Docker/prod profile |
| Auth | JWT, BCrypt |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Infra | Docker, Docker Compose |
| Test | JUnit 5, Spring Boot Test, MockMvc |

## Architecture

```text
homepage/
  backend/
    src/main/java/heogom/homepage/
      auth/          # signup, login, principal
      jwt/           # token creation and validation
      config/        # security, CORS
      user/          # user lookup
      post/          # posts, search, sort, view history
      comment/       # comments and replies
      like/          # post/comment likes
      restaurant/    # restaurant recommendation domain
      common/        # response, exception, entity, security helpers
  frontend/
    app/
      components/    # layout, post, comment, restaurant UI
      hooks/         # auth and theme state
      lib/api/       # API client modules
      posts/         # post routes
      restaurants/   # restaurant routes
  Dockerfile
  docker-compose.yml
```

## Core Features

### Authentication

- 회원가입과 로그인
- BCrypt password hashing
- JWT access token 발급
- `Authorization: Bearer {token}` 기반 인증
- 인증 실패와 권한 실패를 401/403으로 구분

### Posts

- 게시글 생성, 조회, 수정, 삭제
- 작성자 기반 수정/삭제 권한 검증
- 소프트 딜리트 적용
- 제목 검색과 자동완성
- 최신순, 좋아요순, 댓글순, 조회수순 정렬
- 상세 조회 시 조회수 증가와 조회 이력 저장
- 변경 전/후 snapshot 기반 audit history 저장

### Comments

- 댓글과 대댓글 작성
- 트리 구조 댓글 조회
- 작성자 기반 수정/삭제 권한 검증
- 삭제 댓글 표시 정책 적용
- 댓글 변경 이력 저장

### Likes

- 게시글 좋아요 toggle
- 댓글 좋아요 toggle
- 중복 좋아요 방지를 위한 unique relation 설계

### Restaurant Guide

- 외국인 방문자를 위한 한국 음식점 추천 목록
- 지역, 음식 종류, 주문 난이도, 영어 응대, 혼밥, 매운 정도, 비건 옵션 필터
- 식당 상세 화면에서 추천 메뉴, 주문 팁, 주의사항, 지도 링크 제공

## API Overview

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | 회원가입 |
| `POST` | `/api/auth/login` | 로그인 및 JWT 발급 |
| `GET` | `/api/users/me` | 내 정보 조회 |
| `GET` | `/api/posts` | 게시글 목록, 검색, 정렬 |
| `GET` | `/api/posts/{postId}` | 게시글 상세 조회 |
| `POST` | `/api/posts` | 게시글 작성 |
| `PUT` | `/api/posts/{postId}` | 게시글 수정 |
| `DELETE` | `/api/posts/{postId}` | 게시글 삭제 |
| `POST` | `/api/posts/{postId}/likes` | 게시글 좋아요 toggle |
| `GET` | `/api/posts/{postId}/comments` | 댓글 트리 조회 |
| `POST` | `/api/posts/{postId}/comments` | 댓글 작성 |
| `PUT` | `/api/comments/{commentId}` | 댓글 수정 |
| `DELETE` | `/api/comments/{commentId}` | 댓글 삭제 |
| `POST` | `/api/comments/{commentId}/likes` | 댓글 좋아요 toggle |
| `GET` | `/api/restaurants` | 식당 목록 및 필터 |
| `GET` | `/api/restaurants/{restaurantId}` | 식당 상세 |

## Design Notes

### Security

`JwtConfig`는 Spring property로 `jwt.secret`을 주입받고, `JwtUtil`은 주입된 secret만 사용합니다. 운영 profile에서는 `JWT_SECRET` 환경변수가 없으면 애플리케이션이 시작되지 않도록 구성했습니다.

### Authorization

게시글과 댓글 수정/삭제는 작성자만 수행할 수 있습니다. 이 검증 로직은 서비스 계층에서 처리하며, 실패 시 명확한 forbidden error를 반환합니다.

### Audit History

게시글과 댓글은 생성, 수정, 삭제 시점의 snapshot을 history table에 저장합니다. 단순히 현재 상태만 보관하지 않고, 변경 과정을 추적할 수 있도록 설계했습니다.

### Frontend API Layer

프론트엔드는 도메인별 API 모듈을 분리하고, 인증이 필요한 요청은 `authFetch`를 통해 처리합니다. 401/403 응답 시 인증 상태 정리와 리다이렉트 흐름을 한 곳에서 관리합니다.

## Getting Started

### Requirements

- macOS
- Java 17
- Node.js 20 이상 권장
- Docker Desktop

### Backend Local

```bash
cd backend
./gradlew bootRun
```

Backend runs at:

```text
http://localhost:8080
```

Local profile uses H2 in-memory database and test seed data.

### Frontend Local

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

If needed, create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Docker Backend

```bash
cp .env.docker.example .env
docker compose up --build
```

Docker backend runs at:

```text
http://localhost:18080
```

Stop containers:

```bash
docker compose down
```

## Test

Backend:

```bash
cd backend
./gradlew test
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Environment

| Variable | Purpose | Local/Docker |
| --- | --- | --- |
| `JWT_SECRET` | JWT HS512 signing key | Required for prod/Docker |
| `DB_URL` | MySQL JDBC URL | Docker/prod |
| `DB_USERNAME` | DB username | Docker/prod |
| `DB_PASSWORD` | DB password | Docker/prod |
| `JPA_DDL_AUTO` | Hibernate DDL strategy | Docker/prod |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | Docker/prod |
| `NEXT_PUBLIC_API_BASE_URL` | Frontend API base URL | Frontend |

Real `.env` files are intentionally ignored by Git. Only `.env.docker.example` is tracked as a local Docker template.

## Repository Safety

The repository is prepared for public upload:

- `.env`, `.env.local`, `.env.docker` are ignored
- `node_modules`, `.next`, Gradle `build`, `.gradle`, IDE files are ignored
- Docker test values are separated into `.env.docker.example`
- Production secrets must be injected through environment variables

## What I Focused On

이 프로젝트에서 가장 신경 쓴 부분은 "기능이 동작한다"에서 끝내지 않고, 서비스 구조로 확장될 수 있는 기본기를 갖추는 것이었습니다.

- 인증과 권한을 명확히 분리했습니다.
- 데이터 삭제를 물리 삭제가 아닌 상태 전환으로 다뤘습니다.
- 변경 이력을 남겨 운영 관점의 추적 가능성을 확보했습니다.
- 백엔드 API 계약과 프론트엔드 API client를 분리했습니다.
- 로컬 개발, Docker 테스트, 운영 profile의 환경 구성을 구분했습니다.
- monorepo 구조로 backend와 frontend를 한 저장소에서 관리하도록 정리했습니다.

## Commit History

The repository starts from a clean monorepo baseline:

```bash
git log --oneline
```

Recent setup commits include:

```text
chore: initialize homepage monorepo
chore: move docker config to monorepo root
```
