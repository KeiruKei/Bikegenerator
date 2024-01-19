//Scrolling scrolling pra sa nav bar
const body = document.body;
//on this part, if value 0 is then nav bar appear, if not it disappears, if scroll up then value go to 0
let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll <= 0) {
		body.classList.remove("scroll-up");
		return;
	}

	if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {    
		body.classList.remove("scroll-up");
		body.classList.add("scroll-down");     
	} else if (
		currentScroll < lastScroll && body.classList.contains("scroll-down") //dito nangyayare sa part nato yung declarations or yung execution ng code sa ifififif
	) {
		body.classList.remove("scroll-down");
		body.classList.add("scroll-up");
	}
	lastScroll = currentScroll;
});

//animation for this part, when u click on the section of the nav bar, it brisngs u there then it then lights up as the current section u r in
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150; //here mostly animation stuffs too like how the active transforms to another section
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        console.log(`Section ID: {id}, Offset: {offset}, Height: {height}`);  //needed this line bc the sizes of each section is not specified so its having troubles

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
        }
    });
};



// transitions for or by sections, pra astig. smooth-scrolling on css wasnt that pleasing enough bc its default so we decided to use js for the smooth scrolling transitions
document.querySelectorAll('header nav a').forEach(anchor => { //selector, aka taga hanap
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); //here no talon, no jump like on css

        const targetId = this.getAttribute('href').substring(1); //here navs (product, about us, home)
        const target = document.getElementById(targetId); 

        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
            const scrollToTarget = (start, end, duration) => {

                //animation period
                const startTime = performance.now();
                const animateScroll = () => {

                    //calculation ditu (time specifically) pra don sa animation 
                    const currentTime = performance.now();
                    const timeElapsed = currentTime - startTime;
                    const easedPosition = ease(timeElapsed / duration) * (end - start) + start; 
                     window.scrollTo(0, easedPosition);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        window.scrollTo(0, end); 
                    }
                };

                requestAnimationFrame(animateScroll);
            };

            //ease yung nawawala na ewan parang siya
            const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            scrollToTarget(window.pageYOffset, offsetTop, 800); //change if needed, transition here
        }
    });
});


//hover parts pra sa descriiptions n name

function showDescription(descClass) {
    var description = document.querySelector("." + descClass);
    description.classList.add("show");
}

function hideDescription(descClass) {
    var description = document.querySelector("." + descClass);
    description.classList.remove("show");
}

