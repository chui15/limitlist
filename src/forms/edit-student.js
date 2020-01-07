import React, { useState, useEffect } from 'react';

const EditStudentForm = props => {
  const [student, setStudent] = useState(props.currentStudent);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({...student, [name]: value });
  };

  useEffect(() => {
    setStudent(props.currentStudent);
  }, [props]);

  return (
    <form onSubmit={event => {
      event.preventDefault();
      props.updateStudent(student.id, student);
    }}>
      <label>Name</label>
      <input type="text" name="name" value={student.name} onChange={handleInputChange} />
      <label>Course</label>
      <input type="text" name="course" value={student.course} onChange={handleInputChange} />
      <label>Grade</label>
      <input type="text" name="grade" value={student.grade} onChange={handleInputChange} />
      <button>Update Student</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditStudentForm;
