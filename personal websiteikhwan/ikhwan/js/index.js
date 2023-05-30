window.onload = () => {
  const ikCursor = document.querySelector('#ik-cursor')
  const ikForm = document.querySelector('#ik-contact-form')
  const ikLinks = document.querySelectorAll('*[data-scroll]')

  gsap.registerPlugin(ScrollToPlugin);;

  for (const ikLink of gsap.utils.toArray(ikLinks)) {
    ikLink.addEventListener('click', (e) => {
      e.preventDefault()
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: e.target.getAttribute('href'),
          offsetY: 96
        }
      })
    })
  }

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e

    gsap.to(ikCursor, {
      top: clientY,
      left: clientX,
      duration: 0.1,
      ease: 'power2.inOut'
    })
  })

  ikForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = {}

    const ikInputs = ikForm.querySelectorAll('input:not([type=submit])')
    for (const ikInput of gsap.utils.toArray(ikInputs)) {
      data[ikInput.getAttribute('name')] = ikInput.value
    }

    const pretty = JSON.stringify(data, null, '\t')

    const ikWindow = window.open();
    ikWindow.document.open();
    ikWindow.document.write(`<html><body><pre>${pretty}</pre></body></html>`);
    ikWindow.document.close();
  })
}