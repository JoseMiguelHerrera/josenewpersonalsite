// src/components/AsciiChainScene.jsx
// ASCII blockchain: blocks are mined, confirmed, linked, and the chain advances.
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const HEX = '0123456789abcdef';
const randHex = (n) => Array.from({ length: n }, () => HEX[(Math.random() * 16) | 0]).join('');

const COLOR = '#35F06A';
const ACCENT = '#2FE6E6';
const BRIGHT = '#CFFFE2';

export default function AsciiChainScene() {
  const hostRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cleanup = () => {};
    let disposed = false;

    const bg = document.createElement('canvas');
    bg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none';
    host.appendChild(bg);

    const mount = document.createElement('div');
    mount.style.cssText = 'position:relative;z-index:1;width:100%;height:calc(100% - 14px)';
    host.appendChild(mount);

    const color = COLOR;
    const accent = ACCENT;
    const bright = BRIGHT;

    const readout = document.createElement('div');
    readout.style.cssText =
      'position:absolute;left:8px;right:8px;bottom:3px;display:flex;justify-content:space-between;' +
      'gap:8px;font:400 10px/1.2 inherit;letter-spacing:.08em;pointer-events:none;white-space:nowrap;overflow:hidden';
    const heightEl = document.createElement('span');
    const hashEl = document.createElement('span');
    heightEl.style.color = '#1E9B52';
    hashEl.style.color = accent;
    readout.append(heightEl, hashEl);
    host.appendChild(readout);

    // background: dim hex rain drifting behind the chain
    const ctx = bg.getContext('2d');
    let cols = [], rowH = 11;
    const sizeBg = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      bg.width = w * dpr; bg.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '9px ui-monospace, monospace';
      const cw = 9;
      const n = Math.ceil(w / cw);
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * cw,
        y: Math.random() * h,
        speed: 4 + Math.random() * 14,
        len: 4 + ((Math.random() * 7) | 0),
        chars: Array.from({ length: 12 }, () => HEX[(Math.random() * 16) | 0])
      }));
    };
    sizeBg();

    let bgAcc = 0;
    const drawBg = (dt, h) => {
      bgAcc += dt;
      ctx.clearRect(0, 0, bg.width, bg.height);
      for (const c of cols) {
        c.y += c.speed * dt;
        if (c.y - c.len * rowH > h) { c.y = -Math.random() * 40; c.speed = 4 + Math.random() * 14; }
        for (let k = 0; k < c.len; k++) {
          const y = c.y - k * rowH;
          if (y < -rowH || y > h) continue;
          const fade = (1 - k / c.len) * 0.16;
          ctx.fillStyle = 'rgba(53,240,106,' + fade.toFixed(3) + ')';
          ctx.fillText(c.chars[(k + ((bgAcc * 3) | 0)) % c.chars.length], c.x, y);
        }
      }
    };

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, width / height, 0.1, 100);
    camera.position.set(-0.75, 0.55, 6.0);
    camera.lookAt(-0.75, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(width, height);

    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true, block: false, scale: 1, resolution: 0.3 });
    effect.setSize(width, height);
    const el = effect.domElement;
    el.style.color = color;
    el.style.backgroundColor = 'transparent';
    mount.appendChild(el);

    const group = new THREE.Group();
    scene.add(group);

    const BLOCK = 0.95, SLOT = 1.5, KEEP = 3;
    const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, shininess: 8 });
    scene.add(new THREE.AmbientLight(0xffffff, 0.22));
    const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(1.6, 1.5, 4.2); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5); rim.position.set(-3, 1.2, -2); scene.add(rim);
    const boxGeo = new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK);
    const linkGeo = new THREE.BoxGeometry(SLOT - BLOCK, 0.1, 0.1);

    const blocks = new Map();
    const makeBlock = (index, scale) => {
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.position.x = index * SLOT;
      mesh.scale.setScalar(scale);
      group.add(mesh);
      const link = new THREE.Mesh(linkGeo, mat);
      link.position.x = index * SLOT - SLOT / 2;
      link.scale.x = 0;
      group.add(link);
      const b = { mesh, link, index };
      blocks.set(index, b);
      return b;
    };

    let head = 2;
    for (let i = 0; i <= head; i++) {
      const b = makeBlock(i, 1);
      if (i > 0) b.link.scale.x = 1;
    }
    group.position.x = -head * SLOT;

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h); effect.setSize(w, h); sizeBg();
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => onResize());
    ro.observe(host);
    cleanup = () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      renderer.dispose();
      boxGeo.dispose(); linkGeo.dispose(); mat.dispose();
      host.innerHTML = '';
    };
    onResize();

    const MINE = 2.1, CONFIRM = 0.45, SHIFT = 0.85;
    const CYCLE = MINE + CONFIRM + SHIFT;

    let t = 0, last = performance.now(), cycleIndex = 0;
    let pending = null, shiftFrom = group.position.x, flash = 0;
    let blockHeight = 812443 + Math.floor(Math.random() * 400);

    const startCycle = () => {
      pending = makeBlock(head + 1, 0.22);
      pending.mesh.rotation.set(0.6, 0.8, 0.3);
    };
    startCycle();

    const animate = () => {
      if (disposed) return;
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      let p = t - cycleIndex * CYCLE;
      if (p >= CYCLE) {
        for (const [i, b] of blocks) {
          if (i <= head - KEEP) { group.remove(b.mesh); group.remove(b.link); blocks.delete(i); }
        }
        cycleIndex++;
        p -= CYCLE;
        startCycle();
      }

      // settled blocks: slow synchronized breathing tilt
      const tilt = Math.sin(t * 0.5) * 0.16;
      for (const [i, b] of blocks) {
        if (pending && i === pending.index && p < MINE + CONFIRM) continue;
        b.mesh.rotation.x = tilt * 0.7;
        b.mesh.rotation.y = 0.62 + Math.sin(t * 0.32 + i * 0.5) * 0.12;
        b.mesh.rotation.z = 0;
      }

      if (p < MINE) {
        // mining: candidate block spins hard and pulses, hash churns
        const k = p / MINE;
        const m = pending.mesh;
        m.rotation.x += 0.09 + k * 0.06;
        m.rotation.y += 0.12 + k * 0.08;
        m.scale.setScalar(0.2 + 0.05 * Math.sin(t * 18) + k * 0.12);
        if (Math.random() < 0.6) {
          hashEl.textContent = '0x' + randHex(4) + '…' + randHex(4);
          hashEl.style.color = '#1E9B52';
        }
        heightEl.textContent = 'MINING #' + (blockHeight + 1);
      } else if (p < MINE + CONFIRM) {
        // confirmed: snaps to alignment, chain flashes
        const k = easeOut((p - MINE) / CONFIRM);
        const m = pending.mesh;
        m.scale.setScalar(0.32 + 0.68 * k);
        m.rotation.x += (0 - m.rotation.x) * 0.24;
        m.rotation.y += (0.62 - m.rotation.y) * 0.24;
        flash = Math.max(flash, 1 - k * 0.6);
        if (hashEl.style.color !== accent) {
          blockHeight += 1;
          hashEl.textContent = '0x' + randHex(4) + '…' + randHex(4);
          hashEl.style.color = accent;
          heightEl.textContent = 'BLOCK #' + blockHeight;
        }
      } else {
        // link forms and the chain advances one slot
        const k = easeInOut((p - MINE - CONFIRM) / SHIFT);
        pending.link.scale.x = k;
        if (head !== pending.index) { shiftFrom = group.position.x; head = pending.index; }
        group.position.x = shiftFrom + (-head * SLOT - shiftFrom) * k;
      }

      flash = Math.max(0, flash - dt * 2.2);
      el.style.color = flash > 0.02 ? (flash > 0.55 ? bright : accent) : color;

      drawBg(dt, host.clientHeight);
      effect.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      cleanup();
    };
  }, []);

  return <div ref={hostRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} />;
}
