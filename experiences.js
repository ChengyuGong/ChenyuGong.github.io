document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.experience-section');
    const travelToggle = document.querySelector('.travel-toggle');
    const travelContent = document.querySelector('.travel-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    // 导航菜单切换逻辑
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('show');
        });
    });

    // 立即显示所有内容
    sections.forEach(section => {
        section.classList.add('visible');
    });

    // 旅行部分的切换逻辑
    travelToggle.addEventListener('click', () => {
        travelToggle.classList.toggle('active');
        travelContent.classList.toggle('active');
        
        if (travelContent.classList.contains('active')) {
            setTimeout(() => {
                travelContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300); // 等待内容展开后再滚动
        }
    });

    // 添加触摸滑动支持
    let startY;
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (!startY) return;
        
        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;

        if (diff > 50) {
            window.scrollBy(0, 50);
        } else if (diff < -50) {
            window.scrollBy(0, -50);
        }
    });

    document.addEventListener('touchend', () => {
        startY = null;
    });
});