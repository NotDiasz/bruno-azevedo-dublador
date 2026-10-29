import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type ObjetoEstudio = THREE.Group & {
  userData: {
    laminas?: THREE.Group[];
    laminasMesh?: THREE.InstancedMesh;
    abertura?: number;
    geometriaLamina?: THREE.BufferGeometry;
  };
};
const TAU = Math.PI * 2;

/** Ambiente de estúdio construído localmente; nenhuma textura ou CDN em produção. */
export function criarAmbiente(renderer: THREE.WebGLRenderer) {
  const gerador = new THREE.PMREMGenerator(renderer);
  const sala = new RoomEnvironment();
  const alvo = gerador.fromScene(sala, 0.04);
  sala.dispose();
  gerador.dispose();
  return alvo;
}

function material(cor: string, rugosidade = 0.3) {
  return new THREE.MeshStandardMaterial({
    color: cor,
    metalness: 0.92,
    roughness: rugosidade,
  });
}
function malha(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  pai: THREE.Object3D,
  pos: [number, number, number] = [0, 0, 0],
) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  pai.add(m);
  return m;
}
function anel(
  raio: number,
  tubo: number,
  pai: THREE.Object3D,
  mat: THREE.Material,
  z = 0,
) {
  return malha(new THREE.TorusGeometry(raio, tubo, 8, 100), mat, pai, [
    0,
    0,
    z,
  ]);
}

export function criarDiafragma(): ObjetoEstudio {
  const grupo = new THREE.Group() as ObjetoEstudio;
  const metal = material("#34363a", 0.25);
  const escuro = material("#131518", 0.36);
  const claro = material("#92938e", 0.22);
  // Perfil de um anel usinado, com chanfros e sulco interior (72 segmentos mantêm o chanfro suave).
  const perfil = [
    [1.34, -0.15],
    [1.36, -0.23],
    [1.75, -0.23],
    [1.85, -0.14],
    [1.85, 0.11],
    [1.78, 0.22],
    [1.48, 0.22],
    [1.42, 0.15],
    [1.34, 0.13],
    [1.34, -0.15],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const corpo = malha(new THREE.LatheGeometry(perfil, 72), metal, grupo);
  corpo.rotation.x = Math.PI / 2;

  // Anéis concêntricos mesclados por material: reduzem 7 chamadas de desenho a apenas 2.
  const aneisClaroGeos: THREE.BufferGeometry[] = [];
  const aneisEscuroGeos: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const geo = new THREE.TorusGeometry(1.49 + i * 0.055, 0.009, 8, 72);
    geo.translate(0, 0, 0.235);
    if (i % 2) aneisEscuroGeos.push(geo);
    else aneisClaroGeos.push(geo);
  }
  const anel18 = new THREE.TorusGeometry(1.8, 0.024, 8, 72);
  anel18.translate(0, 0, 0.12);
  aneisClaroGeos.push(anel18);

  const anel137 = new THREE.TorusGeometry(1.37, 0.028, 8, 72);
  anel137.translate(0, 0, 0.12);
  aneisEscuroGeos.push(anel137);

  const geoClaro = BufferGeometryUtils.mergeGeometries(aneisClaroGeos);
  const geoEscuro = BufferGeometryUtils.mergeGeometries(aneisEscuroGeos);
  malha(geoClaro, claro, grupo);
  malha(geoEscuro, escuro, grupo);
  aneisClaroGeos.forEach((g) => g.dispose());
  aneisEscuroGeos.forEach((g) => g.dispose());

  // Serrilha e marcas gravadas em uma chamada de desenho por conjunto.
  const dentado = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.028, 0.055, 0.15),
    escuro,
    144,
  );
  const marcas = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.014, 0.06, 0.012),
    claro,
    36,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 144; i++) {
    const a = (i * TAU) / 144;
    dummy.position.set(Math.cos(a) * 1.84, Math.sin(a) * 1.84, 0);
    dummy.rotation.set(0, 0, a);
    dummy.updateMatrix();
    dentado.setMatrixAt(i, dummy.matrix);
  }
  for (let i = 0; i < 36; i++) {
    const a = (i * TAU) / 36;
    dummy.position.set(Math.cos(a) * 1.68, Math.sin(a) * 1.68, 0.245);
    dummy.rotation.set(0, 0, a - Math.PI / 2);
    dummy.updateMatrix();
    marcas.setMatrixAt(i, dummy.matrix);
  }
  grupo.add(dentado, marcas);

  // Parafusos periféricos instanciados: 1 chamada de desenho para os 9 parafusos.
  const geoParafuso = new THREE.CylinderGeometry(0.037, 0.037, 0.018, 12);
  const parafusos = new THREE.InstancedMesh(geoParafuso, claro, 9);
  const dummyP = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    const a = (i * TAU) / 9;
    dummyP.position.set(Math.cos(a) * 1.53, Math.sin(a) * 1.53, 0.26);
    dummyP.rotation.set(Math.PI / 2, 0, 0);
    dummyP.updateMatrix();
    parafusos.setMatrixAt(i, dummyP.matrix);
  }
  parafusos.instanceMatrix.needsUpdate = true;
  grupo.add(parafusos);

  // Forma geométrica precisa da lâmina curva.
  const forma = new THREE.Shape();
  forma.moveTo(0.025, -0.006);
  forma.quadraticCurveTo(
    0.85,
    -0.26,
    1.42 * Math.cos(0.28),
    1.42 * Math.sin(0.28),
  );
  forma.absarc(0, 0, 1.42, 0.28, 1.02, false);
  forma.quadraticCurveTo(0.62, 0.58, 0.018, 0.02);
  forma.closePath();
  const geometria = new THREE.ExtrudeGeometry(forma, {
    depth: 0.022,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.007,
    bevelThickness: 0.006,
    curveSegments: 22,
  });

  // InstancedMesh para as 9 lâminas: 1 única chamada de desenho, cinemática rígida pura sem recálculo de vértices na CPU.
  const matLaminas = material("#45484c", 0.32);
  const laminasMesh = new THREE.InstancedMesh(geometria, matLaminas, 9);
  const corA = new THREE.Color("#4d5054");
  const corB = new THREE.Color("#393d42");
  for (let i = 0; i < 9; i++) {
    laminasMesh.setColorAt(i, i % 2 ? corA : corB);
  }
  if (laminasMesh.instanceColor) laminasMesh.instanceColor.needsUpdate = true;
  grupo.add(laminasMesh);
  grupo.userData.laminasMesh = laminasMesh;

  // Vidro plano transparente: material padrão PBR sem transmission (dispensa passes extras de renderização).
  const vidro = malha(
    new THREE.CircleGeometry(1.3, 48),
    new THREE.MeshStandardMaterial({
      color: "#a9b7ba",
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.055,
      depthWrite: false,
    }),
    grupo,
    [0, 0, -0.17],
  );
  vidro.name = "vidro";
  abrirDiafragma(grupo, 0.62);
  return grupo;
}

