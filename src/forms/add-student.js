import React, { useState } from 'react';

const AddStudentForm = props => {

  const studentFormInitial = { id: null, name: '', course: '', grade: '' };
  const [student, setStudent] = useState(studentFormInitial);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  return (
    <form onSubmit={event => {
      event.preventDefault();
      if (!student.name || !student.course || !student.grade) return;
      props.addStudent(student);
      setStudent(studentFormInitial);
    }}>
      <label>Name</label>
      <input type="text" name="name" value={student.name} onChange={handleInputChange}/>
      <label>Course</label>
      <input type="text" name="course" value={student.course} onChange={handleInputChange}/>
      <label>Grade</label>
      <input type="text" name="grade" value={student.grade} onChange={handleInputChange}></input>
      <button>Add New Student</button>
    </form>
  );
}

export default AddStudentForm;
