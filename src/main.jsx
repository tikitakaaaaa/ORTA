import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const teachers = [
  { id: 1, name: 'Aigerim S.', subject: 'Robotics & STEM', city: 'Almaty', mode: 'Online / Offline', rating: 4.9, tags: ['Arduino', 'Robotics', 'STEM'] },
  { id: 2, name: 'Dias K.', subject: 'English', city: 'Astana', mode: 'Online', rating: 4.8, tags: ['IELTS', 'Speaking', 'Academic'] },
  { id: 3, name: 'Madina T.', subject: 'Physics', city: 'Kyzylorda', mode: 'Online', rating: 4.7, tags: ['Physics', 'Olympiad', 'Grades 7–11'] },
];

const initialOpportunities = [
  { id: 1, title: 'Robotics lesson for Grade 8', school: 'School №125', format: 'Online', pay: '15 000 ₸', city: 'Almaty', status: 'Open' },
  { id: 2, title: 'Guest English speaking club', school: 'NIS partner school', format: 'Online', pay: '20 000 ₸', city: 'Astana', status: 'Open' },
  { id: 3, title: 'Physics masterclass', school: 'Regional school', format: 'Offline', pay: '25 000 ₸', city: 'Kyzylorda', status: 'Open' },
];

function App() {
  const [page, setPage] = useState('home');
  const [role, setRole] = useState(localStorage.getItem('orta_role') || 'guest');
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');

  const filteredTeachers = useMemo(() => teachers.filter(t =>
    `${t.name} ${t.subject} ${t.city} ${t.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem('orta_role', newRole);
    setPage('dashboard');
  };

  const logout = () => {
    setRole('guest');
    localStorage.removeItem('orta_role');
    setPage('home');
  };

  const apply = (opp) => {
    if (role !== 'teacher') {
      alert('Для отклика войдите как преподаватель.');
      setPage('login');
      return;
    }
    if (!applications.some(a => a.id === opp.id)) setApplications([...applications, opp]);
  };

  const createOpportunity = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newOpp = {
      id: Date.now(),
      title: data.get('title'),
      school: data.get('school') || 'My School',
      format: data.get('format'),
      pay: `${data.get('pay')} ₸`,
      city: data.get('city'),
      status: 'Open'
    };
    setOpportunities([newOpp, ...opportunities]);
    e.currentTarget.reset();
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')}>
          <span className="brand-mark">O</span>
          <span><b>ORTA</b><small>Opportunity. Resource. Talent. Access.</small></span>
        </button>
        <nav>
          <button onClick={() => setPage('teachers')}>Преподаватели</button>
          <button onClick={() => setPage('opportunities')}>Возможности</button>
          {role !== 'guest' && <button onClick={() => setPage('dashboard')}>Dashboard</button>}
        </nav>
        <div className="auth-actions">
          {role === 'guest' ? <button className="primary" onClick={() => setPage('login')}>Войти</button> : <button className="ghost" onClick={logout}>Выйти</button>}
        </div>
      </header>

      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'teachers' && <Teachers search={search} setSearch={setSearch} items={filteredTeachers} />}
        {page === 'opportunities' && <Opportunities items={opportunities} apply={apply} />}
        {page === 'login' && <Login login={login} />}
        {page === 'dashboard' && <Dashboard role={role} opportunities={opportunities} applications={applications} createOpportunity={createOpportunity} />}
      </main>

      <footer>ORTA MVP · Education access platform · 2026</footer>
    </div>
  );
}

function Home({ setPage }) {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Education without borders</span>
        <h1>Школы находят таланты.<br/>Преподаватели находят возможности.</h1>
        <p>ORTA объединяет школы, учителей и образовательные проекты в одной платформе — от совместных уроков до гостевых лекций и готовых материалов.</p>
        <div className="hero-actions">
          <button className="primary big" onClick={() => setPage('opportunities')}>Найти возможности</button>
          <button className="secondary big" onClick={() => setPage('teachers')}>Найти преподавателя</button>
        </div>
      </div>
      <div className="hero-panel">
        <div className="stat"><b>3</b><span>типа участников</span></div>
        <div className="stat"><b>1</b><span>единая сеть</span></div>
        <div className="stat"><b>24/7</b><span>доступ к возможностям</span></div>
      </div>
    </section>
    <section className="features">
      {[
        ['Для школ','Публикуйте запросы, приглашайте учителей, находите готовые занятия.'],
        ['Для учителей','Создавайте профиль, находите школы и оплачиваемые занятия.'],
        ['Для регионов','Доступ к экспертам вне зависимости от города и размера школы.']
      ].map(([t,d]) => <article key={t}><h3>{t}</h3><p>{d}</p></article>)}
    </section>
  </>
}

function Teachers({ search, setSearch, items }) {
  return <section className="page-section">
    <div className="section-head"><div><span className="eyebrow">Talent network</span><h2>Преподаватели</h2></div><input placeholder="Поиск: Robotics, Physics, Almaty..." value={search} onChange={e => setSearch(e.target.value)} /></div>
    <div className="grid">{items.map(t => <article className="card" key={t.id}>
      <div className="avatar">{t.name[0]}</div><h3>{t.name}</h3><p className="muted">{t.subject}</p><p>{t.city} · {t.mode}</p><p>★ {t.rating}</p><div className="tags">{t.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="secondary">Открыть профиль</button>
    </article>)}</div>
  </section>
}

function Opportunities({ items, apply }) {
  return <section className="page-section">
    <div className="section-head"><div><span className="eyebrow">Open requests</span><h2>Возможности</h2></div></div>
    <div className="list">{items.map(o => <article className="opportunity" key={o.id}>
      <div><span className="status">{o.status}</span><h3>{o.title}</h3><p className="muted">{o.school} · {o.city} · {o.format}</p></div>
      <div className="opp-side"><b>{o.pay}</b><button className="primary" onClick={() => apply(o)}>Откликнуться</button></div>
    </article>)}</div>
  </section>
}

function Login({ login }) {
  return <section className="login-wrap"><div className="login-card"><span className="eyebrow">Demo access</span><h2>Войти в ORTA</h2><p>Пока это демо-режим без сервера. Выбери роль — позже заменим на реальную регистрацию через Supabase.</p><button className="primary big full" onClick={() => login('teacher')}>Я преподаватель</button><button className="secondary big full" onClick={() => login('school')}>Я представляю школу</button></div></section>
}

function Dashboard({ role, opportunities, applications, createOpportunity }) {
  if (role === 'guest') return <section className="page-section"><h2>Сначала войдите</h2></section>;
  if (role === 'teacher') return <section className="page-section"><span className="eyebrow">Teacher dashboard</span><h2>Мои отклики</h2>{applications.length === 0 ? <p className="muted">Вы пока никуда не откликнулись.</p> : <div className="list">{applications.map(a => <article className="opportunity" key={a.id}><div><h3>{a.title}</h3><p>{a.school}</p></div><span className="status">Application sent</span></article>)}</div>}</section>;
  return <section className="page-section"><span className="eyebrow">School dashboard</span><h2>Создать запрос</h2>
    <form className="form-card" onSubmit={createOpportunity}>
      <input name="title" required placeholder="Напр.: Robotics lesson for Grade 8" />
      <div className="form-row"><input name="school" placeholder="Название школы" /><input name="city" required placeholder="Город" /></div>
      <div className="form-row"><select name="format"><option>Online</option><option>Offline</option><option>Hybrid</option></select><input name="pay" required type="number" placeholder="Оплата, ₸" /></div>
      <button className="primary">Опубликовать запрос</button>
    </form>
    <h2 className="spaced">Все запросы</h2><div className="list">{opportunities.map(o => <article className="opportunity" key={o.id}><div><h3>{o.title}</h3><p>{o.city} · {o.format}</p></div><b>{o.pay}</b></article>)}</div>
  </section>;
}

createRoot(document.getElementById('root')).render(<App />);
