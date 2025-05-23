
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Script to apply theme immediately if needed
const script = document.createElement('script');
script.textContent = `
  const theme = localStorage.getItem('theme');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (!theme || theme === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
`;
document.head.appendChild(script);

createRoot(document.getElementById("root")!).render(<App />);
