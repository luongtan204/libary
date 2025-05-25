# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Terminal: npm install tailwindcss @tailwindcss/vite
vite.config.ts: import tailwindcss from '@tailwindcss/vite'
tailwindcss()
index.css @import "tailwindcss";
Terminal: npm run dev

- react redux -toolkit
  cài : npm install @reduxjs/toolkit react-redux
  tạo : + file : store.js + forder: features

- json server:
  cài : npm install -g json-server
  tạo : file db.jon
  Terminal: json-server --watch db.json --port 3001
  Package.jon: "json-server": "json-server --watch db.json --port 3001"

- npm install react-router-dom
- npm install sonner
- npm install axios
- npm install -g json-server
- npm install tailwindcss @tailwindcss/vite
- npm install @reduxjs/toolkit react-redux
