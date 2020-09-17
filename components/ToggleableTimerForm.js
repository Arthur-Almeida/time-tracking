import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

const ToggleableTimerForm = ({onFormSubmit}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormOpen = () => setIsOpen(true);

  const handleFormSubmit = (timer) => {
    onFormSubmit(timer);
    setIsOpen(false);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm
          onFormSubmit={handleFormSubmit}
          onFormClose={handleFormClose}
        />
      ) : (
        <TimerButton title="+" color="black" onPress={handleFormOpen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});

ToggleableTimerForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ToggleableTimerForm;
