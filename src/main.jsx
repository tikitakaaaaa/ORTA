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

const seedPrograms = [
  {
    id: 'arduino-smart-city',
    title: 'Arduino: Smart City',
    category: 'STEM / Robotics',
    grades: '8–9 классы',
    format: 'Online / Offline',
    duration: '1 мастер-класс или 12 занятий',
    city: 'Almaty + online',
    pilot: true,
    summary: 'Практическая программа: датчики, Arduino, прототипирование и командный Smart City проект.',
    schoolUse: 'Подходит как гостевой урок, STEM-неделя или серия практических занятий.',
    teacherIds: [1],
    schools: ['School №125', 'ORTA Demo School']
  },
  {
    id: 'english-speaking-club',
    title: 'English Speaking Club',
    category: 'Languages',
    grades: '7–11 классы',
    format: 'Online',
    duration: '60–75 мин',
    city: 'По Казахстану',
    pilot: true,
    summary: 'Интерактивный speaking club с дискуссиями, играми и тематическими заданиями.',
    schoolUse: 'Можно провести как разовый гостевой урок или регулярный клуб.',
    teacherIds: [2],
    schools: ['NIS Partner School']
  },
  {
    id: 'future-energy',
    title: 'Энергетика будущего',
    category: 'Physics / Engineering',
    grades: '9–11 классы',
    format: 'Online / Offline',
    duration: '90 мин',
    city: 'Kyzylorda + online',
    pilot: false,
    summary: 'Прикладной мастер-класс про энергетику, ВИЭ, накопители энергии и инженерные профессии.',
    schoolUse: 'Подходит для профориентации, физики и STEM-недели.',
    teacherIds: [3],
    schools: ['Regional STEM School']
  }
];

const seedOpportunities = [
  { id: 1, pilot: true, title: 'Robotics lesson for Grade 8', school: 'School №125', subject: 'Robotics', grade: '8 класс', format: 'Online', pay: 15000, city: 'Almaty', language: 'Русский', date: '2026-11-20', duration: '60 мин', students: 24, description: 'Практический вводный урок по Arduino и базовой робототехнике.', requirements: 'Опыт работы со школьниками, демонстрационный проект.', status: 'Open' },
  { id: 2, pilot: true, title: 'Guest English speaking club', school: 'NIS partner school', subject: 'English', grade: '9–10 класс', format: 'Online', pay: 20000, city: 'Astana', language: 'English', date: '2026-11-24', duration: '75 мин', students: 18, description: 'Гостевой speaking club с интерактивной дискуссией.', requirements: 'English C1+, опыт проведения speaking clubs.', status: 'Open' },
  { id: 3, pilot: false, title: 'Physics masterclass', school: 'Regional school', subject: 'Physics', grade: '10 класс', format: 'Offline', pay: 25000, city: 'Kyzylorda', language: 'Қазақша', date: '2026-11-28', duration: '90 мин', students: 30, description: 'Мастер-класс по прикладной физике и энергетике.', requirements: 'Опыт преподавания физики или инженерное образование.', status: 'Open' },
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
  verified: true,
  pilotCredits: 1,
  pilotLimit: 20000
};

