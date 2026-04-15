import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

interface CathedralViewerProps {
  className?: string;
  style?: React.CSSProperties;
  showControls?: boolean;
}

// All fog applied per-fragment in the material — no post-processing.
// Anti-aliased edge pixels blend the already-fogged color with the background,
// so no silhouette artifact is possible.
const vertexShader = `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vViewDepth;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPos = viewMatrix * wp;
    vViewDepth = -viewPos.z;
    gl_Position = projectionMatrix * viewPos;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uFogColor;
  uniform vec3 uLightDir;
  uniform float uDepthFogNear;
  uniform float uDepthFogFar;
  uniform float uHeightFogBottom;
  uniform float uHeightFogTop;

  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vViewDepth;

  void main() {
    float diff = max(dot(vNormal, uLightDir), 0.0);
    vec3 lit = uColor * (0.75 + diff * 0.10);

    // Depth fog (distance from camera)
    float depthFog = smoothstep(uDepthFogNear, uDepthFogFar, vViewDepth);

    // Height fog — power-skewed quintic: stretches the clear transition at the top
    float t = clamp((vWorldPos.y - uHeightFogBottom) / (uHeightFogTop - uHeightFogBottom), 0.0, 1.0);
    t = pow(t, 0.5); // skew: fog clears earlier, tail lingers longer toward 0%
    float heightFog = 1.0 - t * t * t * (t * (t * 6.0 - 15.0) + 10.0);

    float fog = max(depthFog, heightFog);
    gl_FragColor = vec4(mix(lit, uFogColor, fog), 1.0);
  }
`;

const CathedralViewer = ({ className, style, showControls = false }: CathedralViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const boundsRef = useRef({ yMin: -50, yMax: 50 });

  const [offsetX, setOffsetX] = useState(4.0);
  const [offsetZ, setOffsetZ] = useState(7.0);
  const [fogBottomPct, setFogBottomPct] = useState(5);
  const [fogTopPct, setFogTopPct] = useState(100);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.position.x = offsetX;
      innerRef.current.position.z = offsetZ;
    }
  }, [offsetX, offsetZ]);

  useEffect(() => {
    if (materialRef.current) {
      const { yMin, yMax } = boundsRef.current;
      const yRange = yMax - yMin;
      materialRef.current.uniforms.uHeightFogBottom.value = yMin + yRange * (fogBottomPct / 100);
      materialRef.current.uniforms.uHeightFogTop.value = yMin + yRange * (fogTopPct / 100);
    }
  }, [fogBottomPct, fogTopPct]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Exact sRGB values for hsl(48, 15%, 94%) — hardcoded so LinearSRGBColorSpace
    // output matches CSS pixel-for-pixel (no gamma conversion to mismatch).
    const fogColor = new THREE.Color(0.949, 0.9454, 0.931);
    const scene = new THREE.Scene();
    scene.background = fogColor;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    // Camera at ~75% of model height, looking slightly down
    camera.position.set(0, 15, 140);
    camera.lookAt(0, -5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color().setHSL(25 / 360, 0.25, 0.35) },
        uFogColor: { value: fogColor.clone() },
        uLightDir: { value: new THREE.Vector3(0.4, 0.8, 0.6).normalize() },
        uDepthFogNear: { value: 80.0 },
        uDepthFogFar: { value: 200.0 },
        uHeightFogBottom: { value: -50.0 },
        uHeightFogTop: { value: 0.0 },
      },
    });
    materialRef.current = material;

    const pivot = new THREE.Group();
    const inner = new THREE.Group();
    pivot.add(inner);
    scene.add(pivot);
    innerRef.current = inner;
    inner.position.x = offsetX;
    inner.position.z = offsetZ;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load("/notre-dame.glb", (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 100 / maxDim;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));

      inner.add(model);

      const scaledBox = new THREE.Box3().setFromObject(inner);
      boundsRef.current = { yMin: scaledBox.min.y, yMax: scaledBox.max.y };
      const yRange = scaledBox.max.y - scaledBox.min.y;
      material.uniforms.uHeightFogBottom.value = scaledBox.min.y + yRange * (fogBottomPct / 100);
      material.uniforms.uHeightFogTop.value = scaledBox.min.y + yRange * (fogTopPct / 100);

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
    });

    // Drag to rotate
    let isDragging = false;
    let prevX = 0;
    let dragVelocity = 0;
    const canvas = renderer.domElement;

    canvas.addEventListener("pointerdown", (e) => {
      isDragging = true;
      prevX = e.clientX;
      dragVelocity = 0;
      canvas.style.cursor = "grabbing";
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      dragVelocity = dx * 0.005;
      pivot.rotation.y += dragVelocity;
      prevX = e.clientX;
    });
    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);
    canvas.style.cursor = "grab";

    let animationId: number;
    const autoSpeed = 0.0015;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isDragging) {
        // Decay drag velocity back toward auto-rotation
        dragVelocity *= 0.95;
        pivot.rotation.y += autoSpeed + dragVelocity;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {showControls && (
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 8,
            zIndex: 10,
            background: "rgba(255,255,255,0.9)",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: 11,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: "monospace",
          }}
        >
          <style>{`
            .cathedral-controls input[type="range"] {
              accent-color: hsl(25, 25%, 35%);
            }
          `}</style>
          <div className="cathedral-controls" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>
              E/W: {offsetX.toFixed(1)}
              <input type="range" min={-20} max={20} step={0.5} value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))} style={{ width: 100, marginLeft: 6 }} />
            </label>
            <label>
              N/S: {offsetZ.toFixed(1)}
              <input type="range" min={-20} max={20} step={0.5} value={offsetZ}
                onChange={(e) => setOffsetZ(Number(e.target.value))} style={{ width: 100, marginLeft: 6 }} />
            </label>
            <hr style={{ margin: 0, borderColor: "#ccc" }} />
            <label>
              Fog 100%: {fogBottomPct}%
              <input type="range" min={0} max={50} step={1} value={fogBottomPct}
                onChange={(e) => setFogBottomPct(Number(e.target.value))} style={{ width: 100, marginLeft: 6 }} />
            </label>
            <label>
              Fog 0%: {fogTopPct}%
              <input type="range" min={20} max={100} step={1} value={fogTopPct}
                onChange={(e) => setFogTopPct(Number(e.target.value))} style={{ width: 100, marginLeft: 6 }} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CathedralViewer;
