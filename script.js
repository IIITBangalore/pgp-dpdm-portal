// Image Preloader
function preloadImages() {
    // Define critical images that should load first
    const criticalImages = [
        'assets/hero/hero1.jpg',
        'assets/hero/hero2.JPG',
        'assets/hero/hero3.jpeg',
        'assets/hero/hero4.JPG',
        'https://www.iiitb.ac.in/includefiles/settings/iiitb_logo.png'
    ];

    // Load critical images first
    const criticalPreloads = criticalImages.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
                console.warn(`Failed to load critical image: ${src}`);
                resolve(); // Resolve even on error to not block loading
            };
            img.src = src;
        });
    });
    
    // After critical images are loaded, remove preloader
    Promise.all(criticalPreloads).then(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }

        // Then load remaining images in the background
        loadRemainingImages();
    });
}

function loadRemainingImages() {
    // Define all asset directories
    const assetDirectories = {
        profiles: [
            'abhigyanrai.jpg', 'abinandhan.jpg', 'aditirk.jpg', 'aiswaryamanoj.jpg',
            'akankshajoshi.jpg', 'alinadesai.jpg', 'ashutoshvaish.jpg', 'chandanabalabomma.jpg',
            'chandrakiranhj.jpg', 'divyadarshini.jpg', 'jaskiratsingh.jpg', 'kamitikarhemant.jpg',
            'pallavibhatt.jpg', 'punyattripathi.jpg', 'rahulraj.png', 'renutr.jpg',
            'ritikamehrotra.jpeg', 'rohancarlo.jpg', 'sanjanashashidhar.jpg', 'shivakantsingh.jpg',
            'shubhamhandoo.jpg', 'sivakopparapu.jpg', 'snehasingh.jpg', 'sreejithn.jpg',
            'upaurnnamy.jpg', 'vatsal.jpg', 'DIRECTOR.png'
        ],
        gallery: ['gallery1.jpg', 'gallery2.jpeg', 'gallery3.jpeg', 'gallery4.jpg', 
                 'gallery5.jpg', 'gallery6.jpg', 'gallery7.jpg'],
        recruiters: ['intuit.jpg', 'microsoft.jpg', 'netapp.jpg', 'amazon.jpg', 
                    'cisco.jpg', 'ibm.jpg', 'infosys.jpg', 'hsbc.jpg', 
                    'sap.jpg', 'samsung.jpg', 'anz.jpg'],
        projects: ['project1.jpg']
    };

    // Load remaining images in chunks to prevent overwhelming the browser
    const chunkSize = 5;
    const remainingImages = [
        ...assetDirectories.profiles.map(img => `assets/profiles/${img}`),
        ...assetDirectories.gallery.map(img => `assets/gallery/${img}`),
        ...assetDirectories.recruiters.map(img => `assets/recruiters/${img}`),
        ...assetDirectories.projects.map(img => `assets/projects/${img}`)
    ];

    function loadImageChunk(startIndex) {
        const chunk = remainingImages.slice(startIndex, startIndex + chunkSize);
        if (chunk.length === 0) return;

        chunk.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Load next chunk after a delay
        setTimeout(() => loadImageChunk(startIndex + chunkSize), 100);
    }

    // Start loading remaining images in chunks
    loadImageChunk(0);
}

// Preloader
function removeLoader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Start preloading images
    preloadImages().then(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 500);
    });
}

// Remove loader when DOM is ready
document.addEventListener('DOMContentLoaded', removeLoader);

// Backup removal on window load
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 500);
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
});

// Projects Slider
const projectsSwiper = new Swiper('.projects-slider', {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 800,
    grabCursor: true,
    parallax: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    on: {
        init: function() {
            let activeSlide = this.slides[this.activeIndex];
            activeSlide.style.transform = 'scale(1)';
        },
        slideChangeTransitionStart: function() {
            let prevSlide = this.slides[this.previousIndex];
            let activeSlide = this.slides[this.activeIndex];
            
            if (prevSlide) {
                prevSlide.style.transform = 'scale(0.85)';
                prevSlide.style.transition = 'all 0.5s ease';
            }
            
            if (activeSlide) {
                activeSlide.style.transform = 'scale(1)';
                activeSlide.style.transition = 'all 0.5s ease';
            }
        }
    }
});

