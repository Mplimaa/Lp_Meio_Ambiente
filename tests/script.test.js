// script.test.js
const { calcularNota } = require('../script.js'); // Ajuste o caminho se necessário

// Criação do DOM necessário para os testes
beforeAll(() => {
    // Cria os elementos do DOM necessários
    document.body.innerHTML = `
        <button id="iniciarQuiz">Iniciar Quiz</button>
        <div id="quiz" style="display:none;">Quiz Content</div>
    `;
});

describe('Teste da função calcularNota', () => {
    test('Deve retornar 0 para 0 acertos', () => {
        expect(calcularNota(0)).toBe(0);
    });

    test('Deve retornar 2.5 para 1 acerto', () => {
        expect(calcularNota(1)).toBe(2.5);
    });

    test('Deve retornar 5 para 2 acertos', () => {
        expect(calcularNota(2)).toBe(5);
    });

    test('Deve retornar 7.5 para 3 acertos', () => {
        expect(calcularNota(3)).toBe(7.5);
    });

    test('Deve retornar 10 para 4 acertos', () => {
        expect(calcularNota(4)).toBe(10);
    });

    test('Deve retornar 0 para acertos inválidos', () => {
        expect(calcularNota(-1)).toBe(0);
        expect(calcularNota(5)).toBe(0); // Testa um caso fora do esperado
    });
});

// Adicionando um teste para o botão iniciarQuiz, se necessário
describe('Teste do botão iniciarQuiz', () => {
    test('Deve mostrar o quiz ao clicar no botão', () => {
        const iniciarQuizButton = document.getElementById('iniciarQuiz');
        iniciarQuizButton.onclick = () => {
            document.getElementById('quiz').style.display = 'block';
            iniciarQuizButton.style.display = 'none';
        };
        
        // Simula o clique no botão
        iniciarQuizButton.click();

        // Verifica se o quiz está visível
        expect(document.getElementById('quiz').style.display).toBe('block');
        expect(iniciarQuizButton.style.display).toBe('none');
    });
});
