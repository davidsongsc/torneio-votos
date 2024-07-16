import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { DadosContest, postContest } from '../actions/userActions';
import { RootState } from '../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import contestReducer, { carregarContests } from '../reducers/contestReducer';
import { useNavigate } from 'react-router-dom';


interface ContestFormProps {
    onSubmit: (data: DadosContest) => void;
}


const ContestForm: React.FC<ContestFormProps> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.contestReducer);

    const userInfo = useSelector((state: RootState) => state.user.userInfo);


    const [formData, setFormData] = useState<DadosContest>({
        id: data.contest.length + 1,
        nomeContest: '',
        texto: [],
        desempenho: 0,
        meta: 0,
        conquista: 0,
        data_inicio: '',
        data_fim: '',
        premiacao: [],
        autor: '',
        datahora: '',
        status: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        // Se o campo for 'id', verifique se o valor é um número antes de atualizar o estado
        if (name === 'idContest' && isNaN(Number(value))) {
            // Se o valor não for um número, não atualize o estado
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleListaChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        isPremiacao: boolean
    ) => {
        const { name, value } = event.target;

        setFormData((prevData) => {
            const newData = { ...prevData };
            const lista = isPremiacao ? newData.premiacao : newData.texto;

            // Inicializa a lista se ainda não existir
            if (!lista[index]) {
                lista[index] = [{ titulo: '', texto: '' }];
            }

            // Cria uma cópia do item específico na lista
            const updatedItem = { ...lista[index][0], [name]: value };

            // Atualiza o item na lista
            lista[index] = [updatedItem];

            return newData;
        });
    };
    const handleListaTituloChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        isPremiacao: boolean
    ) => {
        const { value } = event.target;

        setFormData((prevData) => {
            const newData = { ...prevData };
            const lista = isPremiacao ? newData.premiacao : newData.texto;

            // Inicializa a lista se ainda não existir
            if (!lista[index]) {
                lista[index] = [{ titulo: '', texto: '' }];
            }

            // Cria uma cópia do item específico na lista
            const updatedItem = { ...lista[index][0], titulo: value };

            // Atualiza o item na lista
            lista[index] = [updatedItem];

            return newData;
        });
    };

    const handleListaTextoChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        index: number,
        isPremiacao: boolean
    ) => {
        const { value } = event.target;

        setFormData((prevData) => {
            const newData = { ...prevData };
            const lista = isPremiacao ? newData.premiacao : newData.texto;

            // Inicializa a lista se ainda não existir
            if (!lista[index]) {
                lista[index] = [{ titulo: '', texto: '' }];
            }

            // Cria uma cópia do item específico na lista
            const updatedItem = { ...lista[index][0], texto: value };

            // Atualiza o item na lista
            lista[index] = [updatedItem];

            return newData;
        });
    };
    const handleSave = async () => {
        try {
            // Validar os dados, se necessário
            dispatch(carregarContests());
            console.log(data);
            formData.autor = userInfo?.nome as any;
            formData.datahora = new Date().toISOString();
            formData.status = 1;
            formData.meta = 30;
            formData.conquista = 0;
            formData.desempenho = 0;
            formData.data_fim = new Date().toISOString();
            formData.data_inicio = new Date().toISOString();
            onSubmit(formData);
            console.log(formData);

            // Aguarde a conclusão de onSubmit antes de chamar postContest
            await dispatch(postContest(formData));

            // Qualquer lógica adicional após a conclusão bem-sucedida de postContest
            console.log('postContest concluído com sucesso');
            dispatch(carregarContests())
            navigate('/contest');
            
        } catch (error) {
            // Lógica para lidar com erros, se necessário
            console.error('Erro ao salvar o contest:', error);
        }
    };
    useEffect(() => {
        if (!userInfo){
         navigate('/ranking');
        }
     }, [userInfo, navigate]);

    return (
        <div className='contestForm'>
            <input type="text" name="idContest" placeholder='ID' value={formData.id} onChange={handleChange} />
            <input type="text" name="nomeContest" placeholder='Titulo' value={formData.nomeContest} onChange={handleChange} />
            <input type="text" name="data_inicio" placeholder='Inicio Data' value={formData.data_inicio} onChange={handleChange} />
            <input type="text" name="data_fim" placeholder='Fim Data' value={formData.data_fim} onChange={handleChange} />

            {/* Lista de Texto */}

            {formData.texto.map((item, index) => (
                <div className='listaContestform'>
                    <div key={index}>
                        <input
                            type="text"
                            name={`titulo_texto_${index}`}
                            placeholder="Título"
                            value={item[0].titulo}  // Ajuste aqui
                            onChange={(e) => handleListaTituloChange(e, index, false)}
                        />

                    </div>
                    <div>
                        <textarea
                            name={`texto_texto_${index}`}
                            placeholder="Texto"
                            value={item[0].texto}  // Ajuste aqui
                            onChange={(e) => handleListaTextoChange(e, index, false)}
                        />
                    </div>
                </div>
            ))}
            <button onClick={() => setFormData((prevData) => ({ ...prevData, texto: [...prevData.texto, [{ titulo: '', texto: '' }]] }))}>
                Novo Conteudo
            </button>

            {/* Lista de Premiação */}

            {formData.premiacao.map((item, index) => (
                <div className='listaContestform'>
                    <div key={index}>
                        <input
                            type="text"
                            name={`titulo_premiacao_${index}`}
                            placeholder="Título"
                            value={item[0].titulo}  // Ajuste aqui
                            onChange={(e) => handleListaTituloChange(e, index, true)}
                        />

                    </div>
                    <div>
                        <textarea
                            name={`texto_premiacao_${index}`}
                            placeholder="Texto"
                            value={item[0].texto}  // Ajuste aqui
                            onChange={(e) => handleListaTextoChange(e, index, true)}
                        />
                    </div>
                </div>
            ))}
            <button onClick={() => setFormData((prevData) => ({ ...prevData, premiacao: [...prevData.premiacao, [{ titulo: '', texto: '' }]] }))}>
                Novo Beneficio
            </button>

            <button onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} /> Salvar
            </button>
        </div>
    );
};

export default ContestForm;
