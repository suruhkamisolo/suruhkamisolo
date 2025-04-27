
        // Page Loader
        window.addEventListener('load', function() {
            const loader = document.querySelector('.page-loader');
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Scroll Animation
        window.addEventListener('scroll', reveal);
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            for(let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const revealTop = reveals[i].getBoundingClientRect().top;
                const revealPoint = 150;
                
                if(revealTop < windowHeight - revealPoint) {
                    reveals[i].classList.add('active');
                }
            }
        }

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.9)';
            }
        });
        
        // Initialize reveal on page load
        window.addEventListener('DOMContentLoaded', reveal);
        
        // Feedback Button Click Event
    /*    document.querySelector('.feedback-button').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Fitur kritik dan saran akan segera hadir. Terima kasih atas minat Anda!');
        });
        */
       
