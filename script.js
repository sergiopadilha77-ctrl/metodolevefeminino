// =========================================
// MÉTODO LEVE FEMININO - LANDING PAGE
// JavaScript para Interatividade
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. SMOOTH SCROLL PARA LINKS INTERNOS
    // =========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Se for apenas #, não faz nada
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================================
    // 2. FAQ ACCORDION
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha outros itens (opcional - remova se quiser múltiplos abertos)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item clicado
            item.classList.toggle('active');
        });
    });
    
    // =========================================
    // 3. ANIMAÇÕES AO SCROLL (INTERSECTION OBSERVER)
    // =========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos a serem animados
    const animatedElements = document.querySelectorAll(
        '.dor-card, .metodo-item, .conteudo-card, .beneficio-card, .garantia-item, .bonus-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // =========================================
    // 4. TRACKING DE CLIQUES NOS CTAs
    // =========================================
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            // Se tiver href="#checkout" ou similar, você pode integrar com sua plataforma de pagamento
            console.log(`CTA clicado: Botão ${index + 1}`);
            
            // Aqui você pode adicionar tracking do Google Analytics, Facebook Pixel, etc.
            // Exemplo: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Botão ' + (index + 1) });
            
            // Adiciona efeito visual
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // =========================================
    // 5. CONTADOR REGRESSIVO (OPCIONAL)
    // =========================================
    function iniciarContador() {
        // Define tempo de 24 horas para criar urgência
        const tempoTotal = 24 * 60 * 60; // 24 horas em segundos
        let tempoRestante = tempoTotal;
        
        // Verifica se já existe tempo salvo no localStorage
        const tempoSalvo = localStorage.getItem('tempoContador');
        const dataInicio = localStorage.getItem('dataInicioContador');
        const agora = new Date().getTime();
        
        if (tempoSalvo && dataInicio) {
            const tempoDecorrido = Math.floor((agora - parseInt(dataInicio)) / 1000);
            tempoRestante = parseInt(tempoSalvo) - tempoDecorrido;
            
            if (tempoRestante <= 0) {
                tempoRestante = tempoTotal;
                localStorage.setItem('dataInicioContador', agora.toString());
                localStorage.setItem('tempoContador', tempoTotal.toString());
            }
        } else {
            localStorage.setItem('dataInicioContador', agora.toString());
            localStorage.setItem('tempoContador', tempoTotal.toString());
        }
        
        // Atualiza a cada segundo
        const intervalo = setInterval(() => {
            tempoRestante--;
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                tempoRestante = tempoTotal;
                localStorage.setItem('dataInicioContador', new Date().getTime().toString());
                localStorage.setItem('tempoContador', tempoTotal.toString());
            }
            
            const horas = Math.floor(tempoRestante / 3600);
            const minutos = Math.floor((tempoRestante % 3600) / 60);
            const segundos = tempoRestante % 60;
            
            // Se você quiser exibir um contador, adicione este HTML na seção de oferta:
            // <div id="contador" class="contador">
            //     <span id="horas">00</span>:<span id="minutos">00</span>:<span id="segundos">00</span>
            // </div>
            
            const elementoHoras = document.getElementById('horas');
            const elementoMinutos = document.getElementById('minutos');
            const elementoSegundos = document.getElementById('segundos');
            
            if (elementoHoras && elementoMinutos && elementoSegundos) {
                elementoHoras.textContent = horas.toString().padStart(2, '0');
                elementoMinutos.textContent = minutos.toString().padStart(2, '0');
                elementoSegundos.textContent = segundos.toString().padStart(2, '0');
            }
        }, 1000);
    }
    
    // Descomente para ativar o contador
    // iniciarContador();
    
    // =========================================
    // 6. SCROLL TO TOP BUTTON (OPCIONAL)
    // =========================================
    function criarBotaoScrollTop() {
        const botao = document.createElement('button');
        botao.innerHTML = '<i class="fas fa-arrow-up"></i>';
        botao.className = 'scroll-to-top';
        botao.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #a8c5a0, #7a9973);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(botao);
        
        // Mostra/esconde o botão baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                botao.style.opacity = '1';
                botao.style.visibility = 'visible';
            } else {
                botao.style.opacity = '0';
                botao.style.visibility = 'hidden';
            }
        });
        
        // Ação de scroll para o topo
        botao.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Efeito hover
        botao.addEventListener('mouseenter', () => {
            botao.style.transform = 'scale(1.1)';
        });
        
        botao.addEventListener('mouseleave', () => {
            botao.style.transform = 'scale(1)';
        });
    }
    
    criarBotaoScrollTop();
    
    // =========================================
    // 7. LAZY LOADING DE IMAGENS (SE HOUVER)
    // =========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // =========================================
    // 8. VALIDAÇÃO DE FORMULÁRIO (SE ADICIONAR)
    // =========================================
    // Caso você adicione um formulário de captura de email
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailInput) {
                const email = emailInput.value.trim();
                
                if (validarEmail(email)) {
                    console.log('Email válido:', email);
                    // Aqui você pode integrar com seu sistema de email marketing
                    // Exemplo: enviar para sua API, Mailchimp, etc.
                    
                    alert('Obrigada! Em breve você receberá novidades.');
                    form.reset();
                } else {
                    alert('Por favor, insira um email válido.');
                }
            }
        });
    });
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // =========================================
    // 9. ANIMAÇÃO DOS NÚMEROS (CONTADOR DE BENEFÍCIOS)
    // =========================================
    function animarNumeros() {
        const numeros = document.querySelectorAll('[data-numero]');
        
        numeros.forEach(elemento => {
            const valorFinal = parseInt(elemento.dataset.numero);
            const duracao = 2000; // 2 segundos
            const incremento = valorFinal / (duracao / 16); // 60 FPS
            let valorAtual = 0;
            
            const contador = setInterval(() => {
                valorAtual += incremento;
                
                if (valorAtual >= valorFinal) {
                    elemento.textContent = valorFinal;
                    clearInterval(contador);
                } else {
                    elemento.textContent = Math.floor(valorAtual);
                }
            }, 16);
        });
    }
    
    // =========================================
    // 10. PREVENÇÃO DE SAÍDA (EXIT INTENT - OPCIONAL)
    // =========================================
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            
            // Aqui você pode mostrar um popup com uma oferta especial
            // ou lembrete antes do usuário sair
            console.log('Usuário tentou sair da página');
            
            // Exemplo de confirmação simples:
            // if (confirm('Espere! Você está recebendo 57% de desconto. Tem certeza que quer sair?')) {
            //     // Usuário confirmou que quer sair
            // }
        }
    });
    
    // =========================================
    // INICIALIZAÇÃO FINAL
    // =========================================
    console.log('✅ Landing Page Método Leve Feminino carregada com sucesso!');
    
});

// =========================================
// FUNÇÕES DE INTEGRAÇÃO COM PLATAFORMAS
// =========================================

// Integração com Google Analytics (exemplo)
function trackEvent(categoria, acao, rotulo) {
    if (typeof gtag !== 'undefined') {
        gtag('event', acao, {
            'event_category': categoria,
            'event_label': rotulo
        });
    }
}

// Integração com Facebook Pixel (exemplo)
function trackFacebookEvent(eventName, params = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, params);
    }
}

// Função para redirecionar para checkout
function irParaCheckout(produto, preco) {
    console.log(`Redirecionando para checkout: ${produto} - R$ ${preco}`);
    
    // Aqui você integraria com sua plataforma de pagamento
    // Exemplos: Hotmart, Eduzz, Kiwify, PagSeguro, Stripe, etc.
    
    // Exemplo de redirecionamento:
    // window.location.href = 'https://seu-link-de-checkout.com';
}