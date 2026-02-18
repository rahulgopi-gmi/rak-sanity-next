//header section
const headerContent = document.getElementById("headerContent");
const headerInner = document.getElementById("headerInner");


window.addEventListener("scroll", () => {
   

    // Check if screen is mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Always full width on mobile
        if (window.scrollY > 50) {
            headerContent.style.width = "100%";
            headerInner.style.paddingLeft = "1rem";
            headerInner.style.paddingRight = "1rem";
            headerContent.classList.remove("rounded-bl-lg", "rounded-br-lg", "mx-auto");
            headerContent.classList.add("border-rd-13");
        }
        else{
            headerInner.style.paddingLeft = "0";
            headerInner.style.paddingRight = "0";   
            headerContent.classList.remove("border-rd-13");        
        }
    }
    else{
        if (window.scrollY > 50) {
            headerContent.style.width = "95%";        
            headerInner.style.paddingLeft = "2rem"; // pl-4
            headerInner.style.paddingRight = "2rem"; // pr-4
            headerContent.classList.add("rounded-bl-lg", "rounded-br-lg", "mx-auto");
        } else {
            headerContent.style.width = "100%";
            headerInner.style.paddingLeft = "0";
            headerInner.style.paddingRight = "0";
            headerContent.classList.add("rounded-bl-lg", "rounded-br-lg", "mx-auto");
        }
    }    
});


// Get the hamburger menu button and mobile menu elements
const hamburgerMenu = document.getElementById("hamburgerMenu");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

let scrollPosition = 0;

// Set a CSS variable for actual viewport height
function setVh() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);

// Show the mobile menu when hamburger button is clicked
hamburgerMenu.addEventListener("click", () => {
    // mobileMenu.classList.remove("hidden");
    // mobileMenu.style.height = "100dvh";
    // document.documentElement.classList.add("overflow-hidden");
    // document.body.classList.add("overflow-hidden");

    scrollPosition = window.scrollY; // store current scroll
    mobileMenu.classList.remove("hidden");
    mobileMenu.style.height = `calc(var(--vh, 1vh) * 100)`; // full viewport height
    // Lock background scroll
    document.documentElement.classList.add("overflow-hidden");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
});

// Close the mobile menu when close button is clicked
closeMenu.addEventListener("click", () => {
    // mobileMenu.classList.add("hidden");
    // mobileMenu.style.height = "";
    // document.documentElement.classList.remove("overflow-hidden");
    // document.body.classList.remove("overflow-hidden");

    mobileMenu.classList.add("hidden");
    mobileMenu.style.height = "";
    // Unlock background scroll
    document.documentElement.classList.remove("overflow-hidden");
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition); // restore scroll position
});

