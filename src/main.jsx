import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const seedTeachers = [
  {
    id: 1, name: 'Aigerim S.', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Aigerim&backgroundColor=e8f5f4', subject: 'Robotics & STEM', city: 'Almaty', mode: 'Online / Offline',
    rating: 4.9, reviews: 48, lessons: 126, repeatInvites: 31, price: 15000,
    languages: ['Қазақша','Русский','English'], experience: '6 лет', grades: '5–11 классы',
    education: [
      { place: 'Satbayev University', degree: 'Electrical Engineering', period: '2016–2020' },
      { place: 'STEM Education Academy', degree: 'Robotics Education Certificate', period: '2022' }
    ],
    certificates: ['Arduino Education', 'STEM Project-Based Learning', 'Child Safeguarding Basics'],
    projects: ['Robotics Lab — школьная программа на 12 занятий', 'Arduino Smart City — командный проект для 8–9 классов'],
    bio: 'Провожу практические занятия по робототехнике, Arduino и STEM для 5–11 классов. Делаю упор на реальные мини-проекты, работу в командах и понятное объяснение инженерных принципов.',
    tags: ['Arduino', 'Robotics', 'STEM'],
    reviewsList: [
      { school: 'School №125', text: 'Сильная практика и очень понятная подача. Ученики были вовлечены весь урок.', rating: 5 },
      { school: 'ORTA Demo School', text: 'Приглашали повторно на STEM-неделю. Хорошо адаптирует материал под возраст класса.', rating: 5 }
    ]
  },
  {
    id: 2, name: 'Dias K.', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Dias&backgroundColor=edf4f7', subject: 'English', city: 'Astana', mode: 'Online',
    rating: 4.8, reviews: 36, lessons: 94, repeatInvites: 22, price: 12000,
    languages: ['English','Русский'], experience: '5 лет', grades: '7–11 классы',
    education: [{ place: 'ENU', degree: 'Foreign Languages', period: '2017–2021' }],
    certificates: ['IELTS 8.0', 'CELTA'], projects: ['Speaking Club for Teens', 'Academic English Bootcamp'],
    bio: 'IELTS, speaking clubs и академический английский для школьников.', tags: ['IELTS', 'Speaking', 'Academic'],
    reviewsList: [{ school: 'NIS partner school', text: 'Динамичный speaking club и хороший контакт с учениками.', rating: 5 }]
  },
  {
    id: 3, name: 'Madina T.', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Madina&backgroundColor=fff7df', subject: 'Physics', city: 'Kyzylorda', mode: 'Online',
    rating: 4.7, reviews: 29, lessons: 82, repeatInvites: 18, price: 10000,
    languages: ['Қазақша','Русский'], experience: '7 лет', grades: '7–11 классы',
    education: [{ place: 'Korkyt Ata University', degree: 'Physics', period: '2014–2018' }],
    certificates: ['Olympiad Training Methods'], projects: ['Applied Physics Masterclass', 'Energy for Schools'],
    bio: 'Физика, олимпиадная подготовка и мастер-классы для 7–11 классов.', tags: ['Physics', 'Olympiad', 'Grades 7–11'],
    reviewsList: [{ school: 'Regional school', text: 'Сложные темы объясняет через практические примеры.', rating: 5 }]
  },
];

const seedOpportunities = [
  { id: 1, title: 'Robotics lesson for Grade 8', school: 'School №125', subject: 'Robotics', grade: '8 класс', format: 'Online', pay: 15000, city: 'Almaty', language: 'Русский', date: '2026-11-20', duration: '60 мин', students: 24, description: 'Практический вводный урок по Arduino и базовой робототехнике.', requirements: 'Опыт работы со школьниками, демонстрационный проект.', status: 'Open' },
  { id: 2, title: 'Guest English speaking club', school: 'NIS partner school', subject: 'English', grade: '9–10 класс', format: 'Online', pay: 20000, city: 'Astana', language: 'English', date: '2026-11-24', duration: '75 мин', students: 18, description: 'Гостевой speaking club с интерактивной дискуссией.', requirements: 'English C1+, опыт проведения speaking clubs.', status: 'Open' },
  { id: 3, title: 'Physics masterclass', school: 'Regional school', subject: 'Physics', grade: '10 класс', format: 'Offline', pay: 25000, city: 'Kyzylorda', language: 'Қазақша', date: '2026-11-28', duration: '90 мин', students: 30, description: 'Мастер-класс по прикладной физике и энергетике.', requirements: 'Опыт преподавания физики или инженерное образование.', status: 'Open' },
];



