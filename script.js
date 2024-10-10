// Exemplo simples de quiz 
const perguntas = [
    { pergunta: "Quantos anos leva para o plástico se decompor?", respostas: ["10 anos", "100 anos", "500 anos"], correta: 2 },
    { pergunta: "Em qual década surgiram os primeiros estudos sobre poluição plástica?", respostas: ["1990s", "2000s", "2012s"], correta: 0 },
    { pergunta: "Qual das seguintes opções é uma maneira eficaz de reduzir o uso de plástico?", respostas: ["Utilizar sacolas de plástico descartáveis", "Optar por sacolas reutilizáveis", "Comprar produtos embalados em plástico"], correta: 1 },
    { pergunta: "Qual destes materiais é considerado uma alternativa sustentável ao plástico?", respostas: ["Vidro", "Poliestireno", "Plástico PET"], correta: 0 },
];

let acertos = 0;
const totalPerguntas = perguntas.length;

// Função para contar e exibir visitas
function contarVisitas() {
    let visitas = localStorage.getItem('visitas');

    // Se o valor for null ou não um número, inicializa como 0
    if (visitas === null || Number.isNaN(Number(visitas))) {
        visitas = 0;
    } else {
        visitas = Number.parseInt(visitas); // Converte o valor em número usando Number.parseInt
    }

    visitas++; // Incrementa o número de visitas
    localStorage.setItem('visitas', visitas); // Armazena o valor atualizado

    // Enviar visitas para o servidor
    fetch('http://localhost:3000/api/visitas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visitas }) // Envia o número de visitas em formato JSON
    });
    return visitas; // Retorna o total de visitas
}


// Função para exibir contagem de visitas no footer
function exibirContagemVisitas() {
    const contagem = contarVisitas();
    document.getElementById('contagemVisitas').innerHTML = `Total de visitas: ${contagem}`;
}

// Chama a função para exibir a contagem ao carregar a página
window.onload = exibirContagemVisitas;

// Função para iniciar o quiz
document.getElementById('iniciarQuiz').onclick = () => {
    document.getElementById('quiz').style.display = 'block'; // Mostra o quiz
    document.getElementById('iniciarQuiz').style.display = 'none'; // Esconde o botão de iniciar

    perguntas.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${item.pergunta}</p>`;
        item.respostas.forEach((resposta, i) => {
            const button = document.createElement('button');
            button.textContent = resposta;
            button.onclick = () => {
                // Incrementa acertos apenas se a resposta estiver correta
                if (i === item.correta) {
                    acertos++;
                    div.innerHTML += `<p style="color: green;">Você acertou!</p>`;
                } else {
                    div.innerHTML += `<p style="color: red;">Resposta errada.</p>`;
                }
                // Desabilita os botões após uma resposta
                item.respostas.forEach((_, j) => {
                    div.children[j + 1].disabled = true; // Desabilita os botões de resposta
                });

                // Se for a última pergunta, ocultar o quiz e mostrar a mensagem
                if (index === totalPerguntas - 1) {
                    document.getElementById('quiz').style.display = 'none';
                    document.getElementById('mostrarResultados').style.display = 'block'; // Mostra o botão de resultados
                }
            };
            div.appendChild(button);
        });
        document.getElementById('quiz').appendChild(div);
    });
};

// Botão para calcular a nota e armazenar resultados
document.getElementById('mostrarResultados').onclick = () => {
    let nota;
    if (acertos === 0) {
        nota = 0;
    } else if (acertos === 1) {
        nota = 2.5;
    } else if (acertos === 2) {
        nota = 5;
    } else if (acertos === 3) {
        nota = 7.5;
    } else if (acertos === 4) {
        nota = 10;
    }
    
    // Exibir a contagem de visitas
    alert(`Você acertou ${acertos} de ${totalPerguntas} perguntas. Sua nota é: ${nota}`);

    // Armazenar resultado no localStorage
    const resultados = JSON.parse(localStorage.getItem('resultadosQuiz')) || [];
    resultados.push({ acertos, nota, data: new Date() });
    localStorage.setItem('resultadosQuiz', JSON.stringify(resultados));

    // Exibir resultados no gráfico
    exibirResultados(resultados);
};

// Função para exibir resultados como gráfico
function exibirResultados(resultados) {
    const ctx = document.getElementById('graficoResultados').getContext('2d');

    const acertosData = resultados.map(result => result.acertos);
    const labels = resultados.map((_, index) => `Quiz ${index + 1}`);

    // Criar gráfico
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Acertos',
                data: acertosData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Acertos'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tentativas'
                    }
                }
            }
        }
    });

    // Mostra o gráfico
    document.getElementById('resultadosContainer').style.display = 'block';
}

// Código para o gráfico do plástico
const ctxGrafico = document.getElementById('graficoPlastico').getContext('2d');
const grafico = new Chart(ctxGrafico, {
    type: 'bar',
    data: {
        labels: ['Plástico em Oceanos', 'Plástico Reciclado'],
        datasets: [{
            label: 'Toneladas',
            data: [8000000, 2000000],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Ação do carrossel
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`; // Move o slide
    });
    slideIndex = (slideIndex + 1) % slides.length; // Avança para o próximo slide
}

// Inicia o carrossel
setInterval(showSlides, 5000); // Muda o slide a cada 5 segundos
showSlides(); // Chama a função uma vez para mostrar o primeiro slide
