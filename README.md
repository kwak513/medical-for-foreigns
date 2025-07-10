# 🏥 닥터 K (Doctor K)

## 📢 서비스 한줄 소개  
**Doctor K** — 진료 가능 언어, 진료과목, 지역 필터링이 가능한 다국어 병원 정보 웹사이트

---

## 📝 서비스 소개  
**Doctor K**는 외국인이 편리하게 병원 정보를 확인하고,
진료 가능한 언어, 진료과목, 지역 기준으로 필터링하여 자신에게 맞는 병원을 쉽게 찾을 수 있도록 돕는 다국어 웹 서비스입니다.

프로젝트 폴더 및 레포 이름: medical-for-foreigns  
서비스 명칭: Doctor K

---

## 👥 개발자 소개

| 이름   | 역할         |
|--------|--------------|
| 곽채연 | Frontend 개발, Backend 개발 |

---

## 🛠 기술 스택

- **Frontend**: React, TypeScript  
- **Backend**: Spring Boot  
- **Database**: MariaDB  

---

## 📁 주요 파일 구조
```
medical-for-foreigns/
├── public/
│ ├── locales/
│ │ ├── en/
│ │ │ └── translation.json
│ │ ├── ko/
│ │ │ └── translation.json
│
├── src/
│ ├── api/
│ │ └── MedicalApi.ts
│ │
│ ├── assets/
│ │ └── (이미지)
│ │
│ ├── layouts/
│ │ └── MainLayout.tsx
│ │
│ ├── pages/
│ │ ├── hospital/
│ │ │ ├── change/
│ │ │ │ └── ChangeReservationPage.tsx
│ │ │ ├── review/
│ │ │ │ ├── ChangeReviewPage.tsx
│ │ │ │ └── HospitalReviewPage.tsx
│ │ │ │ 
│ │ │ ├──HospitalMainPage.tsx
│ │ │ ├── HospitalInfoPage.tsx
│ │ │ └── HospitalRegisterPage.tsx
│ │ │
│ │ ├── member/
│ │ │ ├── change/
│ │ │ │ └──ChangeUserInfoPage.tsx
│ │ │ ├──LoginPage.tsx
│ │ │ ├──SignupPage.tsx
│ │ │ ├──MyPage.tsx
│ │ │ ├──FindIdPage.tsx
│ │ │ └──FindPasswordPage.tsx
│ │
│ ├── router/
│ │ └── router.tsx
│ │
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
│
└── index.html
```
---

## 📌 주요 기능

### ✅ 병원 정보 조회
- 병원 리스트 및 상세 정보 제공
- 진료 가능 언어, 진료과목, 지역 기준 필터링

### 🌐 다국어 지원
- 한국어, 영어 UI 제공
- 사용자가 원하는 언어로 인터페이스 전환 가능

---

## 🚀 시작 방법 (로컬 실행)
⚙️ 백엔드 서버도 함께 실행되어 있어야 데이터가 정상 출력됩니다.

```bash
# 프로젝트 클론
git clone  https://github.com/kwak513/medical-for-foreigns.git

# 디렉토리 이동
cd medical-for-foreigns

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```
## 🧩 관련 레포지토리
**Backend**: [Link to Backend Repo](https://github.com/kwak513/medical-foreigns-back)


