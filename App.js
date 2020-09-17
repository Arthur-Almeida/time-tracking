import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import {newTimer} from './utils/TimerUtils';

const App = () => {
  const [timers, setTimers] = useState([
    {
      id: uuidv4(),
      title: 'Test',
      project: 'Test',
      elapsed: 0,
      isRunning: false,
    },
  ]);

  useEffect(() => {
    const TIME_INTERVAL = 1000;

    const intervalId = setInterval(() => {
      setTimers(
        timers.map((timer) => {
          const {elapsed, isRunning} = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      );
    }, TIME_INTERVAL);

    return () => clearInterval(intervalId);
  }, [timers]);

  const handleCreateFormSubmit = (timer) => {
    setTimers((previousState) => [newTimer(timer), ...previousState]);
  };

  const handleFormSubmit = (attrs) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === attrs.id) {
          const {title, project} = attrs;

          return {
            ...timer,
            project,
            title,
          };
        }

        return timer;
      }),
    );
  };

  const handleRemovePress = (timerId) => {
    setTimers(timers.filter((timer) => timer.id !== timerId));
  };

  const toggleTimer = (timerId) => {
    setTimers((prevState) => {
      return prevState.map((timer) => {
        const {id, isRunning} = timer;

        if (id === timerId) {
          return {
            ...timer,
            isRunning: !isRunning,
          };
        }

        return timer;
      });
    });
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
        {timers.map(({id, title, project, elapsed, isRunning}) => (
          <EditableTimer
            key={id}
            elapsed={elapsed}
            id={id}
            isRunning={isRunning}
            onFormSubmit={handleFormSubmit}
            onRemovePress={handleRemovePress}
            onStartPress={toggleTimer}
            onStopPress={toggleTimer}
            project={project}
            title={title}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});

export default App;
