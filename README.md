# GYMPT (React)

Ứng dụng GYMPT đã được convert sang **React** (Vite + React Router).

## Yêu cầu

- Node.js >= 18
- npm (hoặc pnpm/yarn tương ứng)

## Cài đặt

```bash
npm install
```

## Chạy dev server

```bash
npm run dev
```

Mặc định mở tại `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

## Cấu trúc thư mục

```
.
├── index.html              # Vite entry HTML
├── vite.config.js
├── package.json
├── public/
│   └── assets/             # Ảnh tĩnh (avatar, background)
└── src/
    ├── main.jsx            # Bootstrap React + BrowserRouter
    ├── App.jsx             # Khai báo routes
    ├── components/
    │   ├── AppBar.jsx      # Thanh điều hướng dùng <NavLink>
    │   └── Background.jsx  # Lớp background dùng chung
    ├── pages/
    │   ├── Home.jsx        # Trang chủ (/)
    │   ├── Exercises.jsx   # /exercises – fetch từ API qua useEffect
    │   └── Profile.jsx     # /profile
    └── styles/
        ├── styles.css
        ├── exerciselib.css
        └── profile.css
```

## Routes

| Path         | Component   |
| ------------ | ----------- |
| `/`          | `Home`      |
| `/exercises` | `Exercises` |
| `/profile`   | `Profile`   |

## Ghi chú khi convert

- Các trang HTML rời (`index.html`, `exercise.html`, `profile.html`) được hợp
  nhất thành SPA với React Router.
- Logic fetch + filter + search của trang Exercises chuyển sang `useState` /
  `useEffect` / `useMemo`.
- Asset (`bg.jpg`, `avatar.jpg`) đặt trong `public/assets/` nên đường dẫn dùng
  `/assets/...` (Vite phục vụ trực tiếp).
- Class `.menu a.active` được thêm trong CSS để tận dụng `NavLink` highlight
  trang hiện tại.
