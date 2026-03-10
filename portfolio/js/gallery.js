import { projects } from './storage.js';

window.toggleSlider = toggleSlider;

function project(projects, width) {
  return `<a href="https://github.com/Bubenture/${projects}" class="slider" target="_blank"><img src="https://raw.githubusercontent.com/Bubenture/${projects}/master/README/${projects}.webp" style="width: ${width}vw;" alt="${projects}"  class="sliderImg" loading="lazy"></a>`
}

const contacts = `
    <a href="https://github.com/Bubenture" class="contact" target="_blank">Github</a>
    <a href="https://t.me/bubenture" class="contact" target="_blank">Telegram</a>
    <a href="mailto:bubenture@gmail.com" class="contact" target="_blank">bubenture@gmail.com</a>`

const contactsSlider = `<div class="slider contacts">` + contacts + `</div>`

function renderDesktop() {
  const width = window.innerWidth
  const height = window.innerHeight
  const desktop = document.querySelector('.desktop')
  desktop.innerHTML = ''

  if (width <= height) {
    document.documentElement.style.setProperty('--scale', '1')
    const swiper = document.createElement('div')
    swiper.className = 'swiper'
    swiper.innerHTML =
      contactsSlider +
      Array.from(
        { length: projects.length },
        (_, i) => project(projects[i], 70)
      ).join('')
    desktop.appendChild(swiper)
  } else {
    document.documentElement.style.setProperty('--scale', '1.2')
    const totalImages = projects.length
    const imagesPerSlider = Math.ceil(totalImages / 3)

    for (let i = 0; i < 3; i++) {
      const swiper = document.createElement('div')
      swiper.className = 'swiper'

      const startIndex = i * imagesPerSlider
      const endIndex = Math.min(startIndex + imagesPerSlider, totalImages)
      let imagesHTML = ''
      if (i === 1) {
        imagesHTML += contactsSlider
      }
      for (let j = startIndex; j < endIndex; j++) {
        imagesHTML += project(projects[j], 30)
      }

      swiper.innerHTML = imagesHTML
      desktop.appendChild(swiper)
    }
  }
}

function toggleSlider() {
  window.requestAnimationFrame(() => {
    setTimeout(renderDesktop, 0)
  })
}

document.querySelector('footer').innerHTML = contacts + new Date().getFullYear()

let lastIsLandscape = window.innerWidth > window.innerHeight

function handleResize() {
  const isLandscape = window.innerWidth > window.innerHeight
  if (isLandscape !== lastIsLandscape) {
    lastIsLandscape = isLandscape
    toggleSlider()
  }
}

window.addEventListener('load', toggleSlider)
window.addEventListener('resize', handleResize)
