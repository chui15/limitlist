import React from 'react';

const StudentTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Course</th>
        <th>Grade</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.students.length > 0 ? (
        props.students.map(student => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.grade}</td>
            <td>
              <button className="button muted-button" onClick={() => props.editStudent(student)}>Edit</button>
              <button className="button muted-button" onClick={() => props.deleteStudent(student.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
          <tr>
            <td colSpan={3}>No Students</td>
          </tr>
      )}
    </tbody>
  </table>
)

export default StudentTable;