// Add hover pause functionality
const projectsSlider = document.querySelector('.projects-slider');
if (projectsSlider) {
    projectsSlider.addEventListener('mouseenter', () => {
        projectsSwiper.autoplay.stop();
    });
    
    projectsSlider.addEventListener('mouseleave', () => {
        projectsSwiper.autoplay.start();
    });
}

// Batch Profile Filter and Search
const profiles = document.querySelectorAll('.profile-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('#search');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        profiles.forEach(profile => {
            if (filter === 'all' || profile.dataset.specialization === filter) {
                profile.style.display = 'block';
            } else {
                profile.style.display = 'none';
            }
        });
    });
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    profiles.forEach(profile => {
        const name = profile.querySelector('h3').textContent.toLowerCase();
        const skills = profile.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || skills.includes(searchTerm)) {
            profile.style.display = 'block';
        } else {
            profile.style.display = 'none';
        }
    });
});

// Scroll Animation
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let count = 0;
            const updateCount = () => {
                const increment = target / 50;
                if (count < target) {
                    count += increment;
                    entry.target.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    // Only add "+" sign if the target is not 30 (Elite Students)
                    entry.target.textContent = target === 30 ? target : target + "+";
                }
            };
            updateCount();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Mobile Menu Toggle with performance optimizations
const menuToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
let isMenuAnimating = false;

menuToggle.addEventListener('click', () => {
    if (isMenuAnimating) return;
    isMenuAnimating = true;
    
    requestAnimationFrame(() => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        isMenuAnimating = false;
    });
});

// Optimized Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        // Use native smooth scroll with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu with animation frame
        if (mobileMenu.classList.contains('active')) {
            requestAnimationFrame(() => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        }
    });
});

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
});

// Gallery Section
const galleryData = [
    { image: 'gallery1.jpg', title: 'Painting Workshop', description: 'Canvas painting workshop' },
    { image: 'gallery2.jpeg', title: 'UR Class', description: 'User Research Class with Professor Preeti' },
    { image: 'gallery3.jpeg', title: 'Panel Discussion', description: 'FutureReady: Product driven growth' },
    { image: 'gallery4.jpg', title: 'Class Presentation', description: 'A Brief Analysis on District by Zomato' },
    { image: 'gallery5.jpg', title: '2nd Runner Up', description: 'ProdSolve: PM Case Study challenge' },
    { image: 'gallery6.jpg', title: '1st Runner Up', description: 'ProdSolve: PM Case Study challenge' },
    { image: 'gallery7.jpg', title: 'Winners', description: 'ProdSolve: PM Case Study challenge' }
];

