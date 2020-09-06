import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [teachers, setTeachers] = useState([]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.get('classes', {
        params: data,
      });
      setTeachers(response.data);
    } catch (error) {
      alert('erro');
      console.error(error);
    }
  });
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={onSubmit}>
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

          <div className="select-block">
            <label htmlFor="week_day">Dia da semana</label>

            <select
              name="week_day"
              id="week_day"
              ref={register({ required: true })}
              style={{
                borderBottomColor: errors.week_day && 'red',
              }}
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
            <label htmlFor="time">Hora</label>
            <input
              name="time"
              type="time"
              id="time"
              ref={register({ required: true })}
              style={{
                borderBottomColor: errors.time && 'red',
              }}
            />
          </div>

          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
