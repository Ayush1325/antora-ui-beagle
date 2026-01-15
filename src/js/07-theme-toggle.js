/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = (theme) => {
    if (theme === 'auto') {
      document.documentElement.setAttribute(
        'data-bs-theme',
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitchers = document.querySelectorAll('.js-theme-toggle')

    if (themeSwitchers.length === 0) {
      return
    }

    document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    const btnsToActive = document.querySelectorAll(`[data-bs-theme-value="${theme}"]`)

    btnsToActive.forEach((btn) => {
      btn.classList.add('active')
      btn.setAttribute('aria-pressed', 'true')
    })

    if (btnsToActive.length === 0) return

    // Get the icon class from one of the active buttons
    const iconOfActiveBtn = btnsToActive[0].querySelector('i').classList.value
    const newClasses = iconOfActiveBtn.split(' ').filter((c) => c.startsWith('bi-'))

    themeSwitchers.forEach((switcher) => {
      const activeThemeIcon = switcher.querySelector('.theme-icon-active')
      if (activeThemeIcon) {
        const currentClasses = activeThemeIcon.classList.value.split(' ').filter((c) => !c.startsWith('bi-'))
        activeThemeIcon.className = [...currentClasses, ...newClasses].join(' ')
      }

      const themeSwitcherText = switcher.querySelector('.js-theme-text')
      const themeName = btnsToActive[0].textContent.trim()
      const labelText = themeSwitcherText ? themeSwitcherText.textContent : 'Toggle theme'
      switcher.setAttribute('aria-label', `${labelText} (${themeName})`)
    })

    if (focus) {
      // themeSwitchers[0].focus() // logic to focus correct one is complex if hidden, skip for now
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
