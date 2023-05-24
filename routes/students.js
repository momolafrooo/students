const express = require('express');
const router = express.Router();

let students = [];

// Get all students
router.get('', (req, res) => {
  res.json(students);
});

// Get a specific student
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const student = students.find((s) => s.id === id);

  if (!student) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    res.json(student);
  }
});

// Create a new student
router.post('/', (req, res) => {
  console.log(req.body)
  const { id, name, age } = req.body;
  const student = { id, name, age };
  students.push(student);
  res.status(201).json(student);
});

// Update an existing student
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  const student = students.find((s) => s.id === id);

  if (!student) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    student.name = name;
    student.age = age;
    res.json(student);
  }
});

// Delete a student
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    const deletedStudent = students.splice(index, 1)[0];
    res.json(deletedStudent);
  }
});

module.exports = router;
