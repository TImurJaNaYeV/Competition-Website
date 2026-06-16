export const translations = {
  en: {
    nav: {
      brand:       'BEF Championship',
      home:        'Home',
      register:    'Register',
      signIn:      'Sign In',
      myAccount:   'My Account',
      myDashboard: 'My Dashboard',
      signOut:     'Sign Out',
    },
    hero: {
      // taglinePart1 is white, taglinePart2 is accent — keep as two strings
      taglinePart1: 'Where Ambition',
      taglinePart2: 'Meets Real Business',
      // descriptionPre + descriptionEnd are rendered separately so descriptionEnd
      // can be wrapped in whitespace-nowrap, preventing a break inside "2-4."
      descriptionPre:
        'An international case championship for high school students in grades 9-12 who want to explore Business Management, Economics, and Finance. Compete individually or in teams of ',
      descriptionEnd: '2-4.',
      registerCta: 'Register Now',
      learnMore:   'Learn More',
    },
    countdown: {
      label: 'Registration Opens In',
      subheading: 'First tour in',
      date:  'July 25, 2026',
    },
    about: {
      eyebrow: 'About',
      heading: 'What is the BEF Championship?',
      cards: [
        {
          title:       'Compete',
          description: 'Solve real business cases and go head to head with talented students from across the globe',
        },
        {
          title:       'Learn',
          description: 'Deepen your knowledge in Business Management, Economics, and Finance through challenging rounds',
        },
        {
          title:       'Win',
          description: 'Top teams and individuals earn awards, recognition, and opportunities to launch their future careers',
        },
      ],
    },
    details: {
      heading: 'Mark Your Calendar',
      items: [
        { label: 'Date',     value: 'August 15, 2025' },
        { label: 'Location', value: 'Almaty / Astana, Kazakhstan (TBC)' },
        { label: 'Prizes',   value: 'Awards for Best in Finance & Economics and Best in Business' },
      ],
    },
    gallery: {
      heading: 'Gallery',
    },
    contact: {
      eyebrow:      'Contact',
      heading:      'Get In Touch',
      emailDisplay: '[PLACEHOLDER@email.com]',
      instagram:    '@[PLACEHOLDER]',
    },
    footer: {
      copyright:
        '© 2025 Case Championship in Business, Economics & Finance. All rights reserved.',
    },
    register: {
      // Step labels
      step1Label:      'Step 1 of 2',
      step2Label:      'Step 2 of 2',
      createAccount:   'Create Account',
      personalDetails: 'Personal Details',

      // Email confirmation screen
      emailSentTitle: 'Check Your Email',
      emailSentPre:   'We sent a confirmation link to ',
      emailSentPost:
        '. Please confirm your email before continuing. Once confirmed, come back and sign in.',
      goToSignIn: 'Go to Sign In',

      // Step 1 — account fields
      emailLabel:                 'Email',
      emailPlaceholder:           'your@email.com',
      passwordLabel:              'Password',
      passwordPlaceholder:        'Min. 8 characters',
      confirmPasswordLabel:       'Confirm Password',
      confirmPasswordPlaceholder: 'Repeat your password',

      // Password strength labels
      strength: {
        weak:   'Weak',
        fair:   'Fair',
        good:   'Good',
        strong: 'Strong',
      },

      // Step 2 — personal detail fields
      firstNameLabel:        'First Name',
      firstNamePlaceholder:  'Your first name',
      lastNameLabel:         'Last Name',
      lastNamePlaceholder:   'Your last name',
      ageLabel:              'Age',
      agePlaceholder:        '13 – 19',
      gradeLabel:            'Grade',
      countryLabel:          'Country',
      countryPlaceholder:    'Your country',
      schoolNameLabel:       'School Name',
      schoolNamePlaceholder: 'Your school name',

      // Buttons
      ctaCreate:   'Create Account',
      ctaComplete: 'Complete Registration',

      // Payment notice card
      paymentTitle: 'Registration Fee',
      paymentBody:
        'A registration fee of [PLACEHOLDER AMOUNT] is required before August 15, 2025. ' +
        'Payment instructions will be sent to your email after registration. ' +
        'You can complete registration now and pay later.',

      // Inline error messages
      errors: {
        passwordTooShort: 'Password must be at least 8 characters.',
        passwordMismatch: 'Passwords do not match.',
        emailExists:      'An account with this email already exists.',
        ageRange:         'Age must be between 13 and 19.',
        fillRequired:     'Please fill in all required fields.',
        generic:          'Something went wrong. Please try again.',
      },
    },
    signIn: {
      eyebrow:        'Sign In',
      title:          'Welcome Back',
      emailLabel:     'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel:  'Password',
      passwordPlaceholder: 'Your password',
      forgotPassword: 'Forgot password?',
      cta:            'Sign In',
      noAccount:      "Don't have an account?",
      haveAccount:    'Already have an account?',
      registerLink:   'Register',
      errors: {
        invalidCredentials: 'Incorrect email or password.',
        emailNotConfirmed:  'Please confirm your email address before signing in.',
        generic:            'Something went wrong. Please try again.',
      },
    },
    qualifying: {
      welcome:        'Welcome,',
      welcomeSubtext: 'Here is your competition dashboard. Good luck!',
      round1Heading:  'Round 1: Online Examination',
      dateLabel:      'Date',
      dateValue:      'July 25, 2025',
      durationLabel:  'Duration',
      durationValue:  '1 hour',
      subjectsLabel:  'Subjects',
      subjectsValue:  'Business & Economics',
      formatLabel:    'Format',
      formatValue:    'Online',
      round1Desc:     'Complete the online examination individually. You will have 1 hour once you begin.',
      startExam:      'Start Examination',
      joinZoom:       'Join Zoom Meeting',
      examModal:      'The examination will be available on July 25, 2025. Check back then!',
      zoomModal:      'The Zoom link will be shared here on July 25, 2025.',
      closeModal:     'Close',
      finalsHeading:  'Finals',
      finalsDate:     'August 15, 2025 · Almaty / Astana, Kazakhstan',
      finalsDetails:  'More details coming soon.',
    },
  },

  ru: {
    nav: {
      brand:       'БЭФ Чемпионат',
      home:        'Главная',
      register:    'Регистрация',
      signIn:      'Войти',
      myAccount:   'Мой аккаунт',
      myDashboard: 'Мой кабинет',
      signOut:     'Выйти',
    },
    hero: {
      taglinePart1: 'Где амбиции',
      taglinePart2: 'встречают реальный бизнес',
      descriptionPre:
        'Международный кейс-чемпионат для старшеклассников 9–12 классов, желающих изучить управление бизнесом, экономику и финансы. Участвуйте индивидуально или в командах по ',
      descriptionEnd: '2–4 человека.',
      registerCta: 'Зарегистрироваться',
      learnMore:   'Узнать больше',
    },
    countdown: {
      label: 'Регистрация открывается через',
      subheading: 'Первый тур через',
      date:  '25 июля 2026',
    },
    about: {
      eyebrow: 'О чемпионате',
      heading: 'Что такое БЭФ Чемпионат?',
      cards: [
        {
          title:       'Соревнуйтесь',
          description: 'Решайте реальные бизнес-кейсы и соревнуйтесь с талантливыми участниками со всего мира',
        },
        {
          title:       'Учитесь',
          description: 'Углубляйте знания по управлению бизнесом, экономике и финансам через сложные и интересные туры',
        },
        {
          title:       'Побеждайте',
          description: 'Лучшие команды и участники получают награды, признание и возможности для карьерного старта',
        },
      ],
    },
    details: {
      heading: 'Отметьте в календаре',
      items: [
        { label: 'Дата',   value: '15 августа 2025' },
        { label: 'Место',  value: 'Алматы / Астана, Казахстан (уточняется)' },
        { label: 'Призы',  value: 'Награды за лучшее знание Финансов и Экономики, а также Бизнеса' },
      ],
    },
    gallery: {
      heading: 'Галерея',
    },
    contact: {
      eyebrow:      'Контакты',
      heading:      'Свяжитесь с нами',
      emailDisplay: '[PLACEHOLDER@email.com]',
      instagram:    '@[PLACEHOLDER]',
    },
    footer: {
      copyright:
        '© 2025 Кейс-чемпионат по Бизнесу, Экономике и Финансам. Все права защищены.',
    },
    register: {
      // Step labels
      step1Label:      'Шаг 1 из 2',
      step2Label:      'Шаг 2 из 2',
      createAccount:   'Создать аккаунт',
      personalDetails: 'Личные данные',

      // Email confirmation screen
      emailSentTitle: 'Проверьте почту',
      emailSentPre:   'Мы отправили ссылку для подтверждения на ',
      emailSentPost:
        '. Пожалуйста, подтвердите email перед продолжением. После подтверждения вернитесь и войдите в систему.',
      goToSignIn: 'Перейти к входу',

      // Step 1 — account fields
      emailLabel:                 'Электронная почта',
      emailPlaceholder:           'ваша@почта.com',
      passwordLabel:              'Пароль',
      passwordPlaceholder:        'Мин. 8 символов',
      confirmPasswordLabel:       'Подтвердите пароль',
      confirmPasswordPlaceholder: 'Повторите пароль',

      // Password strength labels
      strength: {
        weak:   'Слабый',
        fair:   'Средний',
        good:   'Хороший',
        strong: 'Надёжный',
      },

      // Step 2 — personal detail fields
      firstNameLabel:        'Имя',
      firstNamePlaceholder:  'Ваше имя',
      lastNameLabel:         'Фамилия',
      lastNamePlaceholder:   'Ваша фамилия',
      ageLabel:              'Возраст',
      agePlaceholder:        '13 – 19',
      gradeLabel:            'Класс',
      countryLabel:          'Страна',
      countryPlaceholder:    'Ваша страна',
      schoolNameLabel:       'Название школы',
      schoolNamePlaceholder: 'Ваша школа',

      // Buttons
      ctaCreate:   'Создать аккаунт',
      ctaComplete: 'Завершить регистрацию',

      // Payment notice card
      paymentTitle: 'Регистрационный взнос',
      paymentBody:
        'Регистрационный взнос в размере [PLACEHOLDER] необходимо оплатить до 15 августа 2025 года. ' +
        'Инструкции по оплате будут отправлены на вашу электронную почту после регистрации. ' +
        'Вы можете зарегистрироваться сейчас и оплатить позже.',

      // Inline error messages
      errors: {
        passwordTooShort: 'Пароль должен содержать не менее 8 символов.',
        passwordMismatch: 'Пароли не совпадают.',
        emailExists:      'Аккаунт с таким адресом уже существует.',
        ageRange:         'Возраст должен быть от 13 до 19 лет.',
        fillRequired:     'Пожалуйста, заполните все обязательные поля.',
        generic:          'Что-то пошло не так. Попробуйте ещё раз.',
      },
    },
    signIn: {
      eyebrow:          'Вход',
      title:            'С возвращением',
      emailLabel:       'Электронная почта',
      emailPlaceholder: 'ваша@почта.com',
      passwordLabel:    'Пароль',
      passwordPlaceholder: 'Ваш пароль',
      forgotPassword:   'Забыли пароль?',
      cta:              'Войти',
      noAccount:        'Нет аккаунта?',
      haveAccount:      'Уже есть аккаунт?',
      registerLink:     'Зарегистрироваться',
      errors: {
        invalidCredentials: 'Неверный email или пароль.',
        emailNotConfirmed:  'Пожалуйста, подтвердите ваш email перед входом.',
        generic:            'Что-то пошло не так. Попробуйте ещё раз.',
      },
    },
    qualifying: {
      welcome:        'Добро пожаловать,',
      welcomeSubtext: 'Здесь находится ваша панель участника. Удачи!',
      round1Heading:  'Round 1: Онлайн-экзамен',
      dateLabel:      'Дата',
      dateValue:      '25 июля 2025',
      durationLabel:  'Длительность',
      durationValue:  '1 час',
      subjectsLabel:  'Предметы',
      subjectsValue:  'Бизнес и Экономика',
      formatLabel:    'Формат',
      formatValue:    'Онлайн',
      round1Desc:     'Пройдите онлайн-экзамен индивидуально. У вас будет 1 час с момента начала.',
      startExam:      'Начать экзамен',
      joinZoom:       'Присоединиться к Zoom',
      examModal:      'Экзамен будет доступен 25 июля 2025 года. Загляните снова в этот день!',
      zoomModal:      'Ссылка на Zoom будет опубликована здесь 25 июля 2025 года.',
      closeModal:     'Закрыть',
      finalsHeading:  'Финал',
      finalsDate:     '15 августа 2025 · Алматы / Астана, Казахстан',
      finalsDetails:  'Подробности скоро появятся.',
    },
  },
};
