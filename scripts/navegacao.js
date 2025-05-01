document.addEventListener("DOMContentLoaded", () => {
  const destinoCotacao = document.getElementById("lista-de-entregas");

  if (destinoCotacao) {
    fetch("./cotacao.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar cotacao.html");
        return response.text();
      })
      .then(html => {
        destinoCotacao.innerHTML = html;
        inicializarCotacao(); // Ativa os scripts do formulário após carregar
        inicializarMenuMobile();
      })
      .catch(error => {
        console.error("Falha ao carregar cotação:", error);
        destinoCotacao.innerHTML = "<p>Não foi possível carregar o formulário de cotação.</p>";
    });
  } else {
    inicializarMenuMobile(); // ✅ Garante que funcione mesmo sem a cotação
  }
});

// -------------------------------------------
// MENU MOBILE: abrir, fechar e animar ícone
// -------------------------------------------
function inicializarMenuMobile() {
  const botaoMenu = document.getElementById("abrir-menu");
  const menu = document.querySelector(".menu");

  if (!botaoMenu || !menu) return;

  // Abre ou fecha o menu ao clicar no ícone
  botaoMenu.addEventListener("click", () => {
    botaoMenu.classList.toggle("ativo");
    menu.classList.toggle("ativo");
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      botaoMenu.classList.remove("ativo");
      menu.classList.remove("ativo");
    });
  });

  // Fecha ao clicar fora do menu
  document.addEventListener("click", (e) => {
    const clicouFora = !botaoMenu.contains(e.target) && !menu.contains(e.target);
    if (clicouFora) {
      botaoMenu.classList.remove("ativo");
      menu.classList.remove("ativo");
    }
  });
}