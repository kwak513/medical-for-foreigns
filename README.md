# 🏥 Doctor K

## 📢 Introduction
**Doctor K** — A multilingual healthcare information platform providing filtered hospital searches by supported languages, medical departments, and locations.
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/79beda7f-5b2a-43f9-bc0d-b229971c4108" />



## 📝 Service Overview
Doctor K is a multilingual web service designed to assist foreign residents in Korea. It simplifies the process of finding medical facilities by allowing users to filter hospitals based on their preferred language, required medical specialty, and region.



## 👥 Developer

| Name   | Role         |
|--------|--------------|
| Chaeyeon Kwak | Full-stack development |



## 🛠 Tech Stack

- **Frontend**: React, TypeScript  
- **Backend**: Spring Boot  
- **Database**: MariaDB  


## 📁 Key File Structure
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


## 📌 Key Features

### ✅ Hospital Search & Directory
- Advanced Filtering: Find healthcare providers based on Service Language, Department, and Region.
- Detailed Information: View comprehensive hospital profiles, including available services and user reviews.

### 🌐 Internationalization (i18n)
- Multi-language UI: Seamlessly switch between Korean and English interfaces.



## 🚀 Getting Started
⚙️ The Backend Server must be running for data fetching to function correctly.

```bash
# Clone the repository
git clone  https://github.com/kwak513/medical-for-foreigns.git

# Navigate to the directory
cd medical-for-foreigns

# Install dependencies
npm install

# Run the development server
npm run dev
```
## 🧩 Related Repository
**Backend**: [Link to Backend Repo](https://github.com/kwak513/medical-foreigns-back)


