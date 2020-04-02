import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts, removeAlert } = useContext(AlertContext);
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key={alert.id}
        className={`alert-animation alert alert-${alert.type}`}
      >
        <i className='fa fa-info-circle'></i> {alert.msg}
        <i
          className='fa fa-times'
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => removeAlert(alert.alertId, alert.id)}
        ></i>
      </div>
    ))
  );
};

export default Alerts;
