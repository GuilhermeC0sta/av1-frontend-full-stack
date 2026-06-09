const form = document.getElementById("form-lancamento");
const lista = document.getElementById("lista-lancamentos");
const listaVazia = document.getElementById("lista-vazia");
const alertaErro = document.getElementById("alerta-erro");

const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoCategoria = document.getElementById("categoria");
const campoTipo = document.getElementById("tipo");

const elTotalReceitas = document.getElementById("total-receitas");
const elTotalDespesas = document.getElementById("total-despesas");
const elSaldoTotal = document.getElementById("saldo-total");

let lancamentos = [];
let proximoId = 1;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function esconderAlerta() {
  alertaErro.classList.add("d-none");
}

function mostrarAlerta() {
  alertaErro.classList.remove("d-none");
}

function validarCampos() {
  const descricao = campoDescricao.value.trim();
  const valor = parseFloat(campoValor.value);
  const categoria = campoCategoria.value;
  const tipo = campoTipo.value;

  if (!descricao || isNaN(valor) || valor <= 0 || !categoria || !tipo) {
    return false;
  }

  return true;
}

function limparFormulario() {
  form.reset();
  esconderAlerta();
}

function atualizarResumo() {
  let totalReceitas = 0;
  let totalDespesas = 0;

  lancamentos.forEach(function (item) {
    if (item.tipo === "receita") {
      totalReceitas += item.valor;
    } else {
      totalDespesas += item.valor;
    }
  });

  const saldo = totalReceitas - totalDespesas;

  elTotalReceitas.textContent = formatarMoeda(totalReceitas);
  elTotalDespesas.textContent = formatarMoeda(totalDespesas);
  elSaldoTotal.textContent = formatarMoeda(saldo);

  if (saldo < 0) {
    elSaldoTotal.style.color = "var(--cor-despesa)";
  } else {
    elSaldoTotal.style.color = "var(--cor-primaria)";
  }
}

function criarItemLista(lancamento) {
  const li = document.createElement("li");
  li.className = "lancamento-item";
  li.dataset.id = lancamento.id;

  const prefixo = lancamento.tipo === "receita" ? "+" : "-";
  const tipoLabel = lancamento.tipo === "receita" ? "Receita" : "Despesa";

  li.innerHTML =
    '<div class="lancamento-info">' +
      '<span class="lancamento-descricao">' + lancamento.descricao + '</span>' +
      '<div class="lancamento-meta">' +
        '<span class="lancamento-categoria">' + lancamento.categoria + '</span>' +
        '<span class="lancamento-tipo ' + lancamento.tipo + '">' + tipoLabel + '</span>' +
      '</div>' +
    '</div>' +
    '<span class="lancamento-valor ' + lancamento.tipo + '">' +
      prefixo + ' ' + formatarMoeda(lancamento.valor) +
    '</span>' +
    '<button type="button" class="btn btn-outline-danger btn-sm btn-remover" aria-label="Remover lançamento">' +
      'Remover' +
    '</button>';

  const btnRemover = li.querySelector(".btn-remover");
  btnRemover.addEventListener("click", function () {
    removerLancamento(lancamento.id);
  });

  return li;
}

function renderizarLista() {
  const itensExistentes = lista.querySelectorAll(".lancamento-item");
  itensExistentes.forEach(function (item) {
    item.remove();
  });

  if (lancamentos.length === 0) {
    listaVazia.classList.remove("d-none");
    return;
  }

  listaVazia.classList.add("d-none");

  lancamentos.forEach(function (lancamento) {
    lista.appendChild(criarItemLista(lancamento));
  });
}

function adicionarLancamento(dados) {
  const novoLancamento = {
    id: proximoId++,
    descricao: dados.descricao,
    valor: dados.valor,
    categoria: dados.categoria,
    tipo: dados.tipo
  };

  lancamentos.unshift(novoLancamento);
  renderizarLista();
  atualizarResumo();
}

function removerLancamento(id) {
  lancamentos = lancamentos.filter(function (item) {
    return item.id !== id;
  });

  renderizarLista();
  atualizarResumo();
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  esconderAlerta();

  if (!validarCampos()) {
    mostrarAlerta();
    return;
  }

  adicionarLancamento({
    descricao: campoDescricao.value.trim(),
    valor: parseFloat(campoValor.value),
    categoria: campoCategoria.value,
    tipo: campoTipo.value
  });

  limparFormulario();
});

[campoDescricao, campoValor, campoCategoria, campoTipo].forEach(function (campo) {
  campo.addEventListener("input", esconderAlerta);
});