function initializeGallery() {
    const gallery = document.querySelector('.gallery-stream');
    if (!gallery) return;

    gallery.innerHTML = `
        <div class="swiper-container gallery-slider">
            <div class="swiper-wrapper">
                ${galleryData.map(item => `
                    <div class="swiper-slide">
                        <div class="gallery-item">
                            <img src="assets/gallery/${item.image}" alt="${item.title}">
                            <div class="gallery-overlay">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `;
    
    // Initialize Swiper
    const gallerySwiper = new Swiper('.gallery-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: false
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        on: {
            init: function() {
                document.querySelector('.gallery-slider').style.overflow = 'visible';
            }
        }
    });

    // Add hover pause functionality
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', () => {
            gallerySwiper.autoplay.stop();
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            gallerySwiper.autoplay.start();
        });
    }
}

// Initialize gallery on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeGallery);

// Recruiters Data
const recruiters = [
    { name: 'Intuit', logo: 'assets/recruiters/INTUIT.jpg' },
    { name: 'Microsoft', logo: 'assets/recruiters/MICROSOFT.jpg' },
    { name: 'Netapp', logo: 'assets/recruiters/NETAPP.jpg' },
    { name: 'Amazon', logo: 'assets/recruiters/AMAZON.jpg' },
    { name: 'Cisco', logo: 'assets/recruiters/CISCO.jpg' },
    { name: 'IBM', logo: 'assets/recruiters/IBM.jpg' },
    { name: 'Infosys', logo: 'assets/recruiters/INFOSYS.jpg' },
    { name: 'HSBC', logo: 'assets/recruiters/HSBC.jpg' },
    { name: 'SAP', logo: 'assets/recruiters/SAP.jpg' },
    { name: 'SAMSUNG', logo: 'assets/recruiters/SAMSUNG.jpg' },
    { name: 'ANZ', logo: 'assets/recruiters/ANZ.jpg' }
];

// Initialize Recruiters Carousel
function initializeRecruiters() {
    const marqueeGroup = document.querySelector('.marquee-group');
    if (!marqueeGroup) return;

    // Clear existing content
    marqueeGroup.innerHTML = '';

    // Create recruiter logos
    recruiters.forEach(recruiter => {
        const logo = document.createElement('div');
        logo.className = 'recruiter-logo';
        logo.innerHTML = `<img src="${recruiter.logo}" alt="${recruiter.name} logo">`;
        marqueeGroup.appendChild(logo);
    });

    // Clone the marquee group for seamless scrolling
    const clone = marqueeGroup.cloneNode(true);
    document.querySelector('.marquee').appendChild(clone);
}

// Call the initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRecruiters();
});

// Batch Profiles Data
const batchProfiles = [
    {
        name: "Abhigyan Saksham Rai",
        title: "Aspiring Product Manager",
        domain: "product",
        image: "assets/profiles/abhigyanrai.jpg",
        linkedin: "https://www.linkedin.com/in/abhigyan-saksham-rai/",
        domains: ["Data Interpretation", "Product Management", "Stakeholder Management"],
        description: "Former Product Analyst at Stellantis with 2.5 years of experience in product and program management, focused on AI, Web 3.0, in-vehicle digital products, and connected car programs. Aspiring to harness my knowledge and skills to solve customer problems and advance in product management."
    },
    {
        name: "Abinandhan I",
        title: "Aspiring Product Manager",
        experience: ">2",
        domain: "ux",
        image: "assets/profiles/abinandhan.jpg",
        linkedin: "https://www.linkedin.com/in/uxer96",
        domains: ["Product Design(UI/UX)", "Problem Solving", "Management"],
        description: "Strategic thinker, and a creative problem solver with over 3 years of experience in UX/UI design, now aiming to transition into product management to shape intuitive, impactful products."
    },
    {
        name: "Aditi R K",
        title: "Aspiring Product Manager",  
        experience: "Fresher",
        domain: ["product","ux"],
        image: "assets/profiles/aditirk.jpg",
        linkedin: "https://www.linkedin.com/in/aditi-rk?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        domains: ["Product Management", "User Experience", "Product Design"],
        description: "As a Computer Science graduate aspiring to become a product manager, I am committed to leveraging my strong technical foundation to drive product innovation and create user-centered solutions. My goal is to integrate my technical expertise with strategic insight to develop impactful and intuitive products."
    },
    {
        name: "Aiswarya Manoj",
        title: "Aspiring Product Manager",
        experience: "2",
        domain: "product",
        image: "assets/profiles/aiswaryamanoj.jpg",
        linkedin: "www.linkedin.com/in/aiswarya-manoj-6a65171b5",
        domains: ["Product Management", "Product Strategy", "Product Design"],
        description: "Aspiring product manager interested in product design and management with over 2 years of experience in management role. Equipped with a background in Englisgh literature specialising in Journalism"
    },
    {
        name: "Akanksh joshi",
        title: "Aspiring Product Manager",
        experience: "<1",
        domain: "product",
        image: "assets/profiles/akankshajoshi.jpg",
        linkedin: "https://www.linkedin.com/in/akanksh-joshi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        domains: ["Web development", "Communication", "Data Analysis"],
        description: "I have done two internship as a frontend developer for 3 months and company names are Enord and WNS and I aspire to became a technical product manager who could provide good insight and good user interface and solutions also ."
    },
    {
        name: "Alina Abhish Desai",
        title: "Aspiring Product Designer",
        experience: "Fresher",
        domain: ["ux","research"],
        image: "assets/profiles/alinadesai.jpg",
        linkedin: "https://www.linkedin.com/in/alinadesai16/",
        domains: ["Product Design", "User Research", "Design Strategy"],
        description: "Dedicated to designing digital products that make a meaningful difference. By blending psychology, management, and design principles, my goal is to create user experiences that are both engaging and effective."
    },
    {
        name: "Ashutosh Vaish",
        title: "Aspiring Product Manager",
        experience: "1",
        domain: "product",
        image: "assets/profiles/ashutoshvaish.jpg",
        linkedin: "https://www.linkedin.com/in/vaishashutosh/",
        domains: ["Cross team collaboration", "Data Analysis", "Management"],
        description: "A Computer Science graduate with a strong foundation in technology and work experience in education and the CEO's office at a startup. Looking to transition to software product management."
    },
    {
        name: "Balabomma Chandana",
        title: "Aspiring Product Manager",
        experience: "Fresher",
        domain: "product",
        image: "assets/profiles/chandanabalabomma.jpg",
        linkedin: "www.linkedin.com/in/chandanabalabomma",
        domains: ["Product Management", "User Research", "Accessibility testing"],
        description: "Visually impaired student pursuing PGP-DPDM at IIIT Bangalore, with a B.Sc (MSCS), certified DHS Section 508 Trusted Tester, aspiring for roles in accessibility product management, business analysis, accessibility testing, digital product design, and user research."
    },
    {
        name: "Chandrakiran HJ",
        title: "Product Enthusiast",
        experience: "Fresher",
        domain: ["product", "research"],
        image: "assets/profiles/chandrakiranhj.jpg",
        linkedin: "https://www.linkedin.com/in/chandrakiran-hj-835b65196/",
        domains: ["Understanding Users","Problem Solving","Strategy"],
        description: "A curious and driven product enthusiast, exploring innovative digital solutions in diverse domains like construction, fitness, and fintech. Passionate about designing impactful products, solving real-world problems, and creating meaningful user experiences."
    },
    {
        name: "Divya Darshini . S",
        title: "Aspiring Product Manager",
        experience: "Fresher",
        domain: "product",
        image: "assets/profiles/divyadarshini.jpg",
        linkedin: "https://www.linkedin.com/in/divya-darshini-s-b8aa46230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app and",
        domains: ["User Research", "Market Research", "Product Research"],
        description: "Aspiring Product Manager with a background in Marketing and Finance, passionate about creating innovative solutions to enhance user experiences and accessibility."
    },
    {
        name: "Jaskirat Singh Sanghera",
        title: "Aspiring Polymath",
        experience: "<1",
        domain: "research",
        image: "assets/profiles/jaskiratsingh.jpg",
        linkedin: "linkedin.com/in/sangherajaskirat",
        domains: ["User Research", "Strategic Management", "Marketing Management"],
        description: "A curious designer looking to build forgettable designs and memorable experiences."
    },
    {
        name: "Kamitikar hemanth",
        title: "Aspiring Product Manager",
        experience: "Fresher",
        domain: "product",
        image: "assets/profiles/kamitikarhemant.jpg",
        linkedin: "https://linkedin.com/in/hemanth-kamitikar-331328250",
        domains: ["Product Management","Finance","Data"],
        description: "A visually impaired student with an MBA in Finance and a passion for Product Management, User Research, UX, Market Research, Innovation, and Design Thinking"
    },
    {
        name: "Mainak Sengupta",
        title: "Aspiring Product Manager",
        experience: "2",
        domain: "product",
        image: "assets/profiles/mainaksengupta.jpg",
        linkedin: "https://www.linkedin.com/in/mainak-sengupta007/",
        domains: ["Market Research", "Data-driven decision making", "Stakeholder Management"],
        description: "Experienced IT and Strategy consultant, adept at delivering strategic insights and solutions. Transitioning to product design and management to combine strategic thinking with creative innovation, focusing on user-driven solutions."
    },
    {
        name: "Malavika S",
        title: "Aspiring UI Designer",
        experience: "Fresher",
        domain: "ux",
        image: "assets/profiles/malavikas.jpg",
        linkedin: "https://www.linkedin.com/in/malavika-suresh-40642a293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        domains: ["User research","Prototyping","Design thinking"],
        description: "An urban designer curious about how spaces work, exploring digital design and creating meaningful experiences, one font at a time."
    },
    {
        name: "Manish Kumar",
        title: "Aspiring Product Manager",
        experience: ">4",
        domain: "product",
        image: "assets/profiles/manishkumar.jpg",
        linkedin: "https://www.linkedin.com/in/manish-kumar-635498176",
        domains: ["Product design", "Data-Driven Decision Making", " Customer-Centric Product"],
        description: "Former banker transitioning to product management, blending analytical rigor with strategic insight. Skilled in financial analysis, data-driven decision-making, and customer-centric innovation."
    },
    {
        name: "Nagaraj Patil",
        title: "Aspiring Product Manager",
        experience: "<1",
        domain: "product",
        image: "assets/profiles/nagarajpatil.jpg",
        linkedin: "https://www.linkedin.com/in/nagaraj-patil-840b25136?trk=contact-info",
        domains: ["Operations","Market Research","Product Design"],
        description: "Aspiring Product Manager, Adept in supply chain, operations, real estate and natural farming. Skilled in driving innovation, operational effeciency and strageic growth"
    },
    {
        name: "Pallavi Bhatt",
        title: "Aspiring Product Designer",
        experience: "3",
        domain: "ux",
        image: "assets/profiles/pallavibhatt.jpg",
        linkedin: "https://www.linkedin.com/in/pallavi-bhatt-542a17116/",
        domains: ["UX Design", "User Research", "Problem Solving"],
        description: "Passionate about crafting intuitive, research-driven user experiences, I combine design thinking and data insights to solve real-world problems. I write on UX, technology, and innovation."
    },
    {
        name: "Punyat Tripathi",
        title: "Aspiring Accessibility and Product Manager",
        experience: "<1",
        domain: "product",
        image: "assets/profiles/punyattripathi.jpg",
        linkedin: "https://www.linkedin.com/in/punyatrips",
        domains: ["Product Management", "Accessibility Research", "Data Analysis"],
        description: "Passionate Product Manager and Developer skilled in research, data analysis, and innovation. Dedicated to building inclusive, scalable solutions that prioritize accessibility and user-centric design."
    },
    {
        name: "Rahul Raj",
        title: " Aspiring Product manager",
        experience: "1",
        domain: "product",
        image: "assets/profiles/rahulraj.png",
        linkedin: "https://www.linkedin.com/in/rahul-raj-a5b9b8184",
        domains: ["Product Design", "Product Management", "Data Analysis"],
        description: "Enthusiastic visionary innovator possessing robust analytical and leadership capabilities, dedicated to fostering innovation via user-centered product design and data-informed decision-making. Dedicated to the creation of innovative, impactful products by combining strategic vision with UX/UI expertise."
    },
    {
        name: "Renu T R",
        title: "Aspiring Product Manager",
        experience: ">4",
        domain: "product",
        image: "assets/profiles/renutr.jpg",
        linkedin: "https://www.linkedin.com/in/renu-t-r-b116b5178/",
        domains: ["Data Analysis", "User centric design", "Communication"],
        description: "Experienced Programmer Analyst with a strong foundation in code enhancement and development, adept at identifying and resolving root causes of abends, and proficient in technical documentation. Aspiring Product Manager, aiming to leverage expertise in management, analytics, and design thinking to develop impactful, user-centric solutions."
    },
    {
        name: "Ritika Mehrotra",
        title: "Aspiring program/product manager",
        experience: ">2",
        domain: "product",
        image: "assets/profiles/ritikamehrotra.jpeg",
        linkedin: "NA",
        domains: ["Data Analysis", "Communication", "Project management"],
        description: "A data science professional, with skills in data analysis, machine learning as well as data-driven decision making. Aspiring to transition into product management, to drive product development and user-centric innovative solutions of the future."
    },
    {
        name: "Rohan Robin Carlo",
        title: "Reseach Product Innovator",
        experience: "Fresher",
        domain: ["product", "research"],
        image: "assets/profiles/rohancarlo.jpg",
        linkedin: "https://in.linkedin.com/in/rohan-carlo-840338268",
        domains: ["Healthcare", "Education", "Accessibilty"],
        description: "A research product innovator with a passion for creating impactful products. Skilled in problem solving, design thinking and pro-active strategies."
    },
    {
        name: "Sanjana Shashidhar",
        title: "Aspiring Product Designer",
        experience: ">4",
        domain: "product",
        image: "assets/profiles/sanjanashashidhar.jpg",
        linkedin: "https://www.linkedin.com/in/sanjana-shashidhar-072650166/",
        domains: ["User Research", "UI/UX Design","Cross-Team Collaboration"],
        description: " UI/UX designer with a strong foundation in educational content creation, dedicated to designing intuitive and user-centred digital products that simplify experiences and create meaningful interactions."
    },
    {
        name: "Shivakant Singh",
        title: "Aspiring Product Manager",
        experience: ">2",
        domain: "product",
        image: "assets/profiles/shivakantsingh.jpg",
        linkedin: "https://www.linkedin.com/in/shivakant-singh-771749248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        domains: ["Accessibilty", "Product Management", "Market Research"],
        description: "A product manager with a passion for creating accessible and user-centric products. Skilled in market research, product design, and user-centered design."
    },
    {
        name: "Shubham Handoo",
        title: "Aspiring for Product Roles",
        experience: ">1",
        domain: "product",
        image: "assets/profiles/shubhamhandoo.jpg",
        linkedin: "https://linkedin.com/in/shubham-handoo-783275184",
        domains: ["Product Engineering", "Data Analysis", "Problem Solving"],
        description: "Civil Engineering graduate with strong foundation in Project Mangement, passionate about transition into product management to harness analytical skills and drive innovative solutions with engineering expertise & strategic thinking  into tech-driven environments & to deliver impactfull products."
    },
    {
        name: "Siva Sai Sagar Kopparapu",
        title: "Aspiring Product Manager",
        experience: "Fresher",
        domain: "Product",
        image: "assets/profiles/sivakopparapu.jpg",
        linkedin: "https://www.linkedin.com/in/sagar-kopparapu-6b5b3b2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        domains: ["Product Management", "Business Strategy", "Market Research"],
        description: "BBA graduate interested towards digital products, looking to begin a career in product management, assisting teams in developing intuitive and creative digital solutions.Proficient in developing strategy, process design, creating product roadmaps, and conducting user research."
    },
    {
        name: "Sneha Singh",
        title: "Aspiring Product Designer",
        experience: "<1",
        domain: "ux",
        image: "assets/profiles/snehasingh.jpg",
        linkedin: "https://www.linkedin.com/in/sneha-singh-90393b19a",
        domains: ["User centred design", "Prototyping", "Collaborative problem solving"],
        description: "Curious design graduate with experience at a sustainable fashion startup and a love for all things creative. Currently on the hunt to create impactful and delightful digital experiences."
    },
    {
        name: "Sreejith N",
        title: "Aspiring Product Manager",
        experience: "<1",
        domain: "research",
        image: "assets/profiles/sreejithn.jpg",
        linkedin: "https://www.linkedin.com/in/sreejithn1999",
        domains: ["Agile methodlogies", "Customer Interviewing", "Performance metrics analysis"],
        description: "An engineer aspiring to become a product manager in the IT sector, leveraging data-driven decision-making and technical problem-solving skills. Passionate about driving product vision strategies for scalable solutions."
    },
    {
        name: "U Paurnnamy",
        title: "Aspiring Business Analyst ",
        experience: "Fresher",
        domain: "research",
        image: "assets/profiles/upaurnnamy.jpg",
        linkedin: "https://www.linkedin.com/in/paurnnamy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        domains: ["Research & Analysis", "Communication", "Data Visualisation"],
        description: "Leveraging my Economics background from Symbiosis School of Economics, I aim to blend analytical prowess with innovative thinking in a business analyst or product management role, driving strategic growth and impactful solutions."
    },
    {
        name: "Vatsal Jindal",
        title: "Aspiring Product Manager",
        experience: 24,
        domain: "consulting",
        image: "assets/profiles/vatsal.jpg",
        linkedin: "https://www.linkedin.com/in/vatsal-651563303",
        domains: ["Strategy", "User-centric", "Management"],
        description: "Former consultant with a technical background, eager to understand consumer behavior, business dynamics and technological advancements to create user-enhancing products."
    }
];

// Initialize Batch Profiles
function initializeBatchProfiles() {
    const profilesGrid = document.querySelector('.profiles-grid');
    if (!profilesGrid) return;

    profilesGrid.innerHTML = batchProfiles.map((profile, index) => {
        // Convert domain to array if it's a string
        const domains = Array.isArray(profile.domain) ? profile.domain : [profile.domain];
        
        return `
        <div class="profile-card" data-aos="fade-up" data-aos-delay="${index * 100}" 
             data-domains="${domains.join(' ')}"
             data-skills="${profile.domains.map(d => d.toLowerCase().replace(/[^a-z]/g, '')).join(' ')}">
            <div class="profile-image">
                <img src="${profile.image}" alt="${profile.name}" 
                     onerror="this.src='https://via.placeholder.com/400x400/2A2A5C/ffffff?text=${encodeURIComponent(profile.name[0])}'">
                <div class="profile-overlay">
                    <div class="profile-description">
                        <p>${profile.description}</p>
                    </div>
                </div>
            </div>
            <div class="profile-content">
                <h3>${profile.name}</h3>
                <p class="title">${profile.title}</p>
                <div class="domains">
                    ${profile.domains.map(domain => `<span>${domain}</span>`).join('')}
                </div>
                <a href="${profile.linkedin}" target="_blank" class="linkedin-btn" title="Connect on LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    `}).join('');
        
    // Initialize filters after cards are generated
    initializeProfileFilters();
}

