import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', count: 0, countText: ''},
    {code: 2, title: 'Некий объект', count: 0, countText: ''},
    {code: 3, title: 'Заголовок', count: 0, countText:''},
    {code: 4, title: 'Очень длинное название элемента из семи слов', count: 0, countText: ''},
    {code: 5, title: 'Запись', count: 0, countText: ''},
    {code: 6, title: 'Шестая запись', count: 0, countText: ''},
    {code: 7, title: 'Седьмая запись', count: 0, countText: ''},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
