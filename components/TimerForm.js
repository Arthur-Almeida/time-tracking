import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import TimerButton from './TimerButton';

const TimerForm = (props) => {
  const [title, setTitle] = useState(props.id ? props.title : '');
  const [project, setProject] = useState(props.id ? props.project : '');

  // If `props.id` is present, we're editing an existing timer
  const submitText = props.id ? 'Update' : 'Create';

  const handleTitleChange = (title) => {
    setTitle(title);
  };

  const handleProjectChange = (project) => {
    setProject(project);
  };

  const handleSubmit = () => {
    const {onFormSubmit, id} = props;

    onFormSubmit({id, title, project});
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={handleTitleChange}
            value={title}
          />
        </View>
      </View>

      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={handleProjectChange}
            value={project}
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TimerButton
          small
          color="#21BA45"
          title={submitText}
          onPress={handleSubmit}
        />
        <TimerButton
          small
          color="#DB2828"
          title="Cancel"
          onPress={props.onFormClose}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

TimerForm.propTypes = {
  id: PropTypes.string,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  project: PropTypes.string,
  title: PropTypes.string,
};

TimerForm.defaultProps = {
  id: null,
  project: '',
  title: '',
};

export default TimerForm;