// Initialize Profile Filters
function initializeProfileFilters() {
    const searchInput = document.querySelector('#search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const profileCards = document.querySelectorAll('.profile-card');

    if (!searchInput || !filterBtns.length || !profileCards.length) return;

    // Filter function
    function filterProfiles() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter.toLowerCase();

        profileCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const title = card.querySelector('.title').textContent.toLowerCase();
            const domains = card.dataset.domains.split(' ');
            const skills = card.dataset.skills.split(' ');

            const matchesSearch = name.includes(searchTerm) || 
                                title.includes(searchTerm) || 
                                skills.some(skill => skill.includes(searchTerm));
                                
            const matchesFilter = activeFilter === 'all' || domains.includes(activeFilter);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterProfiles);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProfiles();
        });
    });
}

// Initialize batch profiles on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeBatchProfiles);

// Initialize Hero Carousel
const heroSlider = new Swiper('.hero-slider', {
    effect: 'creative',
    creativeEffect: {
        prev: {
            translate: ['-20%', 0, -1],
            opacity: 0
        },
        next: {
            translate: ['100%', 0, 0],
            opacity: 0
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    speed: 1000,
    loop: true,
    loopAdditionalSlides: 2,
    grabCursor: true,
    navigation: {
        nextEl: '.hero-slider .swiper-button-next',
        prevEl: '.hero-slider .swiper-button-prev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    on: {
        init: function() {
            document.querySelector('.hero-slider').style.opacity = 1;
        },
        slideChangeTransitionStart: function() {
            const activeSlide = this.slides[this.activeIndex];
            const prevSlide = this.slides[this.previousIndex];
            
            if (prevSlide) {
                const prevImg = prevSlide.querySelector('img');
                if (prevImg) prevImg.style.transform = 'scale(1.1)';
            }
            
            if (activeSlide) {
                const activeImg = activeSlide.querySelector('img');
                if (activeImg) {
                    setTimeout(() => {
                        activeImg.style.transform = 'scale(1)';
                    }, 50);
                }
            }
        }
    }
});

// Mouse movement tracking for gradient effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

function openProjectModal(element) {
    const projectCard = element.closest('.project-card');
    document.getElementById('modalProjectName').innerText = projectCard.getAttribute('data-project-name');
    document.getElementById('modalTagline').innerText = projectCard.getAttribute('data-tagline');
    document.getElementById('modalDetails').innerText = projectCard.getAttribute('data-details');
    document.getElementById('modalKeywords').innerText = projectCard.getAttribute('data-keywords');
    document.getElementById('modalContributors').innerText = projectCard.getAttribute('data-contributors');
    
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modal.style.display = 'block'; // Show the modal
    setTimeout(() => {
        modal.classList.add('show'); // Add class for fade-in
        modalContent.classList.add('show'); // Add class for slide-in
    }, 10); // Delay to allow display to take effect
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.classList.remove('show'); // Remove slide-in class
    modal.classList.remove('show'); // Remove fade-in class
    
    setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal after transition
    }, 300); // Match this duration with the CSS transition duration
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
}
