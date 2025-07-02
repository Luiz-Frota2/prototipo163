// loading-animation.js

function showLoadingAnimation() {
    // 1. Criar elementos da tela de carregamento
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loadingContent = document.createElement('div');
    loadingContent.className = 'loading-content';
    
    const loadingLogo = document.createElement('div');
    loadingLogo.className = 'loading-logo';
    loadingLogo.innerHTML = '<i class="fas fa-users"></i><span>Gestão de Clientes</span>';
    
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    
    const loadingProgress = document.createElement('div');
    loadingProgress.className = 'loading-progress';
    
    loadingBar.appendChild(loadingProgress);
    loadingContent.appendChild(loadingLogo);
    loadingContent.appendChild(loadingBar);
    loadingScreen.appendChild(loadingContent);
    
    document.body.prepend(loadingScreen);
    
    // 2. Estilos CSS dinâmicos para a animação
    const style = document.createElement('style');
    style.textContent = `
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
            transform: translateY(-20px);
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
        
        .loaded .loading-screen {
            opacity: 0;
            pointer-events: none;
        }
        
        .loaded .loading-content {
            transform: translateY(0);
            transition: transform 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // 3. Animação de progresso (duração total: 1.5 segundos)
    let progress = 0;
    const duration = 1500; // 1.5 segundos
    const intervalTime = 30;
    const increments = 100 / (duration / intervalTime);
    
    const progressInterval = setInterval(() => {
        progress += increments;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            document.body.classList.add('loaded');
            
            // Remover a tela de carregamento após a transição
            setTimeout(() => {
                loadingScreen.remove();
                style.remove();
                // Marcar que a animação já foi mostrada
                sessionStorage.setItem('loadingAnimationShown', 'true');
            }, 500);
        }
    }, intervalTime);
}

// Verificar se é a primeira visita na sessão
if (!sessionStorage.getItem('loadingAnimationShown')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Pequeno delay para garantir que tudo está pronto
        setTimeout(showLoadingAnimation, 100);
    });
}