const seedSchools = [
  { id: 's1', name: 'ORTA Demo School', city: 'Almaty', students: 620, programs: 4, verified: true, focus: ['STEM','Languages'] },
  { id: 's2', name: 'School №125', city: 'Almaty', students: 980, programs: 3, verified: true, focus: ['Robotics','STEM'] },
  { id: 's3', name: 'NIS Partner School', city: 'Astana', students: 760, programs: 2, verified: true, focus: ['Languages','Career'] },
  { id: 's4', name: 'Regional STEM School', city: 'Kyzylorda', students: 540, programs: 2, verified: true, focus: ['Physics','Engineering'] },
  { id: 's5', name: 'Pilot Rural School', city: 'Kyzylorda', students: 310, programs: 1, verified: false, focus: ['STEM'] },
  { id: 's6', name: 'Future Skills School', city: 'Shymkent', students: 690, programs: 2, verified: true, focus: ['AI','Languages'] }
];

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
  const [selectedProgram, setSelectedProgram] = useState(null);
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
  const openProgram = (program) => { setSelectedProgram(program); setPage('programDetail'); };
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
      status: 'Open',
      pilot: false
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
          <button onClick={() => setPage('programs')}>Уроки и программы</button>
          <button onClick={() => setPage('opportunities')}>Возможности</button>
          <button onClick={() => setPage('schoolsMap')}>Школы</button>
          <button onClick={() => setPage('about')}>О нас</button>
          <button onClick={() => setPage('partners')}>Партнёрам</button>
          {role !== 'guest' && <button onClick={() => setPage('dashboard')}>Dashboard</button>}
        </nav>
        <div className="auth-actions">
          {role === 'guest' ? <button className="primary" onClick={() => setPage('login')}>Демо-вход</button> : <button className="ghost" onClick={logout}>Выйти</button>}
        </div>
      </header>

      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'needs' && <NeedsMatcher setPage={setPage} openProgram={openProgram} />}
        {page === 'programs' && <Programs items={seedPrograms} openProgram={openProgram} />}
        {page === 'programDetail' && selectedProgram && <ProgramDetail program={selectedProgram} teachers={seedTeachers} openTeacher={openTeacher} setPage={setPage} />}
        {page === 'about' && <AboutRoadmap setPage={setPage} />}
        {page === 'partners' && <Partners setPage={setPage} />}
        {page === 'teachers' && <Teachers search={search} setSearch={setSearch} filters={teacherFilters} setFilters={setTeacherFilters} items={filteredTeachers} openTeacher={openTeacher} />}
        {page === 'teacherProfile' && selectedTeacher && <TeacherProfile teacher={selectedTeacher} setPage={setPage} />}
        {page === 'opportunities' && <Opportunities items={filteredOpps} filters={oppFilters} setFilters={setOppFilters} openOpportunity={openOpportunity} apply={apply} />}
        {page === 'opportunityDetail' && selectedOpportunity && <OpportunityDetail opp={selectedOpportunity} apply={apply} />}
        {page === 'schoolsMap' && <SchoolsMap schools={seedSchools} setPage={setPage} />}
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
              <button onClick={() => assistantGo('programs')}>Найти урок / программу</button>
              <button onClick={() => assistantGo('opportunities')}>Найти возможности</button>
              <button onClick={() => assistantGo('needs')}>Что нужно школе?</button>
              <button onClick={() => assistantGo('opportunities')}>STEM / гранты</button>
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
        <span className="eyebrow">Opportunity · Resource · Talent · Access</span>
        <h1>Возможности образования<br/>не должны зависеть от города.</h1>
        <p>ORTA — сеть образовательных ресурсов для школ. Мы соединяем школы с экспертами, готовыми программами, партнёрами, грантами и другими возможностями, которых может не быть внутри самой школы.</p>
        <div className="hero-actions">
          <button className="primary big" onClick={() => setPage('programs')}>Найти урок или программу</button>
          <button className="secondary big" onClick={() => setPage('needs')}>Что нужно вашей школе?</button>
        </div>
        <div className="school-only-note">Для государственных и частных школ · не сервис репетиторов</div>
      </div>
      <div className="hero-panel hero-network-panel">
        <div className="network-center">ORTA</div>
        <div className="network-node n1"><span>🏫</span><b>Школа</b></div>
        <div className="network-node n2"><span>👩‍🔬</span><b>Эксперт</b></div>
        <div className="network-node n3"><span>📚</span><b>Ресурс</b></div>
        <div className="network-node n4"><span>🏆</span><b>Возможность</b></div>
      </div>
    </section>

    <section className="orta-pillars">
      <div className="pillar-heading">
        <span className="eyebrow">What ORTA means</span>
        <h2>Не просто люди. Вся образовательная экосистема.</h2>
      </div>
      <div className="pillar-grid">
        {[
          ['O','Opportunity','Гранты, форумы, конкурсы, программы компаний','opportunities'],
          ['R','Resource','Готовые уроки, материалы, оборудование и программы','programs'],
          ['T','Talent','Преподаватели, инженеры, эксперты и студенты','programs'],
          ['A','Access','Доступ к этим ресурсам для любой школы и региона','opportunities']
        ].map(([letter,title,desc,target]) => <button className="pillar-card" key={letter} onClick={() => setPage(target)}>
          <span className="pillar-letter">{letter}</span>
          <div><b>{title}</b><p>{desc}</p></div>
          <span className="pillar-arrow">→</span>
        </button>)}
      </div>
    </section>

    <section className="school-needs">
      <div className="section-kicker">
        <span className="eyebrow">School first</span>
        <h2>Что нужно вашей школе?</h2>
      </div>
      <div className="needs-grid">
        {[
          ['👨‍🏫','Найти урок с экспертом','Гостевой урок, лекция или мастер-класс','programs'],
          ['🔬','Провести STEM-урок','Робототехника, физика, инженерия','programs'],
          ['🏫','Найти школу-партнёра','Совместные уроки и обмен опытом','schoolsMap'],
          ['🎓','Найти программу','Курсы и инициативы компаний','programs'],
          ['🏆','Грант / конкурс / форум','Внешние образовательные возможности','opportunities'],
          ['📚','Получить материалы','Готовые уроки и методические ресурсы','programs']
        ].map(([icon,title,desc,target]) => <button className="need-card" key={title} onClick={() => setPage(target)}>
          <span className="need-icon">{icon}</span>
          <div><b>{title}</b><p>{desc}</p></div>
        </button>)}
      </div>
    </section>

    <section className="pilot-section">
      <div className="pilot-card-home">
        <div className="pilot-badge-large">ORTA PILOT</div>
        <div className="pilot-copy">
          <span className="eyebrow">Try before scaling</span>
          <h2>Первый образовательный опыт для школы — бесплатно</h2>
          <p>Подтверждённая школа получает 1 Pilot Credit и может использовать его на подходящий урок, мастер-класс или приглашённого эксперта стоимостью до 20 000 ₸.</p>
          <div className="pilot-steps">
            <span>1 кредит школе</span>
            <span>до 20 000 ₸</span>
            <span>без подписки</span>
          </div>
        </div>
        <button className="pilot-cta" onClick={() => setPage('opportunities')}>Выбрать Pilot-возможность →</button>
      </div>
    </section>

    <section className="how-it-works">
      <div className="section-kicker">
        <span className="eyebrow">Simple flow</span>
        <h2>От потребности школы — к решению</h2>
      </div>
      <div className="how-grid">
        {[
          ['01','Школа описывает потребность','Например: STEM-урок, эксперт, программа, материал или партнёр.'],
          ['02','ORTA собирает варианты','Подходящие люди, ресурсы и возможности появляются в одном месте.'],
          ['03','Школа выбирает решение','Связывается с партнёром и запускает нужную образовательную активность.']
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
        <div><b>School-first</b><small>Платформа строится вокруг потребностей школ</small></div>
      </div>
      <div className="trust-item">
        <span className="trust-icon">◇</span>
        <div><b>Разные типы ресурсов</b><small>Не только преподаватели, но и программы, материалы и партнёры</small></div>
      </div>
      <div className="trust-item">
        <span className="trust-icon">◎</span>
        <div><b>Доступ для регионов</b><small>Возможности вне зависимости от местоположения школы</small></div>
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

    <section className="impact-section">
      <div className="impact-copy">
        <span className="eyebrow">Impact</span>
        <h2>Наша цель — сократить разрыв в доступе к образовательным возможностям.</h2>
        <p>В пилоте мы будем измерять не количество профилей, а реальный доступ школ к новым урокам, программам, экспертам и партнёрам.</p>
      </div>
      <div className="impact-grid">
        <div><b>25</b><span>школ — цель пилота</span></div>
        <div><b>50</b><span>образовательных активностей</span></div>
        <div><b>1 000+</b><span>учеников — потенциальный охват</span></div>
      </div>
      <small className="impact-note">Целевые показатели пилота, не фактические результаты.</small>
    </section>

    <section className="roadmap-teaser">
      <div>
        <span className="eyebrow">Roadmap</span>
        <h2>Смотрите, как ORTA растёт — и что откроется школам дальше.</h2>
        <p>От интерактивного MVP и первого пилота до партнёрских программ и региональной сети.</p>
      </div>
      <button className="secondary big" onClick={() => setPage('about')}>Открыть путь ORTA →</button>
    </section>

    <section className="partner-cta-section">
      <div>
        <span className="eyebrow">For partners</span>
        <h2>Компания, университет или фонд может открыть возможности для школ.</h2>
        <p>Разместите программу, профинансируйте ORTA Pilot Credits, предложите эксперта, оборудование, экскурсию, конкурс или грант.</p>
      </div>
      <button className="primary big" onClick={() => setPage('partners')}>Разместить программу для школ</button>
    </section>

    <section className="school-testimonials">
      <div className="testimonial-heading">
        <div>
          <span className="eyebrow">School stories</span>
          <h2>Как школы могут использовать ORTA</h2>
        </div>
        <span className="demo-note">Демо-сценарии</span>
      </div>
      <div className="testimonial-grid">
        {[
          {school:'School №125',city:'Almaty',result:'Гостевой STEM-урок',text:'Школа находит инженера для практического занятия по робототехнике.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=School125&backgroundColor=e8f5f4'},
          {school:'Regional STEM School',city:'Kyzylorda',result:'Доступ к программе',text:'Региональная школа подключается к программе компании, которой нет локально.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=RegionalSTEM&backgroundColor=fff7df'},
          {school:'NIS Partner School',city:'Astana',result:'Совместный урок школ',text:'Две школы проводят общий онлайн-урок и обмениваются опытом.',logo:'https://api.dicebear.com/9.x/shapes/svg?seed=NISPartner&backgroundColor=edf4f7'}
        ].map(item => <article className="testimonial-card" key={item.school}>
          <div className="testimonial-school">
            <img src={item.logo} alt="" />
            <div><b>{item.school}</b><span>{item.city}</span></div>
          </div>
          <p>“{item.text}”</p>
          <strong>{item.result}</strong>
        </article>)}
      </div>
    </section>
  </>
}


function NeedsMatcher({ setPage, openProgram }) {
  const [need, setNeed] = useState('stem');

  const needs = [
    { id: 'stem', icon: '⚙️', title: 'Нужен STEM-урок', text: 'Робототехника, инженерия, физика, энергетика', programId: 'arduino-smart-city', action: 'Открыть STEM-программу' },
    { id: 'expert', icon: '🧑‍🏭', title: 'Нужен эксперт из индустрии', text: 'Гостевой урок, профориентация, инженер или специалист', target: 'programs', action: 'Посмотреть программы с экспертами' },
    { id: 'language', icon: '🌍', title: 'Хотим языковой обмен', text: 'Speaking club, совместный урок или международный формат', programId: 'english-speaking-club', action: 'Открыть языковую программу' },
    { id: 'partner', icon: '🏫', title: 'Ищем школу-партнёра', text: 'Совместный урок, обмен опытом или межрегиональный проект', target: 'schoolsMap', action: 'Перейти к школам' },
    { id: 'ai', icon: '🤖', title: 'Нужна программа по AI / Robotics', text: 'Практические занятия, цифровые навыки и проектная работа', programId: 'arduino-smart-city', action: 'Посмотреть подходящую программу' },
    { id: 'funding', icon: '🎁', title: 'Нужно финансирование', text: 'Pilot Credits, гранты, программы компаний и фондов', target: 'opportunities', action: 'Посмотреть возможности' },
    { id: 'materials', icon: '📦', title: 'Нужны материалы или оборудование', text: 'Наборы, лаборатории, методические ресурсы и партнёрская поддержка', target: 'partners', action: 'Найти партнёрские решения' }
  ];

  const current = needs.find(x => x.id === need) || needs[0];
  const matchedProgram = current.programId ? seedPrograms.find(p => p.id === current.programId) : null;

  const go = () => {
    if (matchedProgram) openProgram(matchedProgram);
    else setPage(current.target || 'programs');
  };

  return <section className="page-section needs-page">
    <div className="needs-hero">
      <span className="eyebrow">School needs navigator</span>
      <h2>Что нужно вашей школе?</h2>
      <p>Не ищите человека или отдельное объявление. Выберите потребность — ORTA покажет подходящий образовательный путь: программу, эксперта, школу-партнёра, финансирование или другую возможность.</p>
    </div>

    <div className="needs-layout">
      <div className="needs-grid">
        {needs.map(item => <button
          key={item.id}
          className={"need-card" + (need === item.id ? " active" : "")}
          onClick={() => setNeed(item.id)}
        >
          <span className="need-icon">{item.icon}</span>
          <b>{item.title}</b>
          <small>{item.text}</small>
        </button>)}
      </div>

      <aside className="needs-result">
        <span className="result-kicker">ORTA нашла направление</span>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
        <div className="solution-stack">
          {current.programId && <div><span>📚</span><p><b>Готовая программа</b><small>{matchedProgram?.title}</small></p></div>}
          {['stem','expert','language','ai'].includes(current.id) && <div><span>👩‍🔬</span><p><b>Эксперт</b><small>Подбирается внутри программы, а не как отдельный репетитор</small></p></div>}
          {['stem','language','partner','ai'].includes(current.id) && <div><span>🏫</span><p><b>Школьная сеть</b><small>Можно подключить школу-партнёра или совместный формат</small></p></div>}
          {['funding','stem','ai','materials'].includes(current.id) && <div><span>🎁</span><p><b>Финансирование</b><small>Pilot Credits, гранты или поддержка партнёров</small></p></div>}
        </div>
        <button className="primary big full" onClick={go}>{current.action}</button>
        <small className="needs-demo-note">Демо-механика MVP · позже ORTA сможет автоматически ранжировать решения по городу, классу, формату и доступному бюджету.</small>
      </aside>
    </div>
  </section>
}

function Programs({ items, openProgram }) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(p => `${p.title} ${p.category} ${p.grades} ${p.city}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="page-section">
    <div className="section-head">
      <div><span className="eyebrow">Learning catalog</span><h2>Уроки и программы</h2><p className="muted">Сначала выберите образовательный опыт. Эксперта и школу-партнёра вы увидите уже внутри.</p></div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="STEM, English, энергетика..." />
    </div>
    <div className="program-grid">
      {filtered.map(p => <article className="program-card" key={p.id}>
        <div className="program-top"><span className="program-category">{p.category}</span>{p.pilot && <span className="pilot-badge compact">ORTA Pilot</span>}</div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="program-meta"><span>{p.grades}</span><span>{p.format}</span><span>{p.duration}</span></div>
        <button className="primary" onClick={()=>openProgram(p)}>Открыть программу</button>
      </article>)}
    </div>
  </section>
}

function ProgramDetail({ program, teachers, openTeacher, setPage }) {
  const availableTeachers = teachers.filter(t => program.teacherIds.includes(t.id));
  return <section className="page-section">
    <div className="program-detail-hero">
      <div>
        <div className="opp-badges"><span className="program-category">{program.category}</span>{program.pilot && <span className="pilot-badge">🎁 ORTA Pilot</span>}</div>
        <h2>{program.title}</h2>
        <p>{program.summary}</p>
        <div className="program-meta large"><span>{program.grades}</span><span>{program.format}</span><span>{program.duration}</span><span>{program.city}</span></div>
      </div>
      <button className="primary big" onClick={()=>setPage('schoolsMap')}>Запросить для школы</button>
    </div>

    <div className="program-detail-grid">
      <div className="program-info-card"><h3>Что получает школа</h3><p>{program.schoolUse}</p></div>
      <div className="program-info-card"><h3>Школы / площадки</h3><div className="clean-list">{program.schools.map(s=><div key={s}>🏫 {s}</div>)}</div></div>
    </div>

    <h2 className="spaced">Кто может провести</h2>
    <div className="grid">
      {availableTeachers.map(t=><article className="card" key={t.id}>
        <img className="avatar avatar-photo" src={t.avatar} alt={t.name}/>
        <h3>{t.name}</h3>
        <p className="muted">{t.subject}</p>
        <p>★ {t.rating} · {t.experience}</p>
        <button className="secondary" onClick={()=>openTeacher(t)}>Профиль эксперта</button>
      </article>)}
    </div>
  </section>
}


function AboutRoadmap({ setPage }) {
  const [activeStep, setActiveStep] = useState(2);
  const milestones = [
    {
      status: 'done',
      label: 'Сделано',
      period: 'Этап 01',
      title: 'Концепция ORTA',
      metric: 'School-first',
      description: 'Сформировали модель платформы вокруг потребностей школ, а не поиска репетиторов.',
      benefit: 'Школа получает единый вход к урокам, программам, экспертам и возможностям.'
    },
    {
      status: 'done',
      label: 'Сделано',
      period: 'Этап 02',
      title: 'Интерактивный MVP',
      metric: 'Рабочий прототип',
      description: 'Собрали каталог программ, ORTA Pilot, карту возможностей, профили и партнёрский сценарий.',
      benefit: 'Школа уже может понять путь: выбрать программу → увидеть эксперта → попробовать Pilot.'
    },
    {
      status: 'now',
      label: 'Сейчас',
      period: 'Этап 03',
      title: 'Пилот со школами',
      metric: '25 школ',
      description: 'Интервью, первые реальные школы, тестирование уроков и сбор обратной связи.',
      benefit: 'Школы получают первые реальные занятия и влияют на то, каким станет ORTA.'
    },
    {
      status: 'goal',
      label: 'Цель',
      period: 'Этап 04',
      title: 'Партнёрские программы',
      metric: '100+ Pilot Credits',
      description: 'Подключение компаний, университетов и фондов, которые финансируют программы для школ.',
      benefit: 'Больше бесплатных уроков, экспертов, конкурсов, оборудования и образовательных программ.'
    },
    {
      status: 'goal',
      label: 'Цель',
      period: 'Этап 05',
      title: 'Региональная сеть',
      metric: '500 школ',
      description: 'Масштабирование ORTA по регионам Казахстана и развитие межшкольного обмена.',
      benefit: 'Школа получает доступ к возможностям вне зависимости от своего города.'
    },
    {
      status: 'vision',
      label: 'Видение',
      period: 'Этап 06',
      title: 'Национальная экосистема',
      metric: '2 000 школ',
      description: 'Сеть школ, партнёров и программ с измеримым образовательным impact по стране.',
      benefit: 'Один доступ к национальной сети уроков, экспертов, программ и партнёров.'
    }
  ];

  const current = milestones[activeStep];

  return <section className="page-section about-roadmap-page">
    <div className="about-roadmap-hero">
      <div>
        <span className="eyebrow">About ORTA</span>
        <h2>Путь ORTA</h2>
        <p>Мы показываем не только то, что уже сделали, но и куда идём дальше — и что каждый этап открывает для школ.</p>
      </div>
      <button className="secondary" onClick={() => setPage('programs')}>Посмотреть программы</button>
    </div>

    <div className="roadmap-legend">
      <span><i className="legend-dot done"></i> Сделано</span>
      <span><i className="legend-dot now"></i> Сейчас</span>
      <span><i className="legend-dot goal"></i> Цель</span>
      <span><i className="legend-dot vision"></i> Видение</span>
    </div>

    <div className="roadmap-track-wrap">
      <div className="roadmap-track">
        {milestones.map((m, i) => <button
          key={m.title}
          className={"roadmap-node " + m.status + (i === activeStep ? " active" : "")}
          onClick={() => setActiveStep(i)}
        >
          <span className="roadmap-orbit"></span>
          <span className="roadmap-dot"></span>
          <small>{m.period}</small>
          <b>{m.title}</b>
          <em>{m.metric}</em>
        </button>)}
      </div>
    </div>

    <div className={"roadmap-detail " + current.status}>
      <div className="roadmap-detail-main">
        <div className="roadmap-detail-top">
          <span className={"roadmap-status " + current.status}>{current.label}</span>
          <span>{current.period}</span>
        </div>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>
      <div className="roadmap-metric">
        <small>Ориентир этапа</small>
        <b>{current.metric}</b>
      </div>
      <div className="roadmap-benefit">
        <small>Что получает школа</small>
        <p>{current.benefit}</p>
      </div>
    </div>

    <div className="roadmap-disclaimer">
      <b>Важно:</b> этапы 04–06 — целевые ориентиры развития ORTA. Партнёрства и масштабы будут отмечаться как достигнутые только после фактической реализации.
    </div>
  </section>
}

function Partners({ setPage }) {
  return <section className="page-section partners-page">
    <div className="partners-hero">
      <span className="eyebrow">Partners</span>
      <h2>Откройте образовательные возможности для школ через ORTA</h2>
      <p>Компании, университеты и фонды могут размещать программы, давать экспертов, финансировать Pilot Credits, оборудование, экскурсии, конкурсы и гранты.</p>
    </div>
    <div className="partner-options-grid">
      {[
        ['100 Pilot Credits','Профинансировать первые уроки для школ'],
        ['Программа компании','Разместить серию уроков или образовательный курс'],
        ['Эксперты','Отправить инженеров, специалистов или менторов'],
        ['Грант / конкурс','Открыть набор заявок для школ'],
        ['Оборудование','Передать наборы, лаборатории или доступ к ресурсам'],
        ['Экскурсии','Пригласить школьников на предприятие или в университет']
      ].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}
    </div>
    <div className="partner-form-demo">
      <div><b>Демо-заявка партнёра</b><span>На MVP пока без отправки данных</span></div>
      <button className="primary" onClick={()=>setPage('home')}>Вернуться на главную</button>
    </div>
  </section>
}


function Teachers({ search, setSearch, filters, setFilters, items, openTeacher }) {
  return <section className="page-section">
    <div className="section-head"><div><span className="eyebrow">Talent network</span><h2>Эксперты и таланты</h2></div><input placeholder="Поиск: Robotics, Physics, Almaty..." value={search} onChange={e => setSearch(e.target.value)} /></div>
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
              <div className="opp-badges"><span className="status">{o.status}</span>{o.pilot && <span className="pilot-badge compact">Pilot</span>}</div>
              <b>{o.title}</b>
              <small>{o.school} · {o.city} · {o.format}</small>
              <strong>{o.pay.toLocaleString('ru-RU')} ₸</strong>
            </button>)}
          </div>
        </div>
      </div>
    ) : (
      <div className="list">{items.map(o => <article className="opportunity" key={o.id}>
        <div><div className="opp-badges"><span className="status">{o.status}</span>{o.pilot && <span className="pilot-badge">🎁 1-й урок бесплатно</span>}</div><h3>{o.title}</h3><p className="muted">{o.school} · {o.city} · {o.format}</p><p>{o.subject} · {o.grade} · {o.language}</p></div>
        <div className="opp-side"><b>{o.pay.toLocaleString('ru-RU')} ₸</b><button className="secondary" onClick={() => openOpportunity(o)}>Подробнее</button><button className="primary" onClick={() => apply(o)}>Откликнуться</button></div>
      </article>)}</div>
    )}
  </section>
}

function OpportunityDetail({ opp, apply }) {
  const [message, setMessage] = useState('Здравствуйте! Мне интересен ваш запрос. Готов обсудить формат занятия.');
  return <section className="page-section detail-page"><div><div className="opp-badges"><span className="status">{opp.status}</span>{opp.pilot && <span className="pilot-badge">🎁 ORTA Pilot · до 20 000 ₸</span>}</div><h2>{opp.title}</h2><p className="muted">{opp.school} · {opp.city}</p><div className="detail-grid"><div><b>Предмет</b><span>{opp.subject}</span></div><div><b>Класс</b><span>{opp.grade}</span></div><div><b>Формат</b><span>{opp.format}</span></div><div><b>Дата</b><span>{opp.date || 'По согласованию'}</span></div><div><b>Длительность</b><span>{opp.duration}</span></div><div><b>Учеников</b><span>{opp.students}</span></div><div><b>Язык</b><span>{opp.language}</span></div><div><b>Оплата</b><span>{opp.pay.toLocaleString('ru-RU')} ₸</span></div></div><h3>Описание</h3><p>{opp.description}</p><h3>Требования</h3><p>{opp.requirements}</p></div>
    <aside className="apply-card"><h3>Откликнуться</h3><textarea rows="6" value={message} onChange={e=>setMessage(e.target.value)} /><button className="primary full" onClick={() => apply(opp, message)}>Отправить отклик</button></aside></section>
}


function SchoolsMap({ schools, setPage }) {
  const [selectedCity, setSelectedCity] = useState('Все');
  const cityData = [
    { name: 'Astana', x: 54, y: 29 },
    { name: 'Almaty', x: 76, y: 72 },
    { name: 'Kyzylorda', x: 45, y: 69 },
    { name: 'Shymkent', x: 40, y: 82 }
  ];
  const visible = selectedCity === 'Все' ? schools : schools.filter(s => s.city === selectedCity);
  const totals = cityData.map(c => ({ ...c, count: schools.filter(s => s.city === c.name).length }));
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);

  return <section className="page-section schools-map-page">
    <div className="schools-map-hero">
      <div>
        <span className="eyebrow">ORTA School Network · Демо</span>
        <h2>Школьная сеть на карте Казахстана</h2>
        <p>Нажмите на город, чтобы увидеть школы в сети ORTA, их направления и доступные программы.</p>
      </div>
      <div className="school-network-stats">
        <div><b>{schools.length}</b><span>школ в демо-сети</span></div>
        <div><b>{cityData.filter(c => schools.some(s => s.city === c.name)).length}</b><span>городов</span></div>
        <div><b>{totalStudents.toLocaleString('ru-RU')}</b><span>учеников</span></div>
      </div>
    </div>

    <div className="school-map-layout">
      <div className="school-map-card">
        <div className="map-caption">
          <div><b>Карта школ ORTA</b><span>Выберите город на карте</span></div>
          {selectedCity !== 'Все' && <button onClick={() => setSelectedCity('Все')}>Показать все</button>}
        </div>
        <div className="kz-map school-network-map">
          <svg className="kz-shape" viewBox="0 0 800 470" aria-hidden="true">
            <path d="M87 188 L143 122 L246 94 L337 108 L405 77 L515 93 L570 139 L674 153 L710 216 L674 270 L601 292 L548 357 L455 371 L381 344 L305 365 L222 329 L153 310 L116 256 Z" />
          </svg>
          {totals.map(city => <button
            key={city.name}
            className={"school-map-pin" + (selectedCity === city.name ? " selected" : "")}
            style={{left: city.x + '%', top: city.y + '%'}}
            onClick={() => setSelectedCity(city.name)}
          >
            <span className="school-pin-count">{city.count}</span>
            <span className="school-pin-label">{city.name}</span>
          </button>)}
        </div>
      </div>

      <aside className="school-map-list">
        <div className="school-map-list-head">
          <div><b>{selectedCity === 'Все' ? 'Все школы' : selectedCity}</b><span>{visible.length} в сети</span></div>
        </div>
        <div className="school-list-scroll">
          {visible.map(s => <button className="school-network-card" key={s.id} onClick={() => s.id === 's1' && setPage('schoolProfile')}>
            <div className="school-network-card-top">
              <div><b>{s.name}</b><small>{s.city} · {s.students} учеников</small></div>
              {s.verified && <span className="verified-pill">✓ Проверено</span>}
            </div>
            <div className="tags">{s.focus.map(x => <span key={x}>{x}</span>)}</div>
            <div className="school-card-meta"><span>{s.programs} программ</span><span>{s.id === 's1' ? 'Открыть профиль →' : 'Демо-карточка'}</span></div>
          </button>)}
        </div>
      </aside>
    </div>

    <div className="school-map-note"><b>Демо-данные.</b> После подключения регистрации карта сможет автоматически показывать реальные школы, регионы и рост сети.</div>
  </section>
}

function SchoolProfile({ school, opportunities, openOpportunity }) {
  return <section className="page-section"><div className="school-head"><img className="school-avatar" src={school.image} alt={school.name} /><div><span className="eyebrow">School profile</span><h2>{school.name} {school.verified && <span className="verified">✓</span>}</h2><p>{school.city} · {school.students} учеников · {school.website}</p><p>{school.about}</p></div></div>
  <div className="pilot-wallet">
    <div><span className="pilot-wallet-icon">P</span><div><b>ORTA Pilot Credit</b><small>Пробный образовательный опыт для школы</small></div></div>
    <div className="pilot-balance"><b>{school.pilotCredits}</b><span>доступный кредит</span><small>до {school.pilotLimit.toLocaleString('ru-RU')} ₸</small></div>
  </div>
  <h2 className="spaced">Открытые запросы</h2><div className="list">{opportunities.slice(0,4).map(o=><article className="opportunity" key={o.id}><div><h3>{o.title}</h3><p className="muted">{o.city} · {o.format}</p></div><button className="secondary" onClick={()=>openOpportunity(o)}>Подробнее</button></article>)}</div></section>
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