document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('playVideoBtn');
    const thumbnail = document.getElementById('videoThumbnail');
    const videoWrapper = document.getElementById('videoPlayerWrapper');
    const video = document.getElementById('tanitimVideo');

    if (playBtn && thumbnail && videoWrapper && video) {
        // Thumbnail tıklama işlemi
        const playVideo = () => {
            // Animasyonla gizle
            thumbnail.style.opacity = '0';
            setTimeout(() => {
                thumbnail.style.display = 'none';
                videoWrapper.style.display = 'block';
                // Videoyu oynat (kullanıcı etkileşimi olduğu için autoplay kısıtlamasına takılmaz)
                video.play();
            }, 400); // css opacity geçiş süresi ile uyumlu
        };

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playVideo();
        });

        thumbnail.addEventListener('click', playVideo);
    }
});
