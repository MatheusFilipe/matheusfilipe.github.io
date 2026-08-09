/**
 * MATHEUS FILIPE - BACKEND DEVELOPER PORTFOLIO
 * Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFiltering();
  initEmailCopy();
  initCodeTerminalSwitcher();
  initScrollSpy();
});

/* ==========================================================================
   Project Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Click to Copy Email with Toast Notification
   ========================================================================== */
function initEmailCopy() {
  const emailButtons = document.querySelectorAll('[data-copy-email]');

  emailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'matheus.filipes.rodrigues@gmail.com';

      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 E-mail copiado com sucesso!');
      }).catch(() => {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('📋 E-mail copiado com sucesso!');
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   Interactive Code Terminal Switcher
   ========================================================================== */
const codeSnippets = {
  python: `<span class="code-comment"># profile.py - Backend Developer Profile</span>
<span class="code-keyword">class</span> <span class="code-property">BackendDeveloper</span>:
    <span class="code-keyword">def</span> <span class="code-property">__init__</span>(self):
        self.name = <span class="code-string">"Matheus Filipe"</span>
        self.role = <span class="code-string">"Desenvolvedor Backend (Júnior em formação)"</span>
        self.education = <span class="code-string">"Ciência da Computação @ UFU"</span>
        self.primary_language = <span class="code-string">"Python"</span>
        self.languages_spoken = [<span class="code-string">"Português"</span>, <span class="code-string">"Inglês"</span>]
        self.codewars = <span class="code-string">"https://www.codewars.com/users/MatheusFilipe"</span>`,

  json: `<span class="code-comment">// matheus_profile.json</span>
{
  <span class="code-property">"developer"</span>: <span class="code-string">"Matheus Filipe"</span>,
  <span class="code-property">"level"</span>: <span class="code-string">"Júnior (em formação)"</span>,
  <span class="code-property">"education"</span>: <span class="code-string">"Ciência da Computação @ UFU"</span>,
  <span class="code-property">"primary_language"</span>: <span class="code-string">"Python"</span>,
  <span class="code-property">"languages_spoken"</span>: [<span class="code-string">"Português"</span>, <span class="code-string">"Inglês"</span>],
  <span class="code-property">"codewars"</span>: <span class="code-string">"https://www.codewars.com/users/MatheusFilipe"</span>,
  <span class="code-property">"current_focus"</span>: [<span class="code-string">"SQL"</span>, <span class="code-string">"Python Moderno"</span>, <span class="code-string">"Arquitetura de Software"</span>, <span class="code-string">"Docker & CI/CD"</span>]
}`
};

function initCodeTerminalSwitcher() {
  const terminalContent = document.getElementById('terminal-content');
  const tabs = document.querySelectorAll('[data-code-tab]');

  if (!terminalContent || !tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.opacity = '0.5');
      tab.style.opacity = '1';

      const snippetKey = tab.getAttribute('data-code-tab');
      if (codeSnippets[snippetKey]) {
        terminalContent.innerHTML = codeSnippets[snippetKey];
      }
    });
  });
}

/* ==========================================================================
   ScrollSpy Nav Highlight
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
