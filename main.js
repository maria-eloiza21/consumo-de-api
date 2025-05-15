let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    function salvarTarefas() {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
    function renderizarLista(lista) {
      const ul = document.getElementById("listaTarefas");
      ul.innerHTML = ""; 

      if (lista.length === 0) {
        ul.innerHTML = "<li style='color: gray;'>Nenhuma tarefa encontrada</li>";
        return;
      }

      lista.forEach((tarefa, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <input type="checkbox" ${tarefa.concluida ? "checked" : ""} onchange="marcarConcluida(${index})">
          <span style="${tarefa.concluida ? 'text-decoration: line-through; color: gray;' : ''}">
            ${tarefa.descricao}
          </span>
          <button class="btn-delete" onclick="deletarTarefa(${index})">Excluir</button>
        `;

        ul.appendChild(li);
      });
    }
    function adicionarTarefa() {
      const input = document.getElementById("novaTarefa");
      const texto = input.value.trim();

      if (texto === "") {
        alert("Por favor, digite uma tarefa!");
        return;
      }

      tarefas.push({ descricao: texto, concluida: false });
      input.value = "";
      salvarTarefas();
      renderizarLista(tarefas);
    }
    function marcarConcluida(index) {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      renderizarLista(tarefas);
    }
    function deletarTarefa(index) {
      if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarLista(tarefas);
      }
    }
    function filtrarTarefas(filtro) {
      let filtradas = [];

      if (filtro === "todas") {
        filtradas = tarefas;
      } else if (filtro === "pendentes") {
        filtradas = tarefas.filter(t => !t.concluida);
      } else if (filtro === "concluidas") {
        filtradas = tarefas.filter(t => t.concluida);
      }

      renderizarLista(filtradas);
    }
    document.addEventListener("DOMContentLoaded", () => {
      renderizarLista(tarefas);
    });