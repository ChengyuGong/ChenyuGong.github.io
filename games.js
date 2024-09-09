document.addEventListener('DOMContentLoaded', () => {
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
});