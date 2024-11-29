# Allen Movies 電影資訊網站

[English Version](#allen-movies-website) 👇

## 專案簡介

Allen Movies 是一個電影資訊網站，使用 [TMDB API](https://developers.themoviedb.org/3) 作為資料來源。此專案使用 Next.js 14 開發，並採用 App Router。

## 功能特色

- 瀏覽熱門、趨勢、高分電影
- 搜尋電影（支援自動完成）
- 收藏喜愛的電影
- 從收藏清單中隨機選擇電影
- 查看電影詳細資訊（演員陣容、評論等）
- 響應式設計，支援多種裝置

## 使用技術

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (狀態管理)
- Embla Carousel

## 開始使用

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 專案結構

```
src/
├── api/          # API 相關
├── app/          # 頁面組件
├── components/   # 共用組件
├── hooks/        # 自定義 Hooks
├── store/        # 狀態管理
└── types/        # TypeScript 類型定義
```

---

# Allen Movies Website

## Introduction

Allen Movies is a movie information website powered by [TMDB API](https://developers.themoviedb.org/3). This project is built with Next.js 14 using the App Router.

## Features

- Browse popular, trending, and top-rated movies
- Search movies (with autocomplete)
- Save favorite movies
- Random movie picker from favorites
- View movie details (cast, reviews, etc.)
- Responsive design for all devices

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Embla Carousel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── api/          # API related
├── app/          # Page components
├── components/   # Shared components
├── hooks/        # Custom Hooks
├── store/        # State management
└── types/        # TypeScript type definitions
```
