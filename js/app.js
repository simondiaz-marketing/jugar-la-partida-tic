// ===== 1. IMÁGENES: reemplaza cada valor por la ruta de tu foto real (ej: "fotos/director.jpg") =====
const IMG = {
  "i6462": "img/escudo-cep36-entrada.jpg",
  "i6467": "img/entrevista-director.jpg",
  "i6470": "img/carteles-estudiantes.jpg",
  "i6475": "img/hoja-preguntas-patio.jpg",
  "i6481": "img/cartel-celular.jpg",
  "i6483": "img/patio-banderas.jpg",
  "i6491": "img/cartel-convivencia.jpg",
  "i6493": "img/escudo-cep36-posadas.jpg",
  "i6810": "img/aula-tic-laptops.jpg",
  "i7456": "img/stand-profesorado-tic.jpg",
  "perfil": "img/grupo-bautismo-isarm.jpg"
};
const FOTOS = {
  perfil: IMG.perfil,
  P: IMG.i7456, N: IMG.i6810, B: IMG.i6481, R: IMG.i6475, Q: IMG.i6467, K: IMG.perfil,
  f1: IMG.i6462, f2: IMG.i6467, f3: IMG.i6491, f4: IMG.i6483,
  f5: IMG.i6470, f6: IMG.i6493, f7: IMG.i6475, f8: IMG.i7456
};
// Marcador provisorio (si la ruta es null se genera una imagen ficticia)
function foto(clave, etiqueta, hue){
  if (FOTOS[clave]) return FOTOS[clave];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},45%,32%)"/><stop offset="1" stop-color="hsl(${hue+40},40%,14%)"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="290" font-size="150" text-anchor="middle" fill="rgba(255,255,255,.18)">♟</text><text x="400" y="420" font-size="34" text-anchor="middle" fill="#f3ece0" font-family="Georgia,serif">Foto: ${etiqueta}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
document.getElementById('avatar').src = foto('perfil','tu foto principal',35);

// ===== 2. CONTENIDO =====
const PIEZAS = {
  P:{n:'El peón', k:'El estudiante', t:'Avanza paso a paso y puede llegar lejos. En primer año, el peón somos nosotros: empezamos a recorrer el camino de la formación docente.', g:'Un primer paso es suficiente para empezar a ver más.', h:210},
  N:{n:'El caballo', k:'La creatividad', t:'Es la pieza que encuentra caminos originales. Representa la búsqueda de formas propias de enseñar con tecnología.', g:'Todavía lo estamos descubriendo.', h:160},
  B:{n:'El alfil', k:'La mirada crítica', t:'Relaciona teoría, práctica y contexto. Un cartel que prohíbe el celular en la escuela nos hizo pensar cómo se vincula la tecnología con las normas, siendo futuros docentes de TIC.', g:'Empezamos a mirar con otros ojos.', h:280},
  R:{n:'La torre', k:'Los contenidos', t:'Sostiene la estructura de lo que se enseña: los saberes sobre los que se construye cada clase.', g:'Sin buenos cimientos, no hay enseñanza.', h:20},
  Q:{n:'La dama', k:'La práctica docente', t:'Su versatilidad es la de planificar, enseñar y evaluar. Práctica I fue nuestro primer acercamiento a ese mundo.', g:'Aún falta camino, pero ya empezó.', h:330},
  K:{n:'El rey', k:'El aprendizaje', t:'Es el objetivo central que orienta todo el recorrido. Cada movimiento de la partida se hace para cuidarlo.', g:'Todo el juego gira en torno a aprender.', h:50}
};
const HALLAZGOS = [
  {n:'Conocer el tablero', t:'La escuela se organiza en turnos mañana y tarde, con orientaciones en Humanidades y Artes Visuales. Así nos acercamos a la realidad de una escuela secundaria.', g:'Primero se conoce el terreno.'},
  {n:'Reconocer las piezas', t:'Una escuela está hecha de personas con funciones distintas. La entrevista al director, Orlando Lorenzo Alé, nos ayudó a identificar a los actores de la comunidad educativa.', g:'Cada pieza cumple un rol.'},
  {n:'Comprender las reglas', t:'La convivencia, los valores y la formación humana ocupan un lugar central. Las normas organizan la vida institucional y hacen posible enseñar.', g:'Las reglas dan forma a la partida.'},
  {n:'Los recursos', t:'Observamos la infraestructura y los recursos tecnológicos disponibles, junto con algunas necesidades de actualización.', g:'Enseñar con TIC también es conocer lo que hay.'},
  {n:'Acompañar trayectorias', t:'La escuela desarrolla estrategias para acompañar las trayectorias educativas y atender las necesidades de cada estudiante.', g:'Nadie juega solo.'},
  {n:'La función social', t:'La institución tiene un vínculo cercano con la comunidad: su función social va más allá del aula.', g:'El tablero es más grande que la escuela.'},
  {n:'La entrevista', t:'En el marco de Práctica I, la entrevista y la observación de la dinámica institucional fueron nuestra primera experiencia en una escuela secundaria desde el rol docente.', g:'Preguntar también es una forma de aprender.'},
  {n:'El primer movimiento', t:'Empezamos a construir una mirada docente a partir de la observación, las preguntas y la reflexión. Es solo el comienzo del recorrido.', g:'Colocar las piezas es mirar la escuela como futuro docente.'}
];

