import './style.css'

// COREWAR Interactive Site

const state = {
  battleRunning: false,
  battlePaused: false,
  battleCycle: 0,
  secretClicks: 0,
  konamiIndex: 0,
  particles: [],
  robots: []
}

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const INSTRUCTIONS = [
  { name: 'live', desc: 'Le robot dit: Je suis vivant!', example: 'live %1', color: '#ff4fa3' },
  { name: 'ld', desc: 'Charge une valeur dans un registre', example: 'ld %42, r3', color: '#4ef0a6' },
  { name: 'st', desc: 'Stocke une valeur dans la memoire', example: 'st r3, %42', color: '#6466f1' },
  { name: 'add', desc: 'Additionne deux registres', example: 'add r1, r2, r3', color: '#a855f7' },
  { name: 'sub', desc: 'Soustrait deux registres', example: 'sub r1, r2, r3', color: '#ff4fa3' },
  { name: 'and', desc: 'Operation ET bitabit', example: 'and r1, r2, r3', color: '#4ef0a6' },
  { name: 'or', desc: 'Operation OU bitabit', example: 'or r1, r2, r3', color: '#6466f1' },
  { name: 'xor', desc: 'Operation XOR bitabit', example: 'xor r1, r2, r3', color: '#a855f7' },
  { name: 'zjmp', desc: 'Saute si le carry est actif', example: 'zjmp %:label', color: '#ff4fa3' },
  { name: 'ldi', desc: 'Charge indirect avec index', example: 'ldi %25, r2', color: '#4ef0a6' },
  { name: 'sti', desc: 'Stocke indirect avec index', example: 'sti r3, %42', color: '#6466f1' },
  { name: 'fork', desc: 'Cree un clone du robot', example: 'fork %:sub', color: '#a855f7' },
  { name: 'lld', desc: 'Long load sans modulo', example: 'lld %42, r3', color: '#ff4fa3' },
  { name: 'lldi', desc: 'Long load indirect', example: 'lldi %25, r2', color: '#4ef0a6' },
  { name: 'lfork', desc: 'Long fork sans modulo', example: 'lfork %:sub', color: '#6466f1' },
  { name: 'aff', desc: 'Affiche un caractere ASCII', example: 'aff r3', color: '#a855f7' }
]

const COMPONENT_INFO = {
  cpu: { title: 'CPU - Le cerveau', description: 'Le CPU lit les instructions des robots et decide quelles actions executer. C\'est le coeur de la machine virtuelle.' },
  ram: { title: 'RAM - L\'arene', description: 'La memoire RAM est l\'arene dans laquelle les robots se battent. Chaque case peut contenir une instruction.' },
  registers: { title: 'Registres - Memoire rapide', description: 'Chaque robot possede 16 registres (r1 a r16) pour stocker des donnees temporaires ultra-rapides.' },
  vm: { title: 'Machine Virtuelle - L\'arbitre', description: 'La VM charge les robots, simule le combat, applique les regles et declare le vainqueur.' },
  asm: { title: 'Assembleur - Le traducteur', description: 'Transforme le code humain en langage machine (bytecode) executable par la VM.' },
  pc: { title: 'Program Counter - Position', description: 'Indique au robot sa prochaine instruction. Peut sauter vers d\'autres endroits avec zjmp.' }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initParticles()
  initNav()
  initMemory()
  initComponents()
  initInstructions()
  initBattle()
  initAssembler()
  initStats()
  initEasterEggs()
})

// Particles
function initParticles() {
  const canvas = document.getElementById('particles-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  for (let i = 0; i < 80; i++) {
    state.particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      c: ['#ff4fa3', '#4ef0a6', '#6466f1', '#a855f7'][Math.floor(Math.random() * 4)]
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    state.particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.c
      ctx.fill()
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0
    })
    requestAnimationFrame(animate)
  }
  animate()

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Navigation
function initNav() {
  const nav = document.getElementById('nav')
  const hamburger = document.getElementById('nav-hamburger')
  const mobileMenu = document.getElementById('mobile-menu')
  const links = document.querySelectorAll('.mobile-link')
  const launchNav = document.getElementById('launch-battle-nav')
  const enterArena = document.getElementById('enter-arena')
  const relaunch = document.getElementById('relaunch-battle')

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50)
  })

  hamburger?.addEventListener('click', () => mobileMenu?.classList.toggle('active'))
  links.forEach(l => l.addEventListener('click', () => mobileMenu?.classList.remove('active')))

  const scrollToBattle = () => document.getElementById('battle')?.scrollIntoView({ behavior: 'smooth' })
  launchNav?.addEventListener('click', scrollToBattle)
  enterArena?.addEventListener('click', scrollToBattle)
  relaunch?.addEventListener('click', scrollToBattle)
}

// Memory Grid
function initMemory() {
  const grid = document.getElementById('memory-grid')
  if (!grid) return

  for (let i = 0; i < 16 * 32; i++) {
    const cell = document.createElement('div')
    cell.className = 'memory-cell'
    cell.dataset.addr = i
    cell.addEventListener('click', () => showMemTooltip(cell))
    grid.appendChild(cell)
  }

  document.getElementById('memory-animate')?.addEventListener('click', animateMem)
  document.getElementById('memory-reset')?.addEventListener('click', resetMem)
}

