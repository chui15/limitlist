import React, { useState } from 'react';
import StudentTable from './tables/student-table';
import AddStudentForm from './forms/add-student';
import EditStudentForm from './forms/edit-student';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const App = () => {

  const [switchState, setSwitch] = useState(false);

  const switchChange = name => event => {
    setSwitch({...switchState, [name]: event.target.checked});
  }

  const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

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

  let switchMessage = !switchState ? 'Venture to the dark side?' : 'Venture back to the light side?';
  let wrapperTheme = !switchState ? 'light' : 'dark';

  return (
    <div className={wrapperTheme}>
    <div className="container">
      <div className="flex-row">
        <h1 className={"flex-small"}>Student Grade Table</h1>
        <div className="flex-large">
          <FormControlLabel
          control={
            <IOSSwitch
              checked={switchState.checkedB}
              onChange={switchChange('checkedB')}
              value="checkedB"
            />
          }
          label={switchMessage}
        /></div>
      </div>
      <div className="flex-row">
        <div className="flex-large">
          { editing ? (
            <div>
              <h2 className={wrapperTheme}>Edit Student</h2>
              <EditStudentForm
              editing={editing}
              setEditing={setEditing}
              currentStudent={currentStudent}
              updateStudent={updateStudent} />
            </div>
          ) : (
            <div>
              <h2 className={wrapperTheme}>Add New Student</h2>
              <AddStudentForm addStudent={addStudent} theme={wrapperTheme}/>
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2 className={wrapperTheme}>View Students</h2>
          <StudentTable students={students} deleteStudent={deleteStudent} editStudent={editStudent}/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