// ===== 3. TABLERO =====
const GLIFO = {P:'♟︎',N:'♞',B:'♝',R:'♜',Q:'♛',K:'♚'};
const FONDO = ['R','N','B','Q','K','B','N','R'];
const board = document.getElementById('board');
const vistos = new Set();
const TOTAL = 16;

let ocupado=false, finalMostrado=false;
function armar(){
  board.innerHTML=''; vistos.clear(); progreso(); ocupado=false; finalMostrado=false;
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    const sq=document.createElement('button');
    sq.className='sq '+((r+c)%2===0?'l':'d');
    sq.setAttribute('role','gridcell');
    let tipo=null, info=null;
    if(r===6){tipo='P';info=HALLAZGOS[c]} else if(r===7){tipo=FONDO[c]}
    if(tipo){
      sq.classList.add('act','ghost');
      sq.innerHTML=`<span class="p w">${GLIFO[tipo]}</span>`;
      sq.setAttribute('aria-label','Colocar: '+(info?info.n:PIEZAS[tipo].n));
      sq.addEventListener('click',()=>{
        if(ocupado) return;
        if(sq.classList.contains('ghost')) jugar(sq,tipo,info,r+'-'+c);
        else {ocupado=true; abrir(tipo,info,r+'-'+c,sq)}
      });
    } else sq.tabIndex=-1;
    board.appendChild(sq);
  }
}
function progreso(){document.getElementById('prog').textContent = `Piezas colocadas: ${vistos.size} de ${TOTAL}`}

async function jugar(sq,tipo,info,id){
  ocupado=true;
  const rb=sq.getBoundingClientRect(), tb=board.getBoundingClientRect();
  const fs=rb.height*0.8;
  const f=document.createElement('div');
  f.className='flyer'; f.textContent=GLIFO[tipo]; f.style.fontSize=fs+'px';
  f.style.left=(rb.left+rb.width/2-fs*0.35)+'px'; f.style.top=(rb.top+rb.height/2-fs/2)+'px';
  document.body.appendChild(f);
  const dy=-((rb.top-tb.top)+fs*1.8);
  await f.animate([
    {transform:`translateY(${dy}px) scale(1.7)`,opacity:0},
    {transform:`translateY(${dy*0.6}px) scale(1.5)`,opacity:1,offset:.2},
    {transform:'translateY(0) scale(1.15)',opacity:1,offset:.7},
    {transform:'translateY(-10px) scale(1.05)',opacity:1,offset:.85},
    {transform:'translateY(0) scale(1)',opacity:1}
  ],{duration:950,easing:'cubic-bezier(.4,.1,.4,1)',fill:'forwards'}).finished;
  sq.classList.remove('ghost'); sq.style.animation='';
  sq.innerHTML=`<span class="p w">${GLIFO[tipo]}</span>`;
  f.remove();
  sq.classList.remove('flash'); void sq.offsetWidth; sq.classList.add('flash');
  await new Promise(r=>setTimeout(r,450));
  abrir(tipo,info,id,sq);
}
function final(){
  document.getElementById('cKick').textContent='Primer año · Colocación de las piezas';
  document.getElementById('cTitle').textContent='El terreno está listo';
  document.getElementById('cText').textContent='Conocimos la escuela, reconocimos a sus actores, comprendimos sus reglas y empezamos a construir una mirada docente. Colocar las piezas fue conocer el terreno.';
  document.getElementById('cTag').textContent='Primero se colocan las piezas; después, se juega.';
  const img=document.getElementById('cImg'); img.src=FOTOS.perfil; img.alt='Estudiantes del Profesorado TIC';
  document.getElementById('modal').classList.add('on');
}
function abrir(tipo,info,id,sq){
  const p = PIEZAS[tipo];
  const esH = !!info;
  const clave = esH ? 'f'+(HALLAZGOS.indexOf(info)+1) : tipo;
  document.getElementById('cKick').textContent = esH ? 'Visita al CEP N.º 36 · '+p.k : p.k;
  document.getElementById('cTitle').textContent = esH ? info.n : p.n;
  document.getElementById('cText').textContent = esH ? info.t : p.t;
  document.getElementById('cTag').textContent = esH ? info.g : p.g;
  const img = document.getElementById('cImg');
  const hue = esH ? 25 + HALLAZGOS.indexOf(info)*35 : p.h;
  img.src = foto(clave, esH ? info.n : p.n, hue); img.alt = esH ? info.n : p.n;
  document.getElementById('modal').classList.add('on');
  vistos.add(id); sq.classList.add('seen'); progreso();
}
function cerrar(){document.getElementById('modal').classList.remove('on'); ocupado=false;
  if(vistos.size===TOTAL && !finalMostrado){finalMostrado=true; ocupado=true; setTimeout(final,350)}}
document.getElementById('close').onclick = cerrar;
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')cerrar()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrar()});

// ===== 4. NAVEGACIÓN =====
const show = id => {document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id))};
document.getElementById('start').onclick = () => {armar(); show('juego')};
document.getElementById('back').onclick = () => show('inicio');