function showMemTooltip(cell) {
  const tooltip = document.getElementById('memory-tooltip')
  if (!tooltip) return
  const addr = cell.dataset.addr
  const owner = cell.classList.contains('pink') ? 'Robot Rose' :
                cell.classList.contains('green') ? 'Robot Vert' :
                cell.classList.contains('blue') ? 'Robot Bleu' :
                cell.classList.contains('violet') ? 'Robot Violet' : 'Aucun'

  document.getElementById('tooltip-addr').textContent = `0x${parseInt(addr).toString(16).toUpperCase().padStart(4, '0')}`
  document.getElementById('tooltip-owner').textContent = owner
  document.getElementById('tooltip-value').textContent = `0x${Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')}`

  const rect = cell.getBoundingClientRect()
  tooltip.style.left = `${rect.left + 20}px`
  tooltip.style.top = `${rect.top - 80}px`
  tooltip.classList.add('active')

  setTimeout(() => tooltip.classList.remove('active'), 2000)
}

function animateMem() {
  const cells = document.querySelectorAll('.memory-cell')
  const colors = ['pink', 'green', 'blue', 'violet']
  const positions = [0, Math.floor(cells.length/4), Math.floor(cells.length/2), Math.floor(cells.length*3/4)]

  positions.forEach((p, i) => cells[p]?.classList.add(colors[i]))

  let step = 0
  const interval = setInterval(() => {
    if (step >= 30) { clearInterval(interval); return }
    colors.forEach((c, i) => {
      const oldP = positions[i]
      positions[i] = Math.max(0, Math.min(cells.length - 1, positions[i] + Math.floor(Math.random() * 10) - 5))
      cells[oldP]?.classList.remove(c)
      cells[positions[i]]?.classList.add(c)
    })
    step++
  }, 100)
}

function resetMem() {
  document.querySelectorAll('.memory-cell').forEach(c => c.className = 'memory-cell')
}

// Components
function initComponents() {
  let cpuClicks = 0
  document.querySelectorAll('.component').forEach(c => {
    c.addEventListener('click', () => {
      const type = c.dataset.component
      showPanel(type)
      if (type === 'cpu' && ++cpuClicks >= 5) {
        activateSecret()
        cpuClicks = 0
      }
    })
  })

  document.getElementById('panel-close')?.addEventListener('click', () => {
    document.getElementById('component-panel')?.classList.remove('active')
  })
}

function showPanel(type) {
  const panel = document.getElementById('component-panel')
  const content = document.getElementById('panel-content')
  const info = COMPONENT_INFO[type]
  if (!info || !content || !panel) return

  content.innerHTML = `
    <h3 class="panel-title">${info.title}</h3>
    <p class="panel-description">${info.description}</p>
  `
  panel.classList.add('active')
}

// Instructions
function initInstructions() {
  const grid = document.getElementById('instructions-grid')
  if (!grid) return

  INSTRUCTIONS.forEach(ins => {
    const card = document.createElement('div')
    card.className = 'instruction-card'
    card.innerHTML = `
      <div class="instruction-icon" style="color: ${ins.color}">
        <svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="20" r="4" fill="currentColor"/></svg>
      </div>
      <div class="instruction-name">${ins.name.toUpperCase()}</div>
      <div class="instruction-desc">${ins.desc.substring(0, 25)}...</div>
    `
    card.addEventListener('click', () => showModal(ins))
    grid.appendChild(card)
  })

  document.getElementById('modal-close')?.addEventListener('click', closeModal)
  document.getElementById('instruction-modal')?.addEventListener('click', e => {
    if (e.target.id === 'instruction-modal') closeModal()
  })
}

function showModal(ins) {
  document.getElementById('modal-title').textContent = ins.name.toUpperCase()
  document.getElementById('modal-description').textContent = ins.desc
  document.getElementById('modal-code').textContent = ins.example
  document.getElementById('instruction-modal')?.classList.add('active')
}

function closeModal() {
  document.getElementById('instruction-modal')?.classList.remove('active')
}

// Battle
function initBattle() {
  const display = document.getElementById('battle-memory')
  if (!display) return
  for (let i = 0; i < 64 * 12; i++) {
    const cell = document.createElement('div')
    cell.className = 'battle-cell'
    display.appendChild(cell)
  }

  document.getElementById('battle-start')?.addEventListener('click', startBattle)
  document.getElementById('battle-pause')?.addEventListener('click', pauseBattle)
  document.getElementById('battle-reset')?.addEventListener('click', resetBattle)
  document.getElementById('winner-replay')?.addEventListener('click', resetBattle)
}

