const acivePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").
forEach(link =>{
  if(link.href.includes(`${acivePage}`)){
    link.classList.add("active");
    
  }
})