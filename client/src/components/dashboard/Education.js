import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/Profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Education credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null,{deleteEducation}) (Education);