function startBattle() {
  if (state.battleRunning) return
  state.battleRunning = true
  state.battlePaused = false

  document.getElementById('battle-start').disabled = true
  document.getElementById('battle-pause').disabled = false
  document.getElementById('battle-reset').disabled = false

  const cells = document.querySelectorAll('.battle-cell')
  const colors = ['pink', 'green', 'blue']

  state.robots = colors.map((c, i) => ({
    color: c,
    pos: Math.floor((cells.length / 4) * i),
    alive: true,
    procs: 1
  }))

  state.robots.forEach(r => cells[r.pos]?.classList.add(r.color))
  runBattle()
}

function runBattle() {
  if (!state.battleRunning || state.battlePaused) return

  const cells = document.querySelectorAll('.battle-cell')

  state.robots.forEach(r => {
    if (!r.alive) return
    const old = r.pos
    r.pos = Math.max(0, Math.min(cells.length - 1, r.pos + Math.floor(Math.random() * 7) - 3))
    cells[old]?.classList.remove(r.color)
    cells[r.pos]?.classList.add(r.color)

    if (Math.random() < 0.05) {
      r.procs++
      document.getElementById(`lives-${r.color}`).textContent = `Processus: ${r.procs}`
    }
  })

  state.battleCycle++
  document.getElementById('battle-cycle').textContent = state.battleCycle

  if (state.battleCycle >= 500) { endBattle(); return }

  if (state.battleRunning && !state.battlePaused) setTimeout(runBattle, 30)
}

function pauseBattle() {
  state.battlePaused = !state.battlePaused
  document.getElementById('battle-pause').textContent = state.battlePaused ? 'Reprendre' : 'Pause'
  if (!state.battlePaused && state.battleRunning) runBattle()
}

function resetBattle() {
  state.battleRunning = false
  state.battlePaused = false
  state.battleCycle = 0
  state.robots = []

  document.querySelectorAll('.battle-cell').forEach(c => c.className = 'battle-cell')
  document.getElementById('battle-start').disabled = false
  document.getElementById('battle-pause').disabled = true
  document.getElementById('battle-pause').textContent = 'Pause'
  document.getElementById('battle-reset').disabled = true
  document.getElementById('battle-cycle').textContent = '0'
  document.getElementById('battle-winner')?.classList.remove('active')

  ;['pink', 'green', 'blue'].forEach(c => {
    document.getElementById(`stat-${c}`).textContent = 'En vie'
    document.getElementById(`lives-${c}`).textContent = 'Processus: 1'
  })
}

function endBattle() {
  state.battleRunning = false
  const winner = state.robots.reduce((a, b) => a.procs > b.procs ? a : b)
  const names = { pink: 'Champion Rose', green: 'Champion Vert', blue: 'Champion Bleu' }
  document.getElementById('winner-name').textContent = names[winner.color]
  document.getElementById('battle-winner')?.classList.add('active')

  state.robots.forEach(r => {
    if (r.color !== winner.color) {
      document.getElementById(`stat-${r.color}`).textContent = 'Elimine'
    }
  })
}

// Assembler
function initAssembler() {
  document.getElementById('assemble-btn')?.addEventListener('click', () => {
    const input = document.getElementById('asm-input')
    const output = document.getElementById('asm-output')
    if (!input || !output) return

    const code = input.value.trim()
    if (!code) return
    output.innerHTML = transformAsm(code)
  })
}

function transformAsm(code) {
  const ops = { live: '01', ld: '02', st: '03', add: '04', sub: '05', and: '06', or: '07', xor: '08', zjmp: '09', ldi: '0a', sti: '0b', fork: '0c', lld: '0d', lldi: '0e', lfork: '0f', aff: '10' }
  let result = ''

  code.split('\n').forEach(line => {
    const parts = line.trim().split(/\s+/)
    const op = ops[parts[0]]
    if (op) {
      result += `<span style="color: var(--pink)">0x${op}</span> `
      result += parts.slice(1).map(p => `<span style="color: var(--green)">${p}</span>`).join(' ')
      result += '<br>'
    }
  })

  return result || '<span class="byte-placeholder">Code invalide</span>'
}

// Stats
function initStats() {
  const cards = document.querySelectorAll('.stat-card')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateNum(e.target)
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.5 })
  cards.forEach(c => observer.observe(c))
}

function animateNum(card) {
  const num = card.querySelector('.stat-number')
  const target = parseInt(card.dataset.target)
  if (!num || isNaN(target)) return

  let cur = 0
  const inc = Math.max(1, Math.ceil(target / 50))
  const timer = setInterval(() => {
    cur += inc
    if (cur >= target) { cur = target; clearInterval(timer) }
    num.textContent = cur.toLocaleString()
  }, 40)
}

// Easter Eggs
function initEasterEggs() {
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI_CODE[state.konamiIndex]) {
      state.konamiIndex++
      if (state.konamiIndex === KONAMI_CODE.length) {
        activateKonami()
        state.konamiIndex = 0
      }
    } else state.konamiIndex = 0
  })
}

function activateSecret() {
  const el = document.getElementById('secret-mode')
  el?.classList.add('active')
  setTimeout(() => el?.classList.remove('active'), 2500)
}

function activateKonami() {
  const el = document.getElementById('konami-display')
  el?.classList.add('active')
  setTimeout(() => el?.classList.remove('active'), 2000)
}
