// loading-animation.js

// 1. ADICIONE ESTE CSS INLINE ANTES DE QUALQUER OUTRO CONTEÚDO
const preloadStyle = document.createElement('style');
preloadStyle.textContent = `
    body.preload {
        overflow: hidden;
        visibility: hidden;
        opacity: 0;
    }
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
        transition: opacity 0.5s ease-out;
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
        animation: pulse 1.5s infinite ease-in-out;
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
        transition: width 0.4s ease;
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.prepend(preloadStyle);

// 2. BLOQUEIE IMEDIATAMENTE A VISUALIZAÇÃO DO CONTEÚDO
document.documentElement.classList.add('preload');

// 3. VERIFICAÇÃO DA SESSÃO E CARREGAMENTO
if (!sessionStorage.getItem('loadingAnimationShown')) {
    // Cria a tela de loading imediatamente (não espera pelo DOMContentLoaded)
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <i class="fas fa-users"></i>
                <span>Gestão de Clientes</span>
            </div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.prepend(loadingScreen);
    
    // Inicia a animação imediatamente
    let progress = 0;
    const duration = 1500;
    const start = Date.now();
    
    function animate() {
        progress = Math.min((Date.now() - start) / duration * 100, 100);
        document.querySelector('.loading-progress').style.width = `${progress}%`;
        
        if (progress < 100) {
            requestAnimationFrame(animate);
        } else {
            document.documentElement.classList.remove('preload');
            document.body.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.remove();
                sessionStorage.setItem('loadingAnimationShown', 'true');
            }, 500);
        }
    }
    
    // Garante que o Font Awesome está carregado
    if (document.querySelector('.fa-users')) {
        animate();
    } else {
        const checkFontAwesome = setInterval(() => {
            if (document.querySelector('.fa-users')) {
                clearInterval(checkFontAwesome);
                animate();
            }
        }, 50);
    }
} else {
    // Se já mostrou a animação, apenas remove o preload
    document.documentElement.classList.remove('preload');
}

// 4. FALLBACK - Caso o JavaScript falhe
setTimeout(() => {
    document.documentElement.classList.remove('preload');
}, 3000); // Máximo de 3 segundos de espera