const PIVOT_RADIUS = 1.42;
const PIVOT_ANGLE = 0.98;
const PIVOT_X = Math.cos(PIVOT_ANGLE) * PIVOT_RADIUS;
const PIVOT_Y = Math.sin(PIVOT_ANGLE) * PIVOT_RADIUS;
const _matInv = new THREE.Matrix4().makeTranslation(-PIVOT_X, -PIVOT_Y, 0);
const _matRot = new THREE.Matrix4();
const _matFwd = new THREE.Matrix4();
const _matGlobal = new THREE.Matrix4();
const _matFinal = new THREE.Matrix4();

export function abrirDiafragma(grupo: ObjetoEstudio, abertura: number) {
  if (grupo.userData.abertura === abertura) return;
  const mesh = grupo.userData.laminasMesh;
  if (mesh) {
    const dRot = abertura * -0.92;
    _matRot.makeRotationZ(dRot);
    for (let i = 0; i < 9; i++) {
      const a = (i * TAU) / 9;
      const zi = -0.09 + i * 0.006;
      _matFwd.makeTranslation(PIVOT_X, PIVOT_Y, zi);
      _matGlobal.makeRotationZ(a);
      _matFinal
        .copy(_matGlobal)
        .multiply(_matFwd)
        .multiply(_matRot)
        .multiply(_matInv);
      mesh.setMatrixAt(i, _matFinal);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.visible = abertura < 0.98;
  }
  grupo.userData.abertura = abertura;
}

export function criarMicrofone(): ObjetoEstudio {
  const grupo = new THREE.Group() as ObjetoEstudio;
  const metal = material("#4b4d50", 0.28),
    preto = material("#15171b", 0.38),
    prata = material("#b7b7b1", 0.3);
  const perfil = [
    [0, -1.52],
    [0.25, -1.52],
    [0.31, -1.42],
    [0.34, -1.3],
    [0.34, 0.32],
    [0.36, 0.41],
    [0.36, 0.58],
    [0.31, 0.64],
    [0, 0.64],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  malha(new THREE.LatheGeometry(perfil, 72), metal, grupo);
  for (let i = 0; i < 4; i++) {
    const a = anel(0.345, 0.012, grupo, preto);
    a.rotation.x = Math.PI / 2;
    a.position.y = -1.28 + i * 0.075;
  }
  // Cápsula escura atrás da trama metálica.
  malha(
    new THREE.CapsuleGeometry(0.315, 0.76, 6, 32),
    preto,
    grupo,
    [0, 1.01, 0],
  );
  const grade = new THREE.Group();
  grupo.add(grade);
  // Linhas circunferenciais e meridianos, unidos numa geometria para reduzir draw calls.
  const pontos: number[] = [];
  const segmento = (a: THREE.Vector3, b: THREE.Vector3) => {
    pontos.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };
  const raio = (y: number) => {
    const d = Math.max(0, Math.abs(y - 1.02) - 0.39);
    return Math.sqrt(Math.max(0.0001, 0.346 * 0.346 - d * d));
  };
  for (let j = 0; j < 42; j++) {
    const y = 0.3 + (j * 1.43) / 41,
      r = raio(y);
    for (let k = 0; k < 72; k++) {
      const a = (k * TAU) / 72,
        b = ((k + 1) * TAU) / 72;
      segmento(
        new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r),
        new THREE.Vector3(Math.cos(b) * r, y, Math.sin(b) * r),
      );
    }
  }
  for (let k = 0; k < 56; k++) {
    const a = (k * TAU) / 56;
    for (let j = 0; j < 35; j++) {
      const y = 0.3 + (j * 1.43) / 35,
        z = 0.3 + ((j + 1) * 1.43) / 35;
      segmento(
        new THREE.Vector3(Math.cos(a) * raio(y), y, Math.sin(a) * raio(y)),
        new THREE.Vector3(Math.cos(a) * raio(z), z, Math.sin(a) * raio(z)),
      );
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pontos, 3));
  grade.add(
    new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({ color: "#92958f" }),
    ),
  );
  for (const y of [0.35, 1.64]) {
    const a = anel(y === 0.35 ? 0.35 : 0.28, 0.024, grupo, prata);
    a.rotation.x = Math.PI / 2;
    a.position.y = y;
  }
  for (let k = 0; k < 4; k++) {
    const a = (k * Math.PI) / 2;
    const barra = malha(
      new THREE.BoxGeometry(0.035, 1.24, 0.025),
      metal,
      grupo,
      [Math.cos(a) * 0.351, 1, Math.sin(a) * 0.351],
    );
    barra.rotation.y = -a;
  }
  // Selo do fabricante sem marca fictícia: uma pastilha de metal polido.
  malha(
    new THREE.BoxGeometry(0.16, 0.24, 0.024),
    prata,
    grupo,
    [0, -0.53, 0.348],
  );
  // Aranha: dois aros, hastes e elásticos cruzados reais.
  for (const y of [-0.98, -0.6]) {
    const a = anel(0.64, 0.026, grupo, preto);
    a.rotation.x = Math.PI / 2;
    a.position.y = y;
  }
  const entre = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    r: number,
    mat: THREE.Material,
  ) => {
    const d = b.clone().sub(a);
    const m = malha(
      new THREE.CylinderGeometry(r, r, d.length(), 8),
      mat,
      grupo,
    );
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  };
  for (let k = 0; k < 8; k++) {
    const a = (k * TAU) / 8,
      b = a + TAU / 8;
    entre(
      new THREE.Vector3(Math.cos(a) * 0.64, -0.98, Math.sin(a) * 0.64),
      new THREE.Vector3(Math.cos(b) * 0.36, -0.55, Math.sin(b) * 0.36),
      0.012,
      prata,
    );
    entre(
      new THREE.Vector3(Math.cos(a) * 0.64, -0.6, Math.sin(a) * 0.64),
      new THREE.Vector3(Math.cos(b) * 0.36, -1.12, Math.sin(b) * 0.36),
      0.012,
      preto,
    );
  }
  entre(
    new THREE.Vector3(0.62, -0.8, 0),
    new THREE.Vector3(1.1, -1.2, 0),
    0.07,
    preto,
  );
  const conector = malha(
    new THREE.CylinderGeometry(0.12, 0.12, 0.35, 24),
    metal,
    grupo,
    [0, -1.68, 0],
  );
  conector.rotation.z = 0.12;
  grupo.rotation.set(0.12, -0.45, -0.15);
  return grupo;
}

