gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// BANCO DE DADOS LOCAL DO CARDÁPIO (Aparece ao Clicar)
const cardapioData = {
    "rodizio": {
        title: "RODÍZIO PREMIUM",
        items: [
            { name: "Rodízio Kinpai Tradicional", desc: "Variedade completa de sushis, sashimis fresquinhos, temakis, quentes e grelhados.", price: "Sob Consulta" },
            { name: "Festival do Chef", desc: "Pratos especiais inclusos, sushis maçaricados e iguarias exclusivas da Nea.", price: "Especial" }
        ]
    },
    "dose-dupla": {
        title: "DOSE DUPLA",
        items: [
            { name: "Drinks Clássicos", desc: "Peça um drink selecionado e ganhe o segundo por conta da casa.", price: "2 por 1" },
            { name: "Chopp Artesanal", desc: "Gelado e na medida perfeita para harmonizar com seus combinados.", price: "Dose Dupla" }
        ]
    },
    "a-la-carte": {
        title: "À LA CARTE",
        items: [
            { name: "Combinado Kinpai 20 Anos (40pçs)", desc: "A seleção comemorativa definitiva com os sushis e sashimis mais pedidos da história.", price: "R$ 189,00" },
            { name: "Joe Especial Trufado (5pçs)", desc: "Salmão fresco picado com azeite de trufa branca e ovas massago.", price: "R$ 42,00" },
            { name: "Sashimi de Salmão Maçaricado (10pçs)", desc: "Lâminas premium levemente seladas com molho teriyaki especial da casa.", price: "R$ 56,00" }
        ]
    },
    "executivo": {
        title: "ALMOÇO EXECUTIVO",
        items: [
            { name: "Menu Executivo Tokyo", desc: "Entrada quente + Combinado do dia com 15 peças selecionadas.", price: "R$ 69,90" },
            { name: "Menu Executivo Kyoto", desc: "A escolha perfeita para o dia a dia com grelhados e guarnições japonesas.", price: "R$ 64,90" }
        ]
    },
    "bebidas": {
        title: "BEBIDAS E SAKÊS",
        items: [
            { name: "Sakê Importado Premium (Garrafa)", desc: "Filtrado tradicional japonês com notas frutadas marcantes.", price: "R$ 140,00" },
            { name: "Sucos Naturais e Refrigerantes", desc: "Opções refrescantes feitas na hora.", price: "A partir de R$ 9,00" }
        ]
    }
};

// Funções de Abrir/Fechar o Cardápio (Modais)
function openMenu(categoria) {
    const data = cardapioData[categoria];
    if (!data) return;

    document.getElementById("modal-title").innerText = data.title;
    let htmlContent = "";

    data.items.forEach(item => {
        htmlContent += `
            <div class="menu-item-row">
                <div class="menu-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <div class="menu-item-price">${item.price}</div>
            </div>
        `;
    });

    document.getElementById("modal-body").innerHTML = htmlContent;
    document.getElementById("menu-modal").classList.add("active");
}

function closeMenu() {
    document.getElementById("menu-modal").classList.remove("active");
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("menu-modal");
    if (event.target == modal) {
        modal.classList.remove("active");
    }
}

// Deslizamento de Menu Inteligente (ScrollTo)
function scrollToSection(id) {
    gsap.to(window, {
        duration: 1.3,
        scrollTo: { y: id, offsetY: 80 },
        ease: "power4.inOut"
    });
}

// Ordem Cronológica de Entrada (Preloader)
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to(".bar-progress", { width: "100%", duration: 1.6, ease: "power2.inOut" })
      .to(".preloader", { y: "-100%", duration: 1, ease: "expo.inOut" })
      .from(".animate-title", { opacity: 0, y: 50, duration: 1.2, ease: "power4.out" }, "-=0.3")
      .from(".animate-text", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.8");
});

// Navbar muda estilo ao descer
ScrollTrigger.create({
    start: "top -60",
    onEnter: () => document.querySelector(".navbar").classList.add("scrolled"),
    onLeaveBack: () => document.querySelector(".navbar").classList.remove("scrolled")
});

// Efeito Parallax Cinematográfico no Topo
gsap.to(".parallax-bg", {
    yPercent: 25,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Revelação dos Cards de Cardápio e Fotos
const fadeElements = document.querySelectorAll(".gallery-item, .menu-card, .delivery-image-wrap");
fadeElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%"
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out"
    });
});