import React from 'react';
import { Route, Switch } from 'wouter';
import { Layout } from './components/Layout';
import { ExerciseAdmin } from './pages/exercises/ExerciseAdmin';
import { SessionAdmin } from './pages/sessions/SessionAdmin';
import { SessionList } from './pages/sessions/SessionList';
import { Home } from './pages/Home';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sessions" component={SessionList} />
        <Route path="/admin/sessions" component={SessionAdmin} />
        <Route path="/admin/exercises" component={ExerciseAdmin} />
      </Switch>
    </Layout>
  );
}

export default App;