

const themeToggleButton = document.getElementById('theme-toggle-btn');
const body = document.body;


let currentTheme = localStorage.getItem('theme') || 'light-theme';


body.classList.add(currentTheme);


themeToggleButton.addEventListener('click', () => {
  
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme'); 
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme'); 
  }
});