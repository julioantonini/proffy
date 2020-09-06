import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string,
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.schedule = scheduleItems;

    try {
      await api.post('classes', data);
      alert('cadastro realizado com sucesso');
      history.push('/');
    } catch (error) {
      alert('erro');
      console.error(error);
    }
  });

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <form onSubmit={onSubmit}>
        <main>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="input-block">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                name="name"
                id="name"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.name && 'red',
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="text"
                name="avatar"
                id="avatar"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.avatar && 'red',
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.whatsapp && 'red',
                }}
              />
            </div>

            <div className="textarea-block">
              <label htmlFor="bio">Biografia</label>
              <textarea
                name="bio"
                id="bio"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.bio && 'red',
                }}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="select-block">
              <label htmlFor="subject">Matéria</label>
              <select
                name="subject"
                id="subject"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.subject && 'red',
                }}
              >
                <option value="">Selecione</option>
                <option value="Biologia">Biologia</option>
                <option value="Física">Física</option>
                <option value="Geografia">Geografia</option>
                <option value="História">História</option>
                <option value="Inglês">Inglês</option>
                <option value="Matemática">Matemática</option>
                <option value="Português">Português</option>
                <option value="Química">Química</option>
              </select>
            </div>

            <div className="input-block">
              <label htmlFor="cost">Custo da sua hora por aula</label>
              <input
                name="cost"
                type="text"
                id="cost"
                ref={register({ required: true })}
                style={{
                  borderBottomColor: errors.cost && 'red',
                }}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={index} className="schedule-item">
                <div className="select-block">
                  <label htmlFor="week_day">Dia da semana</label>
                  <select
                    name="week_day"
                    id="week_day"
                    onChange={(e) =>
                      setScheduleItemValue(index, e.target.name, e.target.value)
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="0">Domingo</option>
                    <option value="1">Segunda-feira</option>
                    <option value="2">Terça-feira</option>
                    <option value="3">Quarta-feira</option>
                    <option value="4">Quinta-feira</option>
                    <option value="5">Sexta-feira</option>
                    <option value="6">Sábado</option>
                  </select>
                </div>

                <div className="input-block">
                  <label htmlFor="from">Das</label>
                  <input
                    type="time"
                    name="from"
                    id="from"
                    onChange={(e) =>
                      setScheduleItemValue(index, e.target.name, e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label htmlFor="to">Até</label>
                  <input
                    type="time"
                    name="to"
                    id="to"
                    onChange={(e) =>
                      setScheduleItemValue(index, e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar</button>
          </footer>
        </main>
      </form>
    </div>
  );
};

export default TeacherForm;
