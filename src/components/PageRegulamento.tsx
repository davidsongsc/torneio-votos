import React from 'react';

const PageRegulamento: React.FC = () => {
    return (
        <div className="regras-container" style={{  width: '100%' }}>
        <h2>Usuario Autenticado</h2>
        <br />
        <div>
            <h3>
                Torneio de Votos: Regras e Objetivos
            </h3>
            <h4>
                Objetivos:
            </h4>
            <ul>
                <li> - Fomentar a interação e colaboração entre os colaboradores.</li>
                <li> - Reconhecer e premiar aqueles que se destacam em nosso ambiente de trabalho.</li>
                <li> - Incentivar a criatividade e a participação ativa.</li>
            </ul>
            <h4>
                Regras:
            </h4>
            <ol>
                <li>  Votos Bônus: No final de cada torneio, todos os colaboradores recebem 1 voto. Caso a meta do torneio seja positiva, todos recebem 1 voto bônus.</li>
                <li>  Desafio Cumprido: Se a meta do torneio for atingida na íntegra, todos recebem +1 voto.</li>
                <li>  Votação Justa: Uma pessoa não pode votar em si própria ou na mesma pessoa.</li>
                <li>  Interação: Os votantes devem interagir entre si para conquistar os votos de seus colegas.</li>
                <li>  Prêmio Mensal: A pessoa que receber mais votos no torneio do mês receberá o prêmio.</li>
                <li>  Empate: Em caso de empate, um sorteio será realizado entre os empatantes para determinar o vencedor.</li>
            </ol>
            <h4>
                Duração:
            </h4>

            <p>- Cada torneio terá uma duração específica, e os prazos de submissão, votação e anúncio dos resultados serão comunicados para cada torneio individualmente.</p>
            <h4>
                Tema:
            </h4>
            <p>Cada torneio pode ter um tema ou tópico específico. Fique atento às instruções para cada torneio.</p>
            <h4>
                Critérios de Avaliação:
            </h4>
            <p>Os critérios de avaliação podem variar de acordo com o tema do torneio e serão comunicados com antecedência.</p>
            <h4>
                Participação Ativa:
            </h4>
            <p>Incentivamos a participação ativa, que inclui não apenas buscar votos, mas também contribuir de maneira significativa, apresentar ideias e oferecer feedback construtivo.</p>
            <h4>
                Prêmios e Reconhecimento:
            </h4>
            <p>Além do prêmio para o vencedor, prêmios menores podem ser oferecidos para categorias como "Melhor Colaborador" ou "Melhor Espírito Esportivo."</p>
            <h4>
                Dúvidas e Feedback:
            </h4>
            <p>- Qualquer dúvida sobre as regras ou o torneio em geral pode ser esclarecida por meio de um canal de comunicação dedicado. Se você tiver sugestões ou feedback, não hesite em compartilhá-los.</p>

            <br /><br />

            
        </div>

    </div>
    );
};

export default PageRegulamento;
