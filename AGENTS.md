# LexiGo — Проектная документация для AI-агентов

## 📋 Обзор проекта

**LexiGo** — современное веб-приложение для перевода текста с поддержкой голосового воспроизведения, историей переводов и настройками темы/голоса.

- **Версия**: 0.9.0
- **Тип**: Single Page Application (SPA)
- **Сборка**: Vite
- **Язык**: TypeScript 5.8

---

## 🛠 Технологический стек

### Основные технологии
| Категория | Технологии |
|-----------|------------|
| **Frontend** | React 19, TypeScript |
| **State Management** | Redux Toolkit, Redux Persist |
| **Роутинг** | React Router v7 |
| **UI библиотеки** | Material UI v7, Radix UI, Custom Components |
| **Стили** | SCSS, CSS Variables, modern-normalize |
| **API** | RTK Query (custom fetch) |
| **Сборка** | Vite 7 |
| **Linting** | ESLint 9, typescript-eslint |

### Ключевые зависимости
```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.2.0",
    "@mui/material": "^7.2.0",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-popover": "^1.1.14",
    "@reduxjs/toolkit": "^2.8.2",
    "classnames": "^2.5.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.6.3",
    "redux-persist": "^6.0.0",
    "sass": "^1.89.2"
  }
}
```

---

## 📁 Структура проекта

```
lexigo/
├── public/                          # Статические ресурсы
│   ├── icons/                       # Иконки интерфейса (copy, sound, theme)
│   ├── languages/                   # Флаги языков (eng.svg, ru.svg, de.svg, fran.svg)
│   ├── LexiGo*.svg                  # Логотипы
│   └── *.svg                        # UI элементы (arrows, play, stop)
│
├── src/
│   ├── app/                         # Точка входа приложения
│   │   ├── App.tsx                  # Корневой компонент
│   │   ├── main.tsx                 # Рендер приложения с провайдерами
│   │   └── styles/
│   │       └── index.css            # Глобальные стили, CSS-переменные тем
│   │
│   ├── core/                        # Ядро приложения (общая логика)
│   │   ├── hooks/                   # Переиспользуемые хуки
│   │   │   ├── useClickOutside.ts   # Клик вне элемента
│   │   │   ├── useDebounce.ts       # Дебаунс для запросов
│   │   │   ├── useLocalStorage.ts   # Работа с localStorage
│   │   │   └── useTheme.ts          # Управление темой
│   │   │
│   │   ├── providers/               # Контекст-провайдеры
│   │   │   └── themeProvider.tsx    # ThemeProvider (light/dark)
│   │   │
│   │   ├── router/                  # Настройка роутинга
│   │   │   ├── routeConfig.tsx      # Конфигурация маршрутов
│   │   │   └── router.tsx           # AppRouter с Suspense
│   │   │
│   │   ├── store/                   # Redux store
│   │   │   ├── api/
│   │   │   │   └── api.ts           # Базовый API (если есть)
│   │   │   ├── settingsSlice.ts     # Слайс настроек (тема, голос)
│   │   │   ├── someSlice.ts         # (резервный слайс)
│   │   │   └── store.ts             # Конфигурация store, persist, hooks
│   │   │
│   │   ├── utils/
│   │   │   └── utils.ts             # Утилитарные функции
│   │   │
│   │   └── lib/                     # Вспомогательные библиотеки
│   │
│   ├── modules/                     # Функциональные модули (feature-based)
│   │   ├── translation/             # Модуль перевода
│   │   │   ├── api/
│   │   │   │   └── service.ts       # RTK Query: useTranslateMutation
│   │   │   ├── components/
│   │   │   │   ├── TextAreaContent/ # Текстовое поле с выделением
│   │   │   │   ├── TextHighlighter/ # Подсветка текста
│   │   │   │   ├── TooltipMenuButtons/ # Кнопки меню в тултипе
│   │   │   │   ├── TranslationTooltip/ # Popover с переводом
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTranslation.ts    # Хук перевода с debounce
│   │   │   │   └── useCurrentTranslation.ts # Селектор текущего перевода
│   │   │   ├── store/
│   │   │   │   └── translationSlice.ts  # Слайс текущего перевода
│   │   │   └── types.ts
│   │   │
│   │   ├── languages/               # Модуль языков
│   │   │   ├── components/
│   │   │   │   ├── LanguageSelector/    # Выпадающий список языков
│   │   │   │   ├── LanguageSwitchContainer/ # Контейнер смены языков
│   │   │   │   └── index.ts
│   │   │   ├── constants/
│   │   │   │   └── languages.ts     # Список языков (EN, RU, DE, FR)
│   │   │   └── types.ts
│   │   │
│   │   ├── history/                 # Модуль истории переводов
│   │   │   ├── components/
│   │   │   │   └── HistoryList/     # Список истории
│   │   │   ├── hooks/
│   │   │   └── store/
│   │   │       └── historySlice.ts  # Слайс истории
│   │   │
│   │   └── settings/                # Модуль настроек
│   │       ├── components/
│   │       │   ├── OptionBar/       # Панель опций (тема, звук, копия)
│   │       │   └── SettingsDial/    # Настройки голоса
│   │       └── index.ts
│   │
│   ├── pages/                       # Страницы приложения
│   │   ├── layout/                  # Layout-компоненты
│   │   ├── main.tsx                 # Главная страница (TextAreaContent)
│   │   ├── translatePage.tsx        # Страница перевода
│   │   ├── main-page.scss           # Стили главной страницы
│   │   └── index.ts
│   │
│   ├── components/                  # Общие UI-компоненты
│   │   ├── buttons/
│   │   │   ├── Button.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ToggleButton.tsx
│   │   │   ├── TooltipMenuButton.tsx
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   │
│   │   ├── feedback/                # Компоненты обратной связи
│   │   ├── icons/                   # Иконки
│   │   ├── typography/
│   │   │   ├── TextContent.tsx
│   │   │   ├── Title.tsx
│   │   │   ├── TooltipTextArea/
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   └── vite-env.d.ts
│
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🏗 Архитектура приложения

### Архитектурный паттерн: Feature-Sliced Design (упрощённый)

Проект использует модульную архитектуру с разделением по функциональным признакам:

```
┌─────────────────────────────────────────────────────────┐
│                      App Layer                          │
│  (main.tsx: Provider, PersistGate, ThemeProvider, Router)│
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                      Pages Layer                        │
│  (Main, TranslatePage, HistoryList)                     │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                    Modules Layer                        │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │translation│ languages│ history  │ settings │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                 Shared/Core Layer                       │
│  (components/, core/, hooks/, utils/)                   │
└─────────────────────────────────────────────────────────┘
```

### Поток данных

```
User Action → Component → Hook → RTK Query Mutation → API
                                      ↓
                              Redux Store (slice)
                                      ↓
                              Component (useSelector)
                                      ↓
                                      UI Update
