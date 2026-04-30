# Junior 1C Developer Portfolio

Современный двуязычный сайт-портфолио для начинающего 1C-разработчика. Проект показывает развитие в сторону 1С:Предприятие 8.3, бизнес-логики, учета, SQL и автоматизации малого бизнеса.

## Стек

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Pages

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

В проекте уже есть workflow: `.github/workflows/deploy.yml`.

1. Залейте проект в репозиторий GitHub.
2. Откройте `Settings -> Pages`.
3. В разделе `Build and deployment` выберите `GitHub Actions`.
4. Сделайте push в ветку `main`.
5. GitHub Actions соберет проект и опубликует папку `dist`.

Если репозиторий называется не `portfolio`, поменяйте base path в `.github/workflows/deploy.yml`:

```yml
VITE_BASE_PATH: /portfolio/
```

Например, если репозиторий называется `max-1c-portfolio`, укажите:

```yml
VITE_BASE_PATH: /max-1c-portfolio/
```

Для локальной разработки менять `vite.config.ts` не нужно. Там используется:

```ts
base: process.env.VITE_BASE_PATH ?? "/"
```

## Где менять тексты

Основные RU/EN тексты лежат в:

- `src/data/content.ts`
- `src/data/site.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/learning.ts`
- `src/data/roadmap.ts`

Язык переключается через RU / EN в header. Выбранный язык сохраняется в `localStorage`.

## Где менять проекты

Проекты редактируются в `src/data/projects.ts`.

Чтобы добавить новый проект:

1. Скопируйте один объект внутри массива `projects`.
2. Измените `title`, `description`, `stack`, `highlights`.
3. Добавьте ссылку на репозиторий в `githubUrl`.
4. При необходимости поменяйте `detailsUrl`.

## Где заменить фото

Сейчас используется placeholder:

```txt
public/profile-placeholder.svg
```

Можно положить реальное фото в `public`, например:

```txt
public/profile.jpg
```

После этого замените путь в `src/sections/Hero.tsx`:

```tsx
src={`${import.meta.env.BASE_URL}profile.jpg`}
```

## Где заменить резюме PDF

Сейчас есть файл-заглушка:

```txt
public/resume.pdf
```

Перед публикацией замените его на реальное PDF-резюме с тем же именем. Кнопка в секции Resume уже ведет на `/resume.pdf`.

## Где поменять контакты

Контакты лежат в `src/data/site.ts`:

```ts
export const contactLinks = {
  telegram: "https://t.me/your_telegram",
  email: "your.email@example.com",
  github: "https://github.com/MAx-ICTU",
};
```

Замените Telegram и Email на реальные данные. GitHub уже ведет на `https://github.com/MAx-ICTU`.

## Форма обратной связи

Сайт статический, поэтому форма работает через `mailto:` и открывает почтовый клиент пользователя. В будущем сюда можно подключить Formspree, EmailJS или собственный backend.

## Место под будущие референсы и 3D

Сейчас декоративная сцена сделана легкой CSS-композицией в `src/components/DecorativeScene.tsx`. Она не грузит WebGL и не мешает производительности.

Если позже нужен 3D-блок, его удобно добавить отдельным компонентом, например:

```txt
src/components/ThreeScene.tsx
```

и подключить в `Hero.tsx` вместо или рядом с `DecorativeScene`.
