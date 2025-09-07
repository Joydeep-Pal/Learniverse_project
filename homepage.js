$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Dashboard card click handlers
    $('.dashboard-card').on('click', function() {
        const section = $(this).data('section');
        
        // Add click animation
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
        
        // Simulate navigation
        console.log(`Navigating to ${section} section`);
        alert(`Opening ${section.charAt(0).toUpperCase() + section.slice(1)} section`);
    });

    // Navbar active link update on scroll
    $(window).scroll(function() {
        const scrollPos = $(document).scrollTop();
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top - 100 <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Animate stats on scroll
    const animateStats = () => {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text().replace(/[^\d]/g, ''));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    const suffix = $this.text().includes('+') ? '+' : 
                                 $this.text().includes('%') ? '%' : '';
                    $this.text(Math.floor(this.countNum).toLocaleString() + suffix);
                },
                complete: function() {
                    const suffix = $this.text().includes('+') ? '+' : 
                                 $this.text().includes('%') ? '%' : '';
                    $this.text(countTo.toLocaleString() + suffix);
                }
            });
        });
    };

    // Trigger stats animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.hero-section'));

    // Add hover effects to chart bars
    $('.bar').hover(
        function() {
            $(this).css('transform', 'scaleY(1.1)');
        },
        function() {
            $(this).css('transform', 'scaleY(1)');
        }
    );

    // Leaderboard item click handler
    $('.leaderboard-item').on('click', function() {
        const username = $(this).find('.username').text();
        alert(`Viewing ${username}'s profile`);
    });
});