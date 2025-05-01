// Inicializa os eventos depois que o conteúdo foi carregado
function inicializarCotacao() {
  const botaoAdicionar = document.getElementById("adicionar-ponto");
  const botaoCalcular = document.getElementById("enviar-trajeto");

  if (botaoAdicionar) {
      botaoAdicionar.addEventListener("click", criarNovoPonto);
  }

  if (botaoCalcular) {
      botaoCalcular.addEventListener("click", enviarParaWhatsapp);
  }
}

// FUNÇÃO PARA ADICIONAR NOVOS PONTOS DE ENTREGA 
let contador = 1;
function criarNovoPonto() {
  const pontosExtras = document.getElementById('pontos-extras');

  if (pontosExtras) {
    
    const letra = String.fromCharCode(66 + contador); // C, D, E...
    const div = document.createElement('div');
    div.classList.add('ponto-extra');
    div.innerHTML = `
      <h3>Entrega - Ponto ${letra}</h3>
      <label>Endereço:</label>
      <input class="input-pontoExtra-endereco" type="text" name="endereco-extra-${contador}" placeholder="Rua, número, bairro">
      <label>Complemento:</label>
      <input class="input-pontoExtra-complemento" type="text" name="complemento-extra-${contador}" placeholder="Bloco/Apartamento">
      <label>Observações:</label>
      <textarea class="input-pontoExtra-observacao" type="text" name="obs-extra-${contador}" placeholder="Quem recebe, horário etc."></textarea>
      <button type="button" class="remover-ponto">Remover este ponto</button>
    `;

    pontosExtras.appendChild(div);
    contador++;

    div.querySelector('.remover-ponto').addEventListener('click', () => {
      pontosExtras.removeChild(div);
    });
  };
}


// Coleta os dados e envia como mensagem no WhatsApp
function enviarParaWhatsapp(event) {
  event.preventDefault(); // Evita comportamento padrão

  // Função auxiliar para pegar valor de campo
  const getValue = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.value.trim() : "";
  };

  const enderecoA = getValue("#endereco-a");
  const complementoA = getValue("#complemento-a");
  const obsA = getValue("#observacao-a");

  const enderecoB = getValue("#endereco-b");
  const complementoB = getValue("#complemento-b");
  const obsB = getValue("#observacao-b");

  // Coleta pontos extras
  const pontosExtras = Array.from(document.querySelectorAll(".ponto-extra")).map((el, i) => {
    const endereco = el.querySelector(".input-pontoExtra-endereco")?.value.trim() || "";
    const complemento = el.querySelector(".input-pontoExtra-complemento")?.value.trim() || "";
    const observacoes = el.querySelector(".input-pontoExtra-observacao")?.value.trim() || "";

    return `➡️ Ponto extra ${i + 1}:
    Endereço: ${endereco}
    Complemento: ${complemento}
    Observações: ${observacoes}`.trim();
  });

  // Monta mensagem
  let mensagem = `🚀 *Solicitação de entrega - Jet Log*

  🔵 *Ponto A*:
  Endereço: ${enderecoA}
  Complemento: ${complementoA}
  Observações: ${obsA}

  🔵 *Ponto B*:
  Endereço: ${enderecoB}
  Complemento: ${complementoB}
  Observações: ${obsB}

  ${pontosExtras.length > 0 ? pontosExtras.join("\n\n") : ""}
  `;

  const numero = "5511999999999";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}