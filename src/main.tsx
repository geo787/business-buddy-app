
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add custom scrollbar styles for browser chrome
const style = document.createElement('style');
style.textContent = `
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
