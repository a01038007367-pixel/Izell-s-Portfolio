// 1단계: 3x3 그리드에 8 배치 (중앙 제외)
const stage = document.getElementById('stage');
const cols = [16, 49, 82];
const rows = [25, 50, 79];

rows.forEach((y, ri) => cols.forEach((x, ci) => {
  if (ri === 1 && ci === 1) return;
  const e = document.createElement('span');
  e.className = 'abs n8';
  e.textContent = '8';
  e.style.left = x + '%';
  e.style.top = y + '%';
  if (ci === 1) e.classList.add('b');      // 위/아래 가운데
  if (ri === 1) e.classList.add('side');   // 좌/우 가운데 (옆으로 눕힘)
  if (ri !== 1 && ci !== 1) {              // 네 모서리
    e.classList.add('c');
    if (ci === 2) e.classList.add('r');
    if (ri === 2) e.classList.add('b');
  }
  stage.prepend(e);
}));

// 4단계: 3D 카드 링 생성
const ring = document.getElementById('ring');
const N = 10;                                   // 카드 개수
const R = Math.max(innerWidth * 0.32, 260);     // 원 반지름
for (let i = 0; i < N; i++) {
  const c = document.createElement('div');
  c.className = 'card';
  const tilt = (Math.random() * 24 - 12).toFixed(1);
  c.style.transform = `rotateY(${i * 360 / N}deg) translateZ(${R}px) rotateZ(${tilt}deg)`;
  c.style.background = `rgba(150,150,150,${(0.18 + Math.random() * 0.25).toFixed(2)})`;
  ring.appendChild(c);
}

// 5단계: 비 내리듯 떨어지는 8 생성 (크기, 속도, 투명도를 제각각)
const rain = document.getElementById('rain');
const DROPS = 40;   // 8의 개수
for (let i = 0; i < DROPS; i++) {
  const d = document.createElement('span');
  d.className = 'drop';
  d.textContent = '8';
  d.style.left = (Math.random() * 100).toFixed(1) + '%';
  d.style.fontSize = (1.5 + Math.random() * 3.5).toFixed(2) + 'vw';
  d.style.fontWeight = Math.random() > 0.5 ? 800 : 200;
  d.style.setProperty('--o', (0.08 + Math.random() * 0.5).toFixed(2));   // 투명도 0.08 ~ 0.58
  d.style.setProperty('--dur', (4 + Math.random() * 6).toFixed(1) + 's'); // 낙하 시간 4 ~ 10초
  d.style.setProperty('--delay', (-Math.random() * 10).toFixed(1) + 's'); // 시작 시점 분산
  rain.appendChild(d);
}

// 타임라인 (단계 전환)
const set = s => document.body.dataset.s = s;
setTimeout(() => set(2), 2000);   // 2초 후: 8 회전 + 가운데 공 등장
setTimeout(() => set(3), 3000);   // 1초 후: 8들이 중앙으로 모임
setTimeout(() => set(4), 4600);   // 흰 배경 + 3D 카드 회전
setTimeout(() => set(5), 8600);   // 최종 화면
