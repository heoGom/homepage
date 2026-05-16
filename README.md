# Homepage

Spring Boot backend와 Next.js + TypeScript frontend를 하나의 Git monorepo로 관리하는 프로젝트입니다.

## Structure

```text
homepage/
  backend/    # Spring Boot, Gradle
  frontend/   # Next.js, TypeScript
  README.md
  .gitignore
```

## Requirements

- macOS
- Java 17
- Node.js 20 이상 권장
- Docker Desktop (Docker 기반 백엔드 실행 시)

## Backend

```bash
cd backend
./gradlew bootRun
```

- Local API: `http://localhost:8080`
- Local profile은 H2 인메모리 DB를 사용합니다.

테스트:

```bash
cd backend
./gradlew test
```

Docker 실행:

```bash
cd backend
cp .env.docker.example .env
docker compose up --build
```

Docker 종료:

```bash
cd backend
docker compose down
```

Docker API: `http://localhost:18080`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- Local API 기본값: `http://localhost:8080`
- 필요 시 `frontend/.env.local`에 `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`을 설정합니다.

검사 및 빌드:

```bash
cd frontend
npm run lint
npm run build
```

## Git

이 저장소는 `backend/`, `frontend/`를 포함하는 단일 Git 저장소입니다. `node_modules`, `.next`, Gradle `build`, `.gradle`, `.env*` 파일은 커밋 대상에서 제외됩니다.

초기화와 커밋을 다시 수행해야 할 때의 macOS 기준 명령어:

```bash
cd /Users/heoseongjae/dev
mkdir -p homepage
mv back/homepage homepage/backend
mv front/homepage-front homepage/frontend
rm -rf homepage/backend/.git homepage/frontend/.git
rm -rf homepage/backend/.gradle homepage/backend/build homepage/backend/.idea
rm -rf homepage/frontend/node_modules homepage/frontend/.next
cd homepage
git init
git add README.md .gitignore backend frontend
git status --short --ignored
git commit -m "chore: initialize homepage monorepo"
```

민감정보 확인:

```bash
cd /Users/heoseongjae/dev/homepage
git status --short --ignored
find . -maxdepth 3 -type f -name '.env*' -print
git check-ignore .env backend/.env frontend/.env.local frontend/.env.docker
```
