document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');
    const startGameBtn = document.getElementById('startGameBtn');

    startGameBtn.addEventListener('click', function () {
        window.location.href = "https://denertova.github.io/SnakeApp/Game/";
    });

    document.addEventListener('mousemove', function (event) {
        const distanceX = event.clientX - (logo.offsetLeft + logo.offsetWidth / 2);
        const distanceY = event.clientY - (logo.offsetTop + logo.offsetHeight / 2);

        logo.style.top = logo.offsetTop + distanceY / 20 + 'px';
        logo.style.right = logo.offsetLeft - distanceX / 20 + 'px';
    });

    document.addEventListener('mouseout', function () {
        logo.style.animation = 'fadeOut 0.5s ease-in-out forwards';
    });
});