export function descartarObjeto(objeto: THREE.Object3D) {
  const geometrias = new Set<THREE.BufferGeometry>(),
    materiais = new Set<THREE.Material>();
  objeto.traverse((no) => {
    if (no instanceof THREE.Mesh || no instanceof THREE.LineSegments) {
      geometrias.add(no.geometry);
      for (const m of Array.isArray(no.material) ? no.material : [no.material])
        materiais.add(m);
    }
  });
  geometrias.forEach((g) => g.dispose());
  materiais.forEach((m) => m.dispose());
}

/** O fallback usa as mesmas geometrias, luzes, câmera e ambiente da ilha. */
export function renderizarFallback(
  tipo: "diafragma" | "microfone",
  canvas: HTMLCanvasElement,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(1200, 1200);
  renderer.setPixelRatio(1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const cena = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.z = 6.8;
  const ambiente = criarAmbiente(renderer);
  cena.environment = ambiente.texture;
  cena.environmentIntensity = 1.35;
  cena.add(new THREE.AmbientLight("#ffffff", 0.2));
  const principal = new THREE.DirectionalLight("#fff8e9", 3);
  principal.position.set(2, 4, 6);
  cena.add(principal);
  const recorte = new THREE.DirectionalLight("#dce7ef", 1.3);
  recorte.position.set(-4, 1, 2);
  cena.add(recorte);
  const objeto = tipo === "diafragma" ? criarDiafragma() : criarMicrofone();
  cena.add(objeto);
  if (tipo === "diafragma") objeto.rotation.set(0.16, -0.2, -0.08);
  renderer.render(cena, camera);
  const url = canvas.toDataURL("image/webp", 0.94);
  descartarObjeto(objeto);
  ambiente.dispose();
  renderer.dispose();
  return url;
}