const seedPromos = [
  {
    id: 1,
    type: 'Форум',
    badge: 'Демо',
    title: 'Future Education Forum 2026',
    partner: 'ORTA Partner',
    date: '18 ноября 2026',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
    cta: 'Подробнее'
  },
  {
    id: 2,
    type: 'Бесплатная программа',
    badge: 'Демо',
    title: '200 онлайн-уроков по электронике',
    partner: 'Technology Partner',
    date: 'Доступно онлайн',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    cta: 'Смотреть программу'
  },
  {
    id: 3,
    type: 'Грант / конкурс',
    badge: 'Демо',
    title: 'Школьный STEM Challenge',
    partner: 'Education Foundation',
    date: 'Заявки до 30 ноября',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80',
    cta: 'Условия участия'
  }
];

const demoSchool = {
  id: 'school-demo',
  name: 'ORTA Demo School',
  image: 'https://api.dicebear.com/9.x/shapes/svg?seed=ORTASchool&backgroundColor=e8f5f4',
  city: 'Almaty',
  students: 620,
  website: 'school.orta.kz',
  about: 'Школа, открытая для приглашённых преподавателей, совместных уроков и образовательных проектов.',
  verified: true
};

const readLocal = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function App() {
  const [page, setPage] = useState('home');
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('orta_role') || 'guest');
  const [opportunities, setOpportunities] = useState(() => readLocal('orta_opportunities', seedOpportunities));
  const [applications, setApplications] = useState(() => readLocal('orta_applications', []));
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [search, setSearch] = useState('');
  const [teacherFilters, setTeacherFilters] = useState({ city: 'Все', subject: 'Все', mode: 'Все' });
  const [oppFilters, setOppFilters] = useState({ city: 'Все', subject: 'Все', format: 'Все' });

  useEffect(() => localStorage.setItem('orta_opportunities', JSON.stringify(opportunities)), [opportunities]);
  useEffect(() => localStorage.setItem('orta_applications', JSON.stringify(applications)), [applications]);

  const filteredTeachers = useMemo(() => seedTeachers.filter(t => {
    const q = `${t.name} ${t.subject} ${t.city} ${t.tags.join(' ')}`.toLowerCase();
    return q.includes(search.toLowerCase())
      && (teacherFilters.city === 'Все' || t.city === teacherFilters.city)
      && (teacherFilters.subject === 'Все' || t.subject.includes(teacherFilters.subject))
      && (teacherFilters.mode === 'Все' || t.mode.includes(teacherFilters.mode));
  }), [search, teacherFilters]);

  const filteredOpps = useMemo(() => opportunities.filter(o =>
    (oppFilters.city === 'Все' || o.city === oppFilters.city) &&
    (oppFilters.subject === 'Все' || o.subject === oppFilters.subject) &&
    (oppFilters.format === 'Все' || o.format === oppFilters.format)
  ), [opportunities, oppFilters]);

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

  const openTeacher = (teacher) => { setSelectedTeacher(teacher); setPage('teacherProfile'); };
  const openOpportunity = (opp) => { setSelectedOpportunity(opp); setPage('opportunityDetail'); };

  const apply = (opp, message = 'Здравствуйте! Мне интересен ваш запрос. Готов обсудить формат занятия.') => {
    if (role !== 'teacher') {
      alert('Для отклика войдите в демо как преподаватель.');
      setPage('login');
      return;
    }
    if (applications.some(a => a.opportunityId === opp.id)) {
      alert('Вы уже откликнулись на это объявление.');
      return;
    }
    setApplications(prev => [{
      id: Date.now(),
      opportunityId: opp.id,
      teacherId: 1,
      teacherName: 'Aigerim S.',
      school: opp.school,
      title: opp.title,
      message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    }, ...prev]);
    alert('Отклик отправлен.');
  };

  const updateApplicationStatus = (id, status) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const createOpportunity = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newOpp = {
      id: Date.now(),
      title: data.get('title'),
      school: data.get('school') || demoSchool.name,
      subject: data.get('subject'),
      grade: data.get('grade'),
      format: data.get('format'),
      pay: Number(data.get('pay')),
      city: data.get('city'),
      language: data.get('language'),
      date: data.get('date'),
      duration: data.get('duration'),
      students: Number(data.get('students')),
      description: data.get('description'),
      requirements: data.get('requirements'),
      status: 'Open'
    };
    setOpportunities(prev => [newOpp, ...prev]);
    e.currentTarget.reset();
  };

  const assistantGo = (target) => {
    setPage(target);
    setAssistantOpen(false);
  };


  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')}>
          <span className="brand-mark" aria-hidden="true">
            <svg className="shanyrak-logo" viewBox="0 0 64 64">
              <defs>
                <clipPath id="shanyrakClip">
                  <circle cx="32" cy="32" r="19"/>
                </clipPath>
              </defs>
              <circle cx="32" cy="32" r="20.5" fill="none" stroke="currentColor" strokeWidth="4.5"/>
              <g clipPath="url(#shanyrakClip)" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
                <path d="M18 24 C24 29, 40 29, 46 24"/>
                <path d="M17 32 C24 36, 40 36, 47 32"/>
                <path d="M18 40 C24 35, 40 35, 46 40"/>
                <path d="M24 18 C29 24, 29 40, 24 46"/>
                <path d="M32 17 C36 24, 36 40, 32 47"/>
                <path d="M40 18 C35 24, 35 40, 40 46"/>
              </g>
            </svg>
          </span>
          <span><b>ORTA</b><small>Opportunity. Resource. Talent. Access.</small></span>
        </button>
        <nav>
          <button onClick={() => setPage('teachers')}>Преподаватели</button>
          <button onClick={() => setPage('opportunities')}>Возможности</button>
          <button onClick={() => setPage('schoolProfile')}>Школы</button>
          {role !== 'guest' && <button onClick={() => setPage('dashboard')}>Dashboard</button>}
        </nav>
        <div className="auth-actions">
          {role === 'guest' ? <button className="primary" onClick={() => setPage('login')}>Демо-вход</button> : <button className="ghost" onClick={logout}>Выйти</button>}
        </div>
      </header>

      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'teachers' && <Teachers search={search} setSearch={setSearch} filters={teacherFilters} setFilters={setTeacherFilters} items={filteredTeachers} openTeacher={openTeacher} />}
        {page === 'teacherProfile' && selectedTeacher && <TeacherProfile teacher={selectedTeacher} setPage={setPage} />}
        {page === 'opportunities' && <Opportunities items={filteredOpps} filters={oppFilters} setFilters={setOppFilters} openOpportunity={openOpportunity} apply={apply} />}
        {page === 'opportunityDetail' && selectedOpportunity && <OpportunityDetail opp={selectedOpportunity} apply={apply} />}
        {page === 'schoolProfile' && <SchoolProfile school={demoSchool} opportunities={opportunities} openOpportunity={openOpportunity} />}
        {page === 'login' && <Login login={login} />}
        {page === 'dashboard' && <Dashboard role={role} opportunities={opportunities} applications={applications} createOpportunity={createOpportunity} updateApplicationStatus={updateApplicationStatus} openOpportunity={openOpportunity} />}
      </main>

      <div className="dara-assistant">
        {assistantOpen && (
          <div className="dara-panel">
            <div className="dara-panel-head">
              <div>
                <b>Dara by ORTA</b>
                <span>Помогу сориентироваться</span>
              </div>
              <button className="dara-close" onClick={() => setAssistantOpen(false)} aria-label="Закрыть">×</button>
            </div>
            <p className="dara-greeting">Сәлем! Что хотите найти?</p>
            <div className="dara-actions">
              <button onClick={() => assistantGo('teachers')}>Найти преподавателя</button>
              <button onClick={() => assistantGo('opportunities')}>Найти занятие</button>
              <button onClick={() => assistantGo('schoolProfile')}>Для школы</button>
              <button onClick={() => assistantGo('opportunities')}>Робототехника / STEM</button>
            </div>
            <small className="dara-note">Демо-помощник · AI подключим позже</small>
          </div>
        )}
        <button
          className={"dara-bot" + (assistantOpen ? " is-open" : "")}
          onClick={() => setAssistantOpen(v => !v)}
          aria-label="Открыть помощника Dara"
        >
          <span className="dara-board-face">
            <span className="dara-eye left"></span>
            <span className="dara-eye right"></span>
            <span className="dara-smile"></span>
          </span>
          <span className="dara-shanyrak">⌾</span>
        </button>
      </div>

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

    <section className="school-testimonials">
      <div className="testimonial-heading">
        <div>
          <span className="eyebrow">School stories</span>
          <h2>Что говорят школы</h2>
        </div>
        <span className="demo-note">Демо-отзывы</span>
      </div>
      <div className="testimonial-grid">
        {[
          {school:'School №125',city:'Almaty',result:'Преподаватель найден за 2 дня',text:'Быстро нашли специалиста по робототехнике для гостевого урока.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=School125&backgroundColor=e8f5f4'},
          {school:'Regional STEM School',city:'Kyzylorda',result:'30 учеников на мастер-классе',text:'Удалось пригласить преподавателя по физике без долгого поиска.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=RegionalSTEM&backgroundColor=fff7df'},
          {school:'NIS Partner School',city:'Astana',result:'Повторное приглашение',text:'После первого speaking club пригласили преподавателя ещё раз.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=NISPartner&backgroundColor=edf4f7'}
        ].map(item => <article className="testimonial-card" key={item.school}>
          <div className="testimonial-school">
            <img src={item.logo} alt="" />
            <div><b>{item.school}</b><span>{item.city}</span></div>
          </div>
          <div className="testimonial-stars">★★★★★</div>
          <p>“{item.text}”</p>
          <strong>{item.result}</strong>
        </article>)}
      </div>
    </section>

    <section className="how-it-works">
      <div className="section-kicker">
        <span className="eyebrow">Simple flow</span>
        <h2>Как это работает</h2>
      </div>
      <div className="how-grid">
        {[
          ['01','Школа публикует запрос','Указывает предмет, формат, дату и условия.'],
          ['02','Преподаватель откликается','Школа сразу видит профиль, опыт и отзывы.'],
          ['03','Договариваются о занятии','После принятия отклика стороны переходят к занятию.']
        ].map(([n,t,d]) => <article className="how-card" key={n}>
          <span className="how-number">{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>)}
      </div>
    </section>

    <section className="trust-strip">
      <div className="trust-item">
        <span className="trust-icon">✓</span>
        <div><b>Проверяем профили</b><small>Верификацию подключим по мере запуска</small></div>
      </div>
      <div className="trust-item">
        <span className="trust-icon">↔</span>
        <div><b>Прозрачный выбор</b><small>Опыт, рейтинг, отзывы и условия до отклика</small></div>
      </div>
      <div className="trust-item">
        <span className="trust-icon">◎</span>
        <div><b>Поддержка школ</b><small>Помогаем найти подходящего специалиста</small></div>
      </div>
    </section>

    <section className="promo-section">
      <div className="promo-heading">
        <div>
          <span className="eyebrow">Featured opportunities</span>
          <h2>Возможности недели</h2>
          <p>Форумы, бесплатные программы, конкурсы и образовательные инициативы от партнёров ORTA.</p>
        </div>
        <button className="secondary" onClick={() => setPage('opportunities')}>Все возможности</button>
      </div>

      <div className="promo-carousel" aria-label="Промо-возможности">
        {seedPromos.map((promo) => (
          <article className="promo-banner" key={promo.id} style={{backgroundImage:`linear-gradient(90deg, rgba(7,24,38,.84) 0%, rgba(7,24,38,.58) 48%, rgba(7,24,38,.12) 100%), url(${promo.image})`}}>
            <div className="promo-banner-content">
              <div className="promo-topline">
                <span className="promo-type">{promo.type}</span>
                <span className="promo-demo">{promo.badge}</span>
              </div>
              <p className="promo-partner">{promo.partner}</p>
              <h3>{promo.title}</h3>
              <div className="promo-bottom">
                <span>{promo.date}</span>
                <button className="promo-button" onClick={() => setPage('opportunities')}>{promo.cta} →</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="promo-hint">Листайте баннеры →</p>
    </section>

    <section className="features compact-features">
      {[
        ['🏫','Для школ','Найти преподавателя'],
        ['👩‍🏫','Для учителей','Найти занятие'],
        ['🌍','Для регионов','Получить доступ']
      ].map(([icon,t,d]) => <article key={t}><span className="feature-icon">{icon}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}
    </section>
  </>
}

function Teachers({ search, setSearch, filters, setFilters, items, openTeacher }) {
  return <section className="page-section">
    <div className="section-head"><div><span className="eyebrow">Talent network</span><h2>Преподаватели</h2></div><input placeholder="Поиск: Robotics, Physics, Almaty..." value={search} onChange={e => setSearch(e.target.value)} /></div>
    <div className="filters">
      <select value={filters.city} onChange={e => setFilters({...filters, city:e.target.value})}><option>Все</option><option>Almaty</option><option>Astana</option><option>Kyzylorda</option></select>
      <select value={filters.subject} onChange={e => setFilters({...filters, subject:e.target.value})}><option>Все</option><option>Robotics</option><option>English</option><option>Physics</option></select>
      <select value={filters.mode} onChange={e => setFilters({...filters, mode:e.target.value})}><option>Все</option><option>Online</option><option>Offline</option></select>
    </div>
    <div className="grid">{items.map(t => <article className="card" key={t.id}>
      <img className="avatar avatar-photo" src={t.avatar} alt={t.name} /><h3>{t.name}</h3><p className="muted">{t.subject}</p><p>{t.city} · {t.mode}</p><p>★ {t.rating} · {t.lessons} уроков · от {t.price.toLocaleString('ru-RU')} ₸</p><div className="tags">{t.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="secondary" onClick={() => openTeacher(t)}>Открыть профиль</button>
    </article>)}</div>
  </section>
}

function TeacherProfile({ teacher, setPage }) {
  return <section className="page-section profile-layout">
    <aside className="profile-card teacher-sidebar">
      <div className="profile-identity">
        <img className="avatar large avatar-photo" src={teacher.avatar} alt={teacher.name} />
        <div><h2>{teacher.name}</h2><p className="muted">{teacher.subject}</p></div>
      </div>
      <div className="teacher-rating">★ {teacher.rating} <span>({teacher.reviews} отзывов)</span></div>
      <div className="teacher-quick-stats">
        <div><b>{teacher.lessons}</b><span>уроков</span></div>
        <div><b>{teacher.repeatInvites}</b><span>повторных приглашений</span></div>
      </div>
      <div className="profile-facts">
        <p><b>Город</b><span>{teacher.city}</span></p>
        <p><b>Формат</b><span>{teacher.mode}</span></p>
        <p><b>Классы</b><span>{teacher.grades}</span></p>
        <p><b>Опыт</b><span>{teacher.experience}</span></p>
      </div>
      <div className="profile-price">от {teacher.price.toLocaleString('ru-RU')} ₸ <span>/ занятие</span></div>
      <button className="primary full" onClick={() => setPage('opportunities')}>Пригласить / найти занятие</button>
    </aside>

    <div className="profile-main teacher-profile-main">
      <span className="eyebrow">Teacher profile</span>
      <h2>О преподавателе</h2>
      <p className="profile-bio">{teacher.bio}</p>

      <div className="profile-section">
        <h3>Предметы и навыки</h3>
        <div className="tags">{teacher.tags.map(x => <span key={x}>{x}</span>)}</div>
      </div>

      <div className="profile-section">
        <h3>Языки</h3>
        <div className="tags">{teacher.languages.map(x => <span key={x}>{x}</span>)}</div>
      </div>

      <div className="profile-section">
        <h3>Образование</h3>
        <div className="timeline-list">
          {teacher.education.map((item, index) => <div className="timeline-item" key={index}>
            <span className="timeline-dot"></span>
            <div><b>{item.place}</b><p>{item.degree}</p><small>{item.period}</small></div>
          </div>)}
        </div>
      </div>

      <div className="profile-two-col">
        <div className="profile-section mini-panel">
          <h3>Сертификаты</h3>
          <ul className="clean-list">{teacher.certificates.map(x => <li key={x}>✓ {x}</li>)}</ul>
        </div>
        <div className="profile-section mini-panel">
          <h3>Проекты</h3>
          <ul className="clean-list">{teacher.projects.map(x => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <div className="profile-section">
        <div className="reviews-heading"><h3>Отзывы школ</h3><span>★ {teacher.rating} · {teacher.reviews} отзывов</span></div>
        <div className="review-grid">
          {teacher.reviewsList.map((review, index) => <article className="review-card" key={index}>
            <div className="review-stars">{'★'.repeat(review.rating)}</div>
            <p>“{review.text}”</p>
            <b>{review.school}</b>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}

function Opportunities({ items, filters, setFilters, openOpportunity, apply }) {
  const [viewMode, setViewMode] = useState('list');
  const cityData = [
    { name: 'Astana', x: 54, y: 29 },
    { name: 'Almaty', x: 76, y: 72 },
    { name: 'Kyzylorda', x: 45, y: 69 }
  ];

  const selectCity = (city) => setFilters({ ...filters, city });

  return <section className="page-section">
    <div className="section-head">
      <div><span className="eyebrow">Open requests</span><h2>Возможности</h2></div>
      <div className="view-toggle" role="group" aria-label="Режим просмотра">
        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>☰ Список</button>
        <button className={viewMode === 'map' ? 'active' : ''} onClick={() => setViewMode('map')}>⌖ Карта</button>
      </div>
    </div>

    <div className="filters">
      <select value={filters.city} onChange={e => setFilters({...filters, city:e.target.value})}><option>Все</option><option>Almaty</option><option>Astana</option><option>Kyzylorda</option></select>
      <select value={filters.subject} onChange={e => setFilters({...filters, subject:e.target.value})}><option>Все</option><option>Robotics</option><option>English</option><option>Physics</option></select>
      <select value={filters.format} onChange={e => setFilters({...filters, format:e.target.value})}><option>Все</option><option>Online</option><option>Offline</option><option>Hybrid</option></select>
    </div>

    {viewMode === 'map' ? (
      <div className="opportunity-map-layout">
        <div className="kz-map-card">
          <div className="map-caption">
            <div><b>Карта возможностей ORTA</b><span>Нажмите на город, чтобы отфильтровать предложения</span></div>
            {filters.city !== 'Все' && <button onClick={() => selectCity('Все')}>Показать все</button>}
          </div>
          <div className="kz-map" aria-label="Интерактивная карта возможностей Казахстана">
            <svg className="kz-shape" viewBox="0 0 800 470" aria-hidden="true">
              <path d="M87 188 L143 122 L246 94 L337 108 L405 77 L515 93 L570 139 L674 153 L710 216 L674 270 L601 292 L548 357 L455 371 L381 344 L305 365 L222 329 L153 310 L116 256 Z" />
            </svg>
            {cityData.map(city => {
              const count = items.filter(o => o.city === city.name).length;
              const selected = filters.city === city.name;
              return <button
                key={city.name}
                className={"map-pin" + (selected ? " selected" : "")}
                style={{left: city.x + '%', top: city.y + '%'}}
                onClick={() => selectCity(city.name)}
                title={city.name}
              >
                <span className="map-pin-dot"></span>
                <span className="map-pin-label"><b>{city.name}</b><small>{count} предлож.</small></span>
              </button>
            })}
          </div>
        </div>

        <div className="map-results">
          <div className="map-results-head">
            <b>{filters.city === 'Все' ? 'Все города' : filters.city}</b>
            <span>{items.length} предложений</span>
          </div>
          <div className="map-results-list">
            {items.map(o => <button className="map-result-card" key={o.id} onClick={() => openOpportunity(o)}>
              <span className="status">{o.status}</span>
              <b>{o.title}</b>
              <small>{o.school} · {o.city} · {o.format}</small>
              <strong>{o.pay.toLocaleString('ru-RU')} ₸</strong>
            </button>)}
          </div>
        </div>
      </div>
    ) : (
      <div className="list">{items.map(o => <article className="opportunity" key={o.id}>
        <div><span className="status">{o.status}</span><h3>{o.title}</h3><p className="muted">{o.school} · {o.city} · {o.format}</p><p>{o.subject} · {o.grade} · {o.language}</p></div>
        <div className="opp-side"><b>{o.pay.toLocaleString('ru-RU')} ₸</b><button className="secondary" onClick={() => openOpportunity(o)}>Подробнее</button><button className="primary" onClick={() => apply(o)}>Откликнуться</button></div>
      </article>)}</div>
    )}
  </section>
}

function OpportunityDetail({ opp, apply }) {
  const [message, setMessage] = useState('Здравствуйте! Мне интересен ваш запрос. Готов обсудить формат занятия.');
  return <section className="page-section detail-page"><div><span className="status">{opp.status}</span><h2>{opp.title}</h2><p className="muted">{opp.school} · {opp.city}</p><div className="detail-grid"><div><b>Предмет</b><span>{opp.subject}</span></div><div><b>Класс</b><span>{opp.grade}</span></div><div><b>Формат</b><span>{opp.format}</span></div><div><b>Дата</b><span>{opp.date || 'По согласованию'}</span></div><div><b>Длительность</b><span>{opp.duration}</span></div><div><b>Учеников</b><span>{opp.students}</span></div><div><b>Язык</b><span>{opp.language}</span></div><div><b>Оплата</b><span>{opp.pay.toLocaleString('ru-RU')} ₸</span></div></div><h3>Описание</h3><p>{opp.description}</p><h3>Требования</h3><p>{opp.requirements}</p></div>
    <aside className="apply-card"><h3>Откликнуться</h3><textarea rows="6" value={message} onChange={e=>setMessage(e.target.value)} /><button className="primary full" onClick={() => apply(opp, message)}>Отправить отклик</button></aside></section>
}

function SchoolProfile({ school, opportunities, openOpportunity }) {
  return <section className="page-section"><div className="school-head"><img className="school-avatar" src={school.image} alt={school.name} /><div><span className="eyebrow">School profile</span><h2>{school.name} {school.verified && <span className="verified">✓</span>}</h2><p>{school.city} · {school.students} учеников · {school.website}</p><p>{school.about}</p></div></div><h2 className="spaced">Открытые запросы</h2><div className="list">{opportunities.slice(0,4).map(o=><article className="opportunity" key={o.id}><div><h3>{o.title}</h3><p className="muted">{o.city} · {o.format}</p></div><button className="secondary" onClick={()=>openOpportunity(o)}>Подробнее</button></article>)}</div></section>
}

function Login({ login }) {
  return <section className="login-wrap"><div className="login-card"><span className="eyebrow">Demo access</span><h2>Демо-режим ORTA</h2><p>Регистрацию пока пропускаем. Выбери роль, чтобы протестировать рабочие сценарии платформы.</p><button className="primary big full" onClick={() => login('teacher')}>Я преподаватель</button><button className="secondary big full" onClick={() => login('school')}>Я представляю школу</button></div></section>
}

function Dashboard({ role, opportunities, applications, createOpportunity, updateApplicationStatus, openOpportunity }) {
  if (role === 'guest') return <section className="page-section"><h2>Выберите демо-роль</h2></section>;
  if (role === 'teacher') return <section className="page-section"><span className="eyebrow">Teacher dashboard</span><h2>Мой кабинет</h2><div className="dashboard-stats"><div><b>{applications.length}</b><span>откликов</span></div><div><b>{applications.filter(a=>a.status==='Accepted').length}</b><span>принято</span></div><div><b>{applications.filter(a=>a.status==='Pending').length}</b><span>на рассмотрении</span></div></div><h2 className="spaced">Мои отклики</h2>{applications.length === 0 ? <p className="muted">Вы пока никуда не откликнулись.</p> : <div className="list">{applications.map(a => <article className="opportunity" key={a.id}><div><h3>{a.title}</h3><p>{a.school}</p><p className="muted">{a.message}</p></div><span className={'status status-'+a.status.toLowerCase()}>{a.status}</span></article>)}</div>}</section>;

  const schoolApps = applications.filter(a => opportunities.some(o => o.id === a.opportunityId));
  return <section className="page-section"><span className="eyebrow">School dashboard</span><h2>Кабинет школы</h2><div className="dashboard-stats"><div><b>{opportunities.length}</b><span>объявлений</span></div><div><b>{schoolApps.length}</b><span>откликов</span></div><div><b>{schoolApps.filter(a=>a.status==='Accepted').length}</b><span>принято</span></div></div>
    <h2 className="spaced">Создать запрос</h2>
    <form className="form-card wide" onSubmit={createOpportunity}>
      <input name="title" required placeholder="Название запроса, напр. Robotics lesson for Grade 8" />
      <div className="form-row"><input name="school" placeholder="Название школы" /><input name="city" required placeholder="Город" /></div>
      <div className="form-row"><input name="subject" required placeholder="Предмет" /><input name="grade" required placeholder="Класс" /></div>
      <div className="form-row"><select name="format"><option>Online</option><option>Offline</option><option>Hybrid</option></select><select name="language"><option>Қазақша</option><option>Русский</option><option>English</option></select></div>
      <div className="form-row"><input name="date" type="date" /><input name="duration" required placeholder="Длительность, напр. 60 мин" /></div>
      <div className="form-row"><input name="students" required type="number" placeholder="Количество учеников" /><input name="pay" required type="number" placeholder="Оплата, ₸" /></div>
      <textarea name="description" required rows="4" placeholder="Описание занятия" />
      <textarea name="requirements" required rows="3" placeholder="Требования к преподавателю" />
      <button className="primary">Опубликовать запрос</button>
    </form>
    <h2 className="spaced">Отклики преподавателей</h2>{schoolApps.length===0?<p className="muted">Пока откликов нет.</p>:<div className="list">{schoolApps.map(a=><article className="application-card" key={a.id}><div><h3>{a.teacherName}</h3><p><b>{a.title}</b></p><p className="muted">{a.message}</p></div><div className="application-actions"><span className={'status status-'+a.status.toLowerCase()}>{a.status}</span>{a.status==='Pending'&&<><button className="primary" onClick={()=>updateApplicationStatus(a.id,'Accepted')}>Принять</button><button className="secondary" onClick={()=>updateApplicationStatus(a.id,'Rejected')}>Отклонить</button></>}</div></article>)}</div>}
    <h2 className="spaced">Мои объявления</h2><div className="list">{opportunities.map(o => <article className="opportunity" key={o.id}><div><h3>{o.title}</h3><p>{o.city} · {o.format} · {o.subject}</p></div><div className="opp-side"><b>{o.pay.toLocaleString('ru-RU')} ₸</b><button className="secondary" onClick={()=>openOpportunity(o)}>Открыть</button></div></article>)}</div>
  </section>;
}

createRoot(document.getElementById('root')).render(<App />);