```

---

## 📦 State Management

### Redux Store структура

```typescript
interface RootState {
  api: ReturnType<typeof api.reducer>;        // RTK Query cache
  settings: {                                   // Персистентные настройки
    autoPlayVoice: boolean;
    gender: 'FEMALE' | 'MALE' | 'NEUTRAL';
  };
  currentTranslation: {                         // Текущий перевод
    current: {
      original: string;
      from: string;
      to: string;
      gender: 'FEMALE' | 'MALE' | 'NEUTRAL';
      translated?: string;
      audio?: string;
      loading: boolean;
      error?: string;
      ts: number;
    } | null;
  };
  history: {                                    // История переводов
    historyItems: Array<CurrentTranslation>;
  };
}
```

### Слайсы

#### 1. `settingsSlice` (core/store/)
- **Назначение**: Глобальные настройки приложения
- **Persist**: ✅ (redux-persist)
- **Actions**: `toggleAutoPlay`, `setGender`

#### 2. `translationSlice` (modules/translation/store/)
- **Назначение**: Состояние текущего перевода
- **Persist**: ❌ (временные данные)
- **Reducers**: Через `extraReducers` (matcher на RTK Query)

#### 3. `historySlice` (modules/history/store/)
- **Назначение**: История переводов
- **Persist**: ✅ (через корневой persistConfig)
- **Actions**: `addHistoryItem`, `clearHistory`

---

## 🌐 API Integration

### Сервис перевода

**Endpoint**: `https://api.keramis.com.ua/hackathon/translate/`

```typescript
interface TranslateRequest {
  text: string;
  target?: string;      // 'ru' | 'en' | 'de' | 'fr'
  source?: string;      // '' → auto-detect
  speak?: boolean;      // true → audioContent в ответе
  gender?: "FEMALE" | "MALE" | "NEUTRAL";
}

interface TranslateResponse {
  translatedText: string;
  detectedSourceLanguage?: string;
  audioContent?: string;  // base64 MP3
}
```

### RTK Query конфигурация

```typescript
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    fetchFn: async (input, init) => {
      // Кастомная сериализация body в JSON
      if (init?.body && typeof init.body !== 'string') {
        init.body = JSON.stringify(init.body);
      }
      return fetch(input, init);
    },
  }),
  endpoints: (builder) => ({
    translate: builder.mutation<TranslateResponse, TranslateRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: { target: 'ru', ...body },
      }),
    }),
  }),
});
```

---

## 🎨 Стилевая система

### CSS-переменные (темизация)

```css
:root {
  /* Цвета */
  --accent: #ec5185;
  --alt-accent: #fc684f;
  --text-dark: #091342;
  --text-light: #f5f5f5;
  --bg-light: #f5f5f5;
  --bg-dark: #091342;
  
  /* Полупрозрачные фоны */
  --bg-transparent: rgba(220, 235, 245, 0.1);
  --bg-text-area-light: rgba(161, 193, 194, 0.2);
  
  /* Тени */
  --shadow-sm: 3px 10px 10px 0px rgb(45 50 56 / 8%);
  --shadow-lg: 0px 11px 20px 0px rgb(43 50 56 / 14%);
}

[data-theme="dark"] {
  /* Инверсия цветов для тёмной темы */
  --text-dark: #f5f5f5;
  --text-light: #091342;
  /* ... */
}
```

### Подход к стилям
- **SCSS** для компонентных стилей
- **CSS Variables** для темизации
- **modern-normalize** для сброса стилей
- **Глобальный transition** для плавной смены темы

---

## 🧩 Ключевые компоненты

### 1. `TextAreaContent` (modules/translation/components/)
**Назначение**: Основное текстовое поле с выделением текста

**Функционал**:
- Отображение текста
- Выделение текста пользователем
- Показ tooltip при выделении
- Координаты позиционирования tooltip

**Хуки**: `useTranslate`, `useClickOutside`, `useAppSelector`

---

### 2. `Tooltip` (modules/translation/components/TranslationTooltip/)
**Назначение**: Popover с интерфейсом перевода

**Структура**:
```tsx
<Popover.Root>
  <Popover.Trigger> → кнопка-сердечко
  <Popover.Content>
    <TooltipMenuButtons />      ← навигация
    <LanguageSwitchContainer /> ← выбор языков
    <TooltipTextArea />         ← поле перевода
    <OptionsBar />              ← настройки
    <Outlet />                  ← роутинг
  </Popover.Content>
</Popover.Root>
```

---

### 3. `LanguageSwitchContainer` (modules/languages/components/)
**Назначение**: Контейнер выбора языков перевода

**Функционал**:
- Выбор исходного языка
- Выбор целевого языка
- Кнопка смены языков местами
- Авто-перевод при смене языка

---

### 4. `OptionsBar` (modules/settings/components/OptionBar/)
**Назначение**: Панель быстрых настроек

**Кнопки**:
- Копировать текст
- Сменить тему (light/dark)
- Воспроизвести аудио
- SettingsDial (настройки голоса)

---

### 5. `HistoryList` (modules/history/components/)
**Назначение**: Отображение истории переводов

**Функционал**:
- Список карточек с переводами
- Дата и время перевода
- Кнопка воспроизведения аудио
- Очистка истории

---

## 🔌 Хуки

### `useTranslate(autoPlayVoice: boolean)`
```typescript
// modules/translation/hooks/useTranslation.ts
Returns: {
  translate: (payload: TranslateRequest) => void;  // debounced
  data: TranslateResponse | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
}
```

**Особенности**:
- Debounce 300ms
- Авто-воспроизведение аудио при `autoPlayVoice && isSuccess`

---

### `useCurrentTranslation()`
```typescript
// modules/translation/hooks/useCurrentTranslation.ts
Returns: CurrentTranslation | null
```

**Назначение**: Селектор текущего перевода из store

---

### `useClickOutside(refs, callback, enabled)`
```typescript
// core/hooks/useClickOutside.ts
```

**Назначение**: Закрытие tooltip при клике вне области

---

### `useDebounce(fn, delay)`
```typescript
// core/hooks/useDebounce.ts
```

**Назначение**: Debounce для API запросов

---

## 🛣 Роутинг

### Конфигурация маршрутов

```typescript
enum AppRoutes {
  MAIN = "main",
  TRANSLATION = "translation",
  HISTORY = "history",
  NOT_FOUND = "not-found",
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "translate",
  [AppRoutes.TRANSLATION]: "text_translation",
  [AppRoutes.HISTORY]: "history",
  [AppRoutes.NOT_FOUND]: "*",
};
```

### Структура роутера

```tsx
<Routes>
  <Route path="/" element={<Main />}>
    <Route path="translate" element={<TranslatePage />} />
    <Route path="text_translation" element="" />
    <Route path="history" element={<HistoryList />} />
    <Route path="*" element="" />
  </Route>
</Routes>
```

**Особенности**:
- Вложенные роуты внутри `<Main />`
- `<Outlet />` в Tooltip для отображения контента роута
- Suspense с fallback "загрузка"

---

## ⚙️ Настройки приложения

### Settings Slice

```typescript
interface SettingsState {
  autoPlayVoice: boolean;   // Авто-воспроизведение после перевода
  gender: 'FEMALE' | 'MALE' | 'NEUTRAL';  // Голос для синтеза речи
}
```

### Theme Provider

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Логика**:
1. Проверка `localStorage.getItem('theme')`
2. Fallback на системную тему (`prefers-color-scheme`)
3. Сохранение в localStorage и data-theme атрибут

---

## 📝 Поддерживаемые языки

```typescript
const LANGUAGES: Language[] = [
  { id: "EN", title: "Английский", img: "/languages/eng.svg" },
  { id: "RU", title: "Русский", img: "/languages/ru.svg" },
  { id: "DE", title: "Немецкий", img: "/languages/de.svg" },
  { id: "FR", title: "Французский", img: "/languages/fran.svg" },
];
```

---

## 🚀 Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка production
npm run build

# Линтинг
npm run lint

# Preview production сборки
npm run preview
```

---

## 🎯 Основные пользовательские сценарии

### 1. Перевод выделенного текста
1. Пользователь выделяет текст в `TextAreaContent`
2. Появляется tooltip с кнопкой-сердечком
3. Клик по кнопке → перевод текста
4. Отображение результата в `TooltipTextArea`
5. Опционально: авто-воспроизведение аудио

### 2. Смена направления перевода
1. Клик по кнопке swap (стрелка)
2. Обмен `source` ↔ `target` языков
3. Повторный перевод с новыми параметрами

### 3. Просмотр истории
1. Навигация в раздел "История"
2. Отображение списка карточек
3. Клик по 🔊 → воспроизведение аудио

### 4. Смена темы
1. Клик по кнопке темы в `OptionsBar`
2. Вызов `toggleTheme()`
3. Обновление `data-theme` атрибута
4. CSS-переменные применяются автоматически

---

## 🔐 Безопасность и ограничения

- API не требует аутентификации
- Все данные хранятся в localStorage (redux-persist)
- Нет серверной валидации (только клиентская)
- CORS обрабатывается браузером

---

## 🐛 Известные особенности

1. **RTK Query serializableCheck**: отключён (`serializableCheck: false`)
2. **Audio playback**: используется `data:audio/mp3;base64,` URL
3. **Debounced перевод**: 300ms задержка перед запросом
4. **Дубликаты в истории**: блокируются через `isDuplicate` проверку

---

## 📚 Словарь терминов

| Термин | Описание |
|--------|----------|
| **Current Translation** | Последний выполненный перевод (оригинал + результат) |
| **History Item** | Элемент истории (сохранённый перевод) |
| **Tooltip** | Popover-окно с интерфейсом перевода |
| **OptionsBar** | Панель кнопок (копия, тема, звук) |
| **SettingsDial** | Компонент настройки голоса |
| **LanguageSelector** | Выпадающий список выбора языка |

---

## 🎨 Дизайн-система

### Цветовая палитра
- **Accent**: `#ec5185` (розовый)
- **Alt Accent**: `#fc684f` (оранжевый)
- **Text Dark**: `#091342` (тёмно-синий)
- **Text Light**: `#f5f5f5` (белый)

### Формы
- **Border Radius**: `5rem 2rem 5rem 2rem` (асимметричный)
- **Shadows**: многослойные с rgba

### Анимации
- **Transition**: `0.3s ease` для background-color, color, border-color

---

## 📦 Сборка и деплой

### Vite конфигурация
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
  },
});
```

### TypeScript конфигурация
- **Project References**: `tsconfig.app.json`, `tsconfig.node.json`
- **Target**: ES2020
- **Module**: ESNext

---

## 🧪 Тестирование

На момент версии 0.9.0 тесты не настроены. Рекомендуется добавить:
- Unit-тесты для хуков (Vitest + React Testing Library)
- Integration-тесты для компонентов
- E2E-тесты (Playwright/Cypress)

---

## 📈 Планы развития

1. **Расширение языков**: добавить больше языковых пар
2. **Избранное**: сохранение любимых переводов
3. **Оффлайн режим**: Service Worker + IndexedDB
4. **PWA**: установка как приложение
5. **Доступность**: ARIA-атрибуты, keyboard navigation

---

## 📞 Контакты и ресурсы

- **API документация**: https://api.keramis.com.ua/hackathon/translate/
- **Исходный код**: локальный репозиторий git

---

*Документация актуальна для версии 0.9.0. Последнее обновление: март 2026*
