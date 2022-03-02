import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Editor from './pages/Editor';
import Form from './pages/Form';
import Submission from './pages/Submission';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/forms/editor" element={<Editor />} />
        <Route path="/forms/:id" element={<Form />} />
        <Route path="/forms/:id/submission" element={<Submission />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
