/* ================================================================
   OMC — WebGL coin signature (OGL)
   Single Plane mesh + custom shader emulates a slowly spinning
   metallic coin with copper specular sweep.
   - Pauses via IntersectionObserver when out of view
   - Degrades to SVG (CSS) when WebGL unavailable, reduced-motion,
     or touch device with small screen
   ================================================================ */
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'https://cdn.jsdelivr.net/npm/ogl@1.0.7/+esm';

const stage = document.getElementById('coinStage');
if (!stage) { /* nothing */ }
else {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 768px)').matches;
  if (reduceMotion || mobile) {
    // keep SVG fallback
  } else {
    try {
      const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2), antialias: true });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      stage.appendChild(gl.canvas);
      gl.canvas.style.position = 'absolute';
      gl.canvas.style.inset = '0';

      const geometry = new Triangle(gl);

      const vert = /* glsl */`
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = /* glsl */`
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2  uRes;

        // Hash & noise (paper grain)
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0 - 2.0*f);
          return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
        }

        void main() {
          // Coordinates centered, aspect preserved
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= uRes.x / uRes.y;

          float r = length(uv);

          // Coin radius
          float R = 0.78;

          // Outer falloff
          float disc = smoothstep(R, R - 0.005, r);
          if (disc < 0.001) { discard; }

          // Base radial gradient — copper tones
          vec3 cInner = vec3(0.91, 0.76, 0.56); // E8C290
          vec3 cMid   = vec3(0.72, 0.47, 0.29); // B8794A
          vec3 cOuter = vec3(0.42, 0.25, 0.12); // 6B3F1F
          float t = clamp(r / R, 0.0, 1.0);
          vec3 base = mix(cInner, cMid, smoothstep(0.0, 0.65, t));
          base = mix(base, cOuter, smoothstep(0.65, 1.0, t));

          // Pseudo-3D tilt — vary highlight position with time
          float ang = atan(uv.y, uv.x);
          float tilt = uTime * 0.35;
          // Specular sweep: bright arc that rotates
          float spec = pow(max(0.0, cos(ang - tilt)), 6.0);
          spec *= (1.0 - smoothstep(0.0, R, r));
          // Secondary highlight (top-left)
          float spec2 = pow(max(0.0, cos(ang + 1.2 - tilt * 0.4)), 14.0);
          spec2 *= smoothstep(0.05, 0.6, r);

          vec3 col = base;
          col += vec3(0.95, 0.85, 0.65) * spec * 0.55;
          col += vec3(1.0, 0.92, 0.75) * spec2 * 0.4;

          // Inner ring (engraved circle ~ r=0.62)
          float ring = smoothstep(0.006, 0.0, abs(r - 0.62));
          col = mix(col, vec3(0.96, 0.94, 0.86), ring * 0.55);

          // Outer thin ring (mint line)
          float rimRing = smoothstep(0.004, 0.0, abs(r - R + 0.012));
          col = mix(col, vec3(0.22, 0.13, 0.06), rimRing * 0.65);

          // Subtle paper grain on top
          float g = noise(vUv * 380.0 + uTime * 0.02);
          col += (g - 0.5) * 0.04;

          // Soft edge alpha
          float edge = smoothstep(R, R - 0.025, r);
          float alpha = edge;

          gl_FragColor = vec4(col, alpha * disc);
        }
      `;

      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          uTime: { value: 0 },
          uRes:  { value: new Vec2(1, 1) },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });

      function resize() {
        const rect = stage.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h);
        program.uniforms.uRes.value.set(w, h);
      }
      resize();
      window.addEventListener('resize', resize);

      // Pause when offscreen
      let visible = true;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { visible = e.isIntersecting; }),
        { rootMargin: '100px' }
      );
      io.observe(stage);

      stage.classList.add('has-webgl');

      let t0 = performance.now();
      function tick(t) {
        const dt = (t - t0) / 1000;
        if (visible) {
          program.uniforms.uTime.value = dt;
          renderer.render({ scene: mesh });
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    } catch (err) {
      // WebGL not available — leave SVG fallback as is
      console.warn('[OMC coin] WebGL init failed, using SVG fallback', err);
    }
  }
}
