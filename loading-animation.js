// loading-animation.js

/* ===== TÉCNICA AVANÇADA ===== */
// 1. INJEÇÃO IMEDIATA DE CSS CRÍTICO
document.write(`
<style>
/* Bloqueio total da renderização */
body:not(.loaded) {
    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    position: fixed;
    width: 100%;
}
/* Estilos da animação */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4361ee, #3f37c9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.loading-content {
    text-align: center;
}
.loading-logo {
    font-size: 1.8rem;
    color: white;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
}
.loading-logo i {
    margin-right: 12px;
    font-size: 2.2rem;
    animation: pulse 5.0s infinite ease-in-out;
}
.loading-bar {
    width: 200px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
}
.loading-progress {
    height: 100%;
    width: 0%;
    background-color: white;
    border-radius: 2px;
    transition: width 5.0s ease;
}
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
</style>
`);

// 2. HTML DA ANIMAÇÃO INJETADO DIRETAMENTE
document.write(`
<div class="loading-screen">
    <div class="loading-content">
        <div class="loading-logo">
            <i class="fas fa-users"></i>
            <span>Gestão de Clientes</span>
        </div>
        <div class="loading-bar">
            <div class="loading-progress"></div>
        </div>
    </div>
</div>
`);

// 3. CONTROLE DE CARREGAMENTO
window.addEventListener('load', function() {
    // Animação da barra de progresso
    let progress = 0;
    const duration = 1500;
    const start = Date.now();
    const progressBar = document.querySelector('.loading-progress');
    
    function animate() {
        progress = Math.min((Date.now() - start) / duration * 100, 100);
        progressBar.style.width = `${progress}%`;
        
        if (progress < 100) {
            requestAnimationFrame(animate);
        } else {
            // Transição suave para o conteúdo
            document.body.classList.add('loaded');
            setTimeout(() => {
                document.querySelector('.loading-screen').remove();
                sessionStorage.setItem('loadingAnimationShown', 'true');
            }, 500);
        }
    }
    
    animate();
});

// Fallback de segurança
setTimeout(function() {
    document.body.classList.add('loaded');
}, 3000);
