import React, {useState} from 'react';
import PropTypes from 'prop-types';

import TimerForm from './TimerForm';
import Timer from './Timer';

const EditableTimer = ({
  elapsed,
  id,
  isRunning,
  onFormSubmit,
  onRemovePress,
  onStartPress,
  onStopPress,
  project,
  title,
}) => {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleEditPress = () => {
    openForm();
  };

  const handleFormClose = () => {
    closeForm();
  };

  const handleSubmit = (timer) => {
    onFormSubmit(timer);
    closeForm();
  };

  const closeForm = () => {
    setEditFormOpen(false);
  };

  const openForm = () => {
    setEditFormOpen(true);
  };

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
        project={project}
        title={title}
      />
    );
  }

  return (
    <Timer
      elapsed={elapsed}
      id={id}
      isRunning={isRunning}
      onEditPress={handleEditPress}
      onRemovePress={onRemovePress}
      onStartPress={onStartPress}
      onStopPress={onStopPress}
      project={project}
      title={title}
    />
  );
};

EditableTimer.propTypes = {
  elapsed: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onStartPress: PropTypes.func.isRequired,
  onStopPress: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EditableTimer;
