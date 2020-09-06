import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather, Entypo } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { styles, pickerSelectStyles } from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          },
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useEffect(() => {
    loadFavorites();
  }, [teachers]);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setTeachers(response.data);
      setIsFiltersVisible(false);
    } catch (error) {
      alert('erro');
      console.error(error);
    }
  }

  const subjects = [
    {
      label: 'Biologia',
      value: 'Biologia',
    },
    {
      label: 'Física',
      value: 'Física',
    },
    {
      label: 'Geografia',
      value: 'Geografia',
    },
    {
      label: 'História',
      value: 'História',
    },

    {
      label: 'Inglês',
      value: 'Inglês',
    },
    {
      label: 'Matemática',
      value: 'Matemática',
    },
    {
      label: 'Português',
      value: 'Português',
    },

    {
      label: 'Química',
      value: 'Química',
    },
  ];

  const weekDays = [
    {
      label: 'Domingo',
      value: '0',
    },
    {
      label: 'Segunda-feira',
      value: '1',
    },
    {
      label: 'Terça-feira',
      value: '2',
    },
    {
      label: 'Quarta-feira',
      value: '3',
    },
    {
      label: 'Quinta-feira',
      value: '4',
    },
    {
      label: 'Sexta-feira',
      value: '5',
    },
    {
      label: 'Sábado',
      value: '6',
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>

            <RNPickerSelect
              items={subjects}
              value={subject}
              onValueChange={(value) => {
                setSubject(value);
              }}
              placeholder={{
                label: 'Matéria',
                value: null,
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 8,
                },
              }}
              Icon={() => {
                return <Entypo name="chevron-down" size={18} color="#000" />;
              }}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>

                <RNPickerSelect
                  items={weekDays}
                  value={week_day}
                  onValueChange={(value) => {
                    setWeekDay(value);
                  }}
                  placeholder={{
                    label: 'Qual o dia?',
                    value: null,
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 20,
                      right: 8,
                    },
                  }}
                  Icon={() => {
                    return (
                      <Entypo name="chevron-down" size={18} color="#000" />
                    );
                  }}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
