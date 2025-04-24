document.addEventListener('DOMContentLoaded', function() {

    // --- Select DOM Elements ---
    const videoWrapper = document.getElementById('video-wrapper');
    const video = document.getElementById('feature-video');
    const playButton = document.getElementById('play-button');
    const slider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonial-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    const modal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('modal-close-button');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    const contactForm = document.getElementById('contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactEmailInput = document.getElementById('contact-email');
    const contactMessageInput = document.getElementById('contact-message');

    // --- Smooth Scrolling ---
    // Select links in specified areas whose href starts with #
    const scrollLinks = document.querySelectorAll('.main-nav a[href^="#"], .footer a[href^="#"], .logo[href="#"]'); // Added .logo with href="#" and footer links

    if (scrollLinks.length > 0) {
        console.log('Smooth scroll links found:', scrollLinks.length); // Debugging
        scrollLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                console.log(`Link clicked: ${href}`); // Debugging: Log clicked link

                // Target ID is the href value without the '#'
                const targetId = href.substring(1); // Gets "pricing" from "#pricing"

                // Handle the "Home" link or any link just pointing to "#" -> scroll to top
                if (href === '#') {
                    event.preventDefault();
                    console.log('Scrolling to top (href="#")'); // Debugging
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return; // Exit this link's handler
                }

                // Handle links pointing to specific section IDs (e.g., "#pricing")
                // Check if it starts with # and has a valid ID part
                if (href.startsWith('#') && targetId) {
                    const targetElement = document.getElementById(targetId); // Use getElementById for efficiency

                    if (targetElement) {
                        event.preventDefault(); // Prevent default jump ONLY if target exists
                        console.log(`Scrolling to element: #${targetId}`); // Debugging
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start' // 'start' aligns top of element with top of viewport
                        });
                    } else {
                        // Log warning if target ID doesn't exist in the DOM
                        console.warn(`Smooth scroll target element with id="${targetId}" not found for link href="${href}". Check HTML IDs.`);
                        // Allow default behavior *if* target not found (might be intended for off-page links mistakenly starting with #)
                    }
                } else {
                     console.log(`Link href "${href}" is not a valid internal scroll link. Allowing default behavior.`); // Debugging
                }
            });
        });
    } else {
        console.warn("No navigation links found for smooth scrolling setup. Check selectors.");
    }


    // --- Video Player Functionality ---
    // [ Keeping the Video Player code as previously optimized ]
    if (videoWrapper && video && playButton) {
        const togglePlay = () => { /* ... video toggle logic ... */ if (video.paused || video.ended) video.play(); else video.pause(); };
        playButton.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', () => { videoWrapper.classList.add('playing'); playButton.style.display = 'none'; });
        video.addEventListener('pause', () => { videoWrapper.classList.remove('playing'); playButton.style.display = 'flex'; });
        video.addEventListener('ended', () => { videoWrapper.classList.remove('playing'); playButton.style.display = 'flex'; });
    } else { console.warn("Video player elements not found."); }


    // --- Testimonial Carousel Functionality ---
    // [ Keeping the Testimonial code as previously optimized ]
    if (slider && slides.length > 0 && dotsContainer && dots.length === slides.length) {
        let currentSlide = 0;
        let slideInterval;
        function showSlide(index) { /* ... slide switching logic ... */ slides.forEach((s, i) => {s.classList.remove('active'); dots[i].classList.remove('active');}); slides[index].classList.add('active'); dots[index].classList.add('active'); currentSlide = index; }
        function nextSlide() { const nextIndex = (currentSlide + 1) % slides.length; showSlide(nextIndex); }
        function startInterval() { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 5000); }
        function resetInterval() { clearInterval(slideInterval); startInterval(); }
        dots.forEach((dot, index) => { dot.addEventListener('click', () => { if (index !== currentSlide) { showSlide(index); resetInterval(); } }); });
        showSlide(0); startInterval();
    } else { /* ... testimonial warning logs ... */ }


    // --- Shared Modal Functionality ---
    // [ Keeping the Modal code as previously optimized ]
    let isModalOpen = false;
    function openModal() {  if (!modal || isModalOpen) return; modal.style.display = 'flex'; modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); isModalOpen = true; closeModalButton?.focus(); }
    function closeModal() {  if (!modal || !isModalOpen) return; modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); isModalOpen = false; }
    if (modal && closeModalButton) {  closeModalButton.addEventListener('click', closeModal); modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); }); document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isModalOpen) closeModal(); }); }
    else { /* ... modal warning logs ... */ }


    // --- Newsletter Form Submission ---
    // [ Keeping the Newsletter code as previously optimized ]
    if (newsletterForm && newsletterEmailInput) { newsletterForm.addEventListener('submit', (e) => { e.preventDefault(); if (newsletterEmailInput.checkValidity()) { console.log("Newsletter Subscribed:", newsletterEmailInput.value); openModal(); /* newsletterForm.reset(); */ } else { newsletterEmailInput.reportValidity(); } }); }
    else { console.warn("Newsletter form elements not found."); }


    // --- Contact Form Submission ---
    // [ Keeping the Contact Form code as previously optimized ]
    if (contactForm && contactNameInput && contactEmailInput && contactMessageInput) { contactForm.addEventListener('submit', (e) => { e.preventDefault(); if (contactForm.checkValidity()) { console.log("Contact Form Submitted:", { name: contactNameInput.value, email: contactEmailInput.value, message: contactMessageInput.value }); openModal(); /* contactForm.reset(); */ } else { if (!contactNameInput.checkValidity()) contactNameInput.reportValidity(); else if (!contactEmailInput.checkValidity()) contactEmailInput.reportValidity(); else if (!contactMessageInput.checkValidity()) contactMessageInput.reportValidity(); } }); }
    else { console.warn("Contact form elements not found."); }

}); // End of DOMContentLoaded listener