  // Animation for job cards on scroll
  document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Cek apakah ada job cards
    const jobCards = document.querySelectorAll('.job-card');
    const jobListings = document.getElementById('jobListings');
    const noJobs = document.getElementById('noJobs');
    
    // Jika tidak ada job cards, tampilkan pesan 'noJobs'
    if (jobCards.length === 0) {
        jobListings.style.display = 'none';
        noJobs.style.display = 'block';
    }

    // Apply button hover effect
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('animate__animated', 'animate__rubberBand');
            this.classList.remove('animate__pulse', 'animate__infinite', 'animate__slow');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('animate__rubberBand');
            this.classList.add('animate__pulse', 'animate__infinite', 'animate__slow');
        });
        
        button.addEventListener('click', function() {
            alert('Terima kasih telah melamar! Tim kami akan menghubungi Anda segera.');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});