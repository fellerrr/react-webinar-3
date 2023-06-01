/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование списка категорий
 * @returns {Array}
 */
// function flattenArray(arr) {
//   let flattened = [];
//   for (const obj of arr) {
//     const { children, ...rest } = obj;
//     flattened.push(rest);
//     if (children && children.length > 0) {
//       flattened = flattened.concat(flattenArray(children));
//     }
//   }
//   return flattened;
// }
// export function formatCategory(arr) {
//   const hash = {};
//   const result = [];
//
//   for (const obj of arr) {
//     hash[obj._id] = obj;
//     obj.children = [];
//   }
//
//   for (const obj of arr) {
//     if (obj.parent) {
//       hash[obj.parent._id].children.push(obj);
//     } else {
//       result.push(obj);
//     }
//   }
//
//   const traverse = (obj, level) => {
//     obj.title = "- ".repeat(level) + obj.title;
//     for (const child of obj.children) {
//       traverse(child, level + 1);
//     }
//   }
//
//   for (const obj of result) {
//     traverse(obj, 0);
//   }
//
//   return flattenArray(result);
// }

function flattenCategoryArray(categories) {
  let flattened = [];

  for (const category of categories) {
    const { children, ...rest } = category;
    flattened.push(rest);
    if (children && children.length > 0) {
      flattened = flattened.concat(flattenCategoryArray(children));
    }}

  return flattened;
}

export function formatCategories(categories) {
  const categoryMap = {};
  const formattedCategories = [];

  for (const category of categories) {
    categoryMap[category._id] = category;
    category.children = [];
  }

  for (const category of categories) {
    if (category.parent) {
      categoryMap[category.parent._id].children.push(category);
    } else {
      formattedCategories.push(category);
    }
  }

  const traverseCategories = (category, level) => {
    category.title = "- ".repeat(level) + category.title;
    for (const child of category.children) {
      traverseCategories(child, level + 1);
    }
  }

  for (const category of formattedCategories) {
    traverseCategories(category, 0);
  }

  return flattenCategoryArray(formattedCategories);
}