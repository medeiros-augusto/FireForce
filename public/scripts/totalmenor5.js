    // Função para calcular a pontuação total
        function calcularPontuacao() {
            const inputs = document.querySelectorAll('input:checked');
            let pontuacaoTotal = 0;

            inputs.forEach(input => {
                const valor = parseInt(input.parentElement.nextElementSibling.value);
                pontuacaoTotal += valor;
            });

            document.querySelector('#pontuacaoTotal').value = pontuacaoTotal;
        }
        const inputs = document.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.addEventListener('change', calcularPontuacao);
        });
