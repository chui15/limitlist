import React, { useState, useEffect } from 'react';
import StudentTable from './tables/student-table';
import AddStudentForm from './forms/add-student';
import EditStudentForm from './forms/edit-student';
import ToggleSwitch from './switch';
import './index.css';

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

  const lightTheme = {
    '--primary-color': '#302AE6',
    '--secondary-color': '#536390',
    '--font-color': '#424242',
    '--bg-color': '#fff',
    '--heading-color': '#292922',
  };

  const darkTheme = {
    '--primary-color': '#9A97F3',
    '--secondary-color': '#818cab',
    '--font-color': '#e1e1ff',
    '--bg-color': '#161625',
    '--heading-color': '#818cab',
  }

  const [currentMode, setCurrentMode] = useState('light');
  const [isClicked, setClick] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('mode') === 'dark') {
      setCurrentMode('dark');
      setClick(true);
    }
  }, []);

  useEffect(() => {
    const display = currentMode === 'light' ? lightTheme : darkTheme;
    Object.keys(display).forEach(key => {
      const value = display[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentMode, darkTheme, lightTheme]);

  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setClick(!isClicked);
    setCurrentMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  return (
    <div className="container">
      <div className="flex-row">
        <h1 className={"flex-small"}>Student Grade Table</h1>
        <ToggleSwitch
          toggleTheme={toggleTheme}
          isChecked={isClicked}
          id="mode"
          ariaLabel="dark mode toggle"
        />
      </div>
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
              <AddStudentForm addStudent={addStudent}/>
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
