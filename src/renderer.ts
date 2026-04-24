import type { Slide } from "./slides";

export function renderSlide(slide: Slide): string {
  switch (slide.type) {
    case "intro":
      return renderIntro();
    case "cover":
      return renderCover(slide);
    case "history":
      return renderHistory(slide);
    case "principles":
      return renderPrinciples(slide);
    case "board":
    case "example":
      return renderBoard(slide);
    case "wip":
    case "text":
      return renderText(slide);
    case "metrics":
      return renderMetrics(slide);
    case "vsscrum":
      return renderVsScrum(slide);
    case "tools":
      return renderTools(slide);
    case "closing":
      return renderClosing(slide);
    default:
      return `<div class="slide-inner"><h1>${slide.title}</h1></div>`;
  }
}

function renderIntro(): string {
  return `
    <div class="intro-overlay">
      <canvas id="introCanvas"></canvas>
      <div id="instruction" class="intro-instruction">
        <span class="pulse-text">Haz clic para comenzar</span>
      </div>
    </div>`;
}

function renderCover(slide: Slide): string {
  const { subtitle, body, highlight, note } = slide.content;
  return `
    <div class="slide-inner cover-slide">
      <div class="cover-kanji">${highlight}</div>
      <div class="cover-content">
        <h1 class="cover-title">${slide.title}</h1>
        <p class="cover-subtitle">${subtitle}</p>
        <p class="cover-body">${body}</p>
        <div class="cover-note">
          <span class="nav-icon">←</span> ${note} <span class="nav-icon">→</span>
        </div>
      </div>
      <div class="cover-deco">
        <div class="deco-card deco1">Backlog</div>
        <div class="deco-card deco2">En progreso</div>
        <div class="deco-card deco3">¡Hecho! ✓</div>
      </div>
    </div>`;
}

function renderHistory(slide: Slide): string {
  const { subtitle, postits } = slide.content;
  const postitHTML = (postits || [])
    .map(
      (p, i) => `
    <div class="postit" style="background:${p.color};transform:rotate(${p.rotate}deg);animation-delay:${i * 0.1}s">
      <p class="postit-text">${p.text}</p>
      <span class="postit-author">${p.author}</span>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="postits-grid">${postitHTML}</div>
    </div>`;
}

function renderPrinciples(slide: Slide): string {
  const { subtitle, bullets, note } = slide.content;
  const colors = ["#FFF176", "#FFCCBC", "#C8E6C9", "#BBDEFB"];
  const bulletsHTML = (bullets || [])
    .map(
      (b, i) => `
    <div class="principle-card" style="background:${colors[i]};animation-delay:${i * 0.12}s">
      <p>${b}</p>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="principles-grid">${bulletsHTML}</div>
      <div class="slide-note">${note}</div>
    </div>`;
}

function renderBoard(slide: Slide): string {
  const { subtitle, columns } = slide.content;
  const colsHTML = (columns || [])
    .map(
      (col, ci) => `
    <div class="kanban-col" style="background:${col.color}; animation-delay:${ci * 0.1}s">
      <div class="col-header">
        <span class="col-name">${col.name}</span>
        ${col.wip ? `<span class="col-wip">WIP: ${col.wip}</span>` : ""}
      </div>
      <div class="col-cards">
        ${col.cards
          .map(
            (card, ki) => `
          <div class="kanban-card" style="transform:rotate(${card.rotate}deg);animation-delay:${(ci * 3 + ki) * 0.07}s">
            <p class="card-text">${card.text}</p>
            <span class="card-tag" style="background:${card.tagColor}">${card.tag}</span>
          </div>`
          )
          .join("")}
      </div>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner board-slide">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="kanban-board">${colsHTML}</div>
    </div>`;
}

function renderText(slide: Slide): string {
  const { subtitle, body, bullets, highlight, note } = slide.content;
  const colors = ["#FFCDD2", "#FFF9C4", "#C8E6C9", "#BBDEFB", "#FFE0B2", "#E1BEE7"];
  const bulletsHTML = (bullets || [])
    .map(
      (b, i) => `
    <div class="wip-row" style="background:${colors[i % colors.length]};animation-delay:${i * 0.15}s">
      <p>${b}</p>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        ${subtitle ? `<p class="slide-subtitle">${subtitle}</p>` : ''}
      </div>
      ${body ? `<p class="slide-body">${body}</p>` : ''}
      <div class="wip-rows">${bulletsHTML}</div>
      ${highlight ? `<div class="highlight-box">${highlight}</div>` : ''}
      ${note ? `<div class="slide-note">${note}</div>` : ''}
    </div>`;
}

function renderMetrics(slide: Slide): string {
  const { subtitle, metrics } = slide.content;
  const metricsHTML = (metrics || [])
    .map(
      (m, i) => `
    <div class="metric-card" style="border-top: 6px solid ${m.color};animation-delay:${i * 0.12}s">
      <div class="metric-icon">${m.icon}</div>
      <div class="metric-name" style="color:${m.color}">${m.name}</div>
      <div class="metric-value">${m.value}</div>
      <div class="metric-desc">${m.desc}</div>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="metrics-grid">${metricsHTML}</div>
    </div>`;
}

function renderVsScrum(slide: Slide): string {
  const { subtitle, comparison } = slide.content;
  const rowsHTML = (comparison || [])
    .map(
      (row, i) => `
    <tr class="comp-row" style="animation-delay:${i * 0.08}s">
      <td class="comp-aspect">${row.aspect}</td>
      <td class="comp-kanban">${row.kanban}</td>
      <td class="comp-scrum">${row.scrum}</td>
    </tr>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <table class="comp-table">
        <thead>
          <tr>
            <th>Aspecto</th>
            <th class="th-kanban">🟡 Kanban</th>
            <th class="th-scrum">🟣 Scrum</th>
          </tr>
        </thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    </div>`;
}

function renderTools(slide: Slide): string {
  const { subtitle, tools } = slide.content;
  const toolsHTML = (tools || [])
    .map(
      (t, i) => `
    <div class="tool-card" style="border-left: 5px solid ${t.color};animation-delay:${i * 0.08}s">
      <div class="tool-logo">${t.logo}</div>
      <div class="tool-info">
        <div class="tool-name" style="color:${t.color}">${t.name}</div>
        <div class="tool-type">${t.type}</div>
        <div class="tool-desc">${t.desc}</div>
      </div>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="tools-grid">${toolsHTML}</div>
    </div>`;
}

function renderClosing(slide: Slide): string {
  const { subtitle, bullets, highlight, note } = slide.content;
  const colors = ["#FFF176", "#FFCCBC", "#C8E6C9", "#BBDEFB"];
  const bulletsHTML = (bullets || [])
    .map(
      (b, i) => `
    <div class="step-card" style="background:${colors[i]};animation-delay:${i * 0.15}s">
      <p>${b}</p>
    </div>`
    )
    .join("");
  return `
    <div class="slide-inner closing-slide">
      <div class="slide-header">
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${subtitle}</p>
      </div>
      <div class="steps-grid">${bulletsHTML}</div>
      <div class="closing-footer">
        <div class="closing-kanji">${highlight}</div>
        <div class="closing-note">${note}</div>
      </div>
    </div>`;
}
