import type { $Fetch } from 'ofetch'

export const UseTableShare = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }
  const translationMap = {
    // Основные поля
    day: 'День недели',
    dishes: 'Питание',
    exercise: 'Тренировка',

    // Приёмы пищи
    breakfast: 'Завтрак',
    lunch: 'Обед',
    dinner: 'Ужин',

    // Поля блюд
    name: 'Название',
    gram: 'Вес (г)',

    // Поля упражнений
    approaches: 'Подходы',
    repetitions: 'Повторения'
  }

  function downloadPlan(planObject, fileName = 'План без названия') {
    const filename = fileName + '.html'
    const content = getHtmlFromObject(planObject)
    console.log(content)
    const htmlContent = `<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title>Downloaded File</title>
		</head>
		<body>
		${content}
		</body>
		</html>`

    // Создаем Blob с HTML содержимым
    const blob = new Blob([htmlContent], { type: 'text/html' })

    // Создаем объект URL для Blob
    const url = URL.createObjectURL(blob)

    // Используем API navigator для скачивания
    if (navigator.msSaveBlob) {
      // Для IE
      navigator.msSaveBlob(blob, filename)
    } else {
      // Для современных браузеров
      const link = document.createElement('a')
      link.href = url
      link.download = filename

      // Создаем и инициируем событие клика
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })

      link.dispatchEvent(event)
    }

    // Освобождаем память через таймер
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
  }

  function getHtmlFromObject(data) {
    return generateTable(data)
  }

  function generateTable(data) {
    try {
      return createTable(data, 0)
    } catch (error) {
      console.error('Ошибка генерации таблицы:', error)
      return `<div style="color: red;">Ошибка: ${error.message}</div>`
    }
  }

  function translateKey(key) {
    return translationMap[key] || key
  }

  function createTable(data, depth) {
    if (!Array.isArray(data)) {
      return createValueDisplay(data, depth)
    }

    if (data.length === 0) {
      return '<span class="empty-value">Пустой массив</span>'
    }

    const borderWidth = Math.min(5, 1 + depth * 0.8)
    const borderColor = `rgb(${Math.min(200, 50 + depth * 30)}, ${Math.min(200, 100 + depth * 20)}, ${Math.min(200, 150 + depth * 10)})`

    let table = `<table style="border: ${borderWidth}px solid ${borderColor}">`

    // Заголовки
    if (
      data.length > 0 &&
      typeof data[0] === 'object' &&
      !Array.isArray(data[0])
    ) {
      table += '<tr>'
      Object.keys(data[0]).forEach((key) => {
        let headerClass = ''
        if (key === 'day') headerClass = 'day-header'
        else if (key === 'dishes') headerClass = 'meal-header'
        else if (key === 'exercise') headerClass = 'exercise-header'

        table += `<th class="${headerClass}">${translateKey(key)}</th>`
      })
      table += '</tr>'
    }

    // Данные
    data.forEach((item) => {
      table += '<tr>'

      if (typeof item === 'object' && !Array.isArray(item)) {
        Object.values(item).forEach((value) => {
          table += `<td>${createValueDisplay(value, depth + 1)}</td>`
        })
      } else {
        table += `<td>${createValueDisplay(item, depth + 1)}</td>`
      }

      table += '</tr>'
    })

    table += '</table>'
    return table
  }

  function createValueDisplay(value, depth) {
    if (value === null) return '<span class="empty-value">null</span>'
    if (value === undefined)
      return '<span class="empty-value">не указано</span>'

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0)
          return '<span class="empty-value">Пустой массив</span>'
        if (value.some((v) => typeof v === 'object')) {
          return createTable(value, depth)
        } else {
          return `<ul>${value.map((v) => `<li>${v}</li>`).join('')}</ul>`
        }
      } else {
        if (Object.keys(value).length === 0)
          return '<span class="empty-value">Пустой объект</span>'
        return createTable([value], depth)
      }
    }

    if (typeof value === 'boolean') return value ? 'Да' : 'Нет'
    return value.toString()
  }
  return { downloadPlan }
}
