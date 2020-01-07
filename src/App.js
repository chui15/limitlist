import React, { useState } from 'react';
import StudentTable from './tables/student-table';
import AddStudentForm from './forms/add-student';
import EditStudentForm from './forms/edit-student';

const App = () => {

  const studentData = [
    { id: 1, name: 'Christie', course: 'Genomics', grade: 100 },
    { id: 2, name: 'Vivian', course: 'Nutrition', grade: 100 },
    { id: 3, name: 'Michelle', course: 'Psychology', grade: 100 },
  ];

  const [students, setStudents] = useState(studentData);

  const addStudent = student => {
    student.id = students.length + 1;
    setStudents([...students, student]);
  };

  const deleteStudent = studentID => {
    setEditing(false);
    setStudents(students.filter(student => student.id !== studentID));
  }

  const [editing, setEditing] = useState(false);

  const initialForm = { id: null, name: '', course: '', grade: '' };

  const [currentStudent, setCurrentStudent] = useState(initialForm);

  const editStudent = student => {
    setEditing(true);
    setCurrentStudent({ id: student.id, name: student.name, course: student.course, grade: student.grade });
  }

  const updateStudent = (studentID, updatedStudent) => {
    setEditing(false);
    setStudents(students.map(student => (student.id === studentID ? updatedStudent : student)));
  }

  return (
    <div className="container">
      <h1>Student Grade Table</h1>
      <div className="flex-row">
        <div className="flex-large">
          { editing ? (
            <div>
              <h2>Edit Student</h2>
              <EditStudentForm
              editing={editing}
              setEditing={setEditing}
              currentStudent={currentStudent}
              updateStudent={updateStudent} />
            </div>
          ) : (
            <div>
              <h2>Add New Student</h2>
              <AddStudentForm addStudent={addStudent} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View Students</h2>
          <StudentTable students={students} deleteStudent={deleteStudent} editStudent={editStudent}/>
        </div>
      </div>
    </div>
  );
}

export default App;
