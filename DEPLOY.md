# Инструкция по деплою на GitHub Pages

## Подготовка

1. **Убедитесь, что у вас установлен Node.js и npm**
   ```bash
   node --version
   npm --version
   ```

2. **Установите зависимости** (если еще не установлены)
   ```bash
   npm install
   ```

## Шаги для деплоя

### 1. Создайте репозиторий на GitHub

1. Перейдите на [GitHub](https://github.com) и создайте новый репозиторий
2. Назовите его `portfolio` (или другое имя, но тогда обновите `homepage` в `package.json`)
3. **НЕ** инициализируйте с README, .gitignore или лицензией

### 2. Инициализируйте Git в проекте (если еще не сделано)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Подключите удаленный репозиторий

```bash
git remote add origin https://github.com/ВАШ_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Замените `ВАШ_USERNAME` на ваш GitHub username!**

### 4. Обновите homepage в package.json (если нужно)

Если ваш репозиторий называется не `portfolio`, обновите поле `homepage` в `package.json`:
```json
"homepage": "https://ВАШ_USERNAME.github.io/НАЗВАНИЕ_РЕПОЗИТОРИЯ"
```

### 5. Задеплойте проект

```bash
npm run deploy
```

Эта команда:
- Создаст ветку `gh-pages` в вашем репозитории
- Загрузит все файлы из текущей директории на GitHub Pages
- Ваш сайт будет доступен по адресу: `https://ВАШ_USERNAME.github.io/portfolio`

### 6. Настройте GitHub Pages (если нужно)

1. Перейдите в Settings вашего репозитория на GitHub
2. В разделе "Pages" убедитесь, что:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`

## Обновление сайта

После любых изменений в проекте:

```bash
git add .
git commit -m "Описание изменений"
git push
npm run deploy
```

## Важные замечания

- ✅ Все пути в проекте исправлены на относительные для работы на GitHub Pages
- ✅ Создан файл `.nojekyll` для отключения обработки Jekyll
- ✅ Проект готов к деплою

## Проверка

После деплоя подождите 1-2 минуты и откройте ваш сайт:
`https://ВАШ_USERNAME.github.io/portfolio`

Если что-то не работает:
1. Проверьте, что все файлы загружены в ветку `gh-pages`
2. Убедитесь, что в настройках GitHub Pages выбрана правильная ветка
3. Проверьте консоль браузера на наличие ошибок загрузки ресурсов

