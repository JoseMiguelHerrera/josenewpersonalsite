// src/components/AsciiArtScene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';

const AsciiArtScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Ensure width and height are valid
    if (width === 0 || height === 0) {
      console.error("Canvas element has zero width or height");
      return;
    }

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // Create ASCII effect
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: false,block: false,scale:1, resolution: 0.15 });
    effect.setSize(width, height);
    mount.appendChild(effect.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Handle window resize
    const handleResize = () => {
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;

      // Ensure newWidth and newHeight are valid
      if (newWidth === 0 || newHeight === 0) {
        console.error("New canvas element size is zero");
        return;
      }

      renderer.setSize(newWidth, newHeight);
      effect.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      effect.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (effect.domElement && mount.contains(effect.domElement)) {
        mount.removeChild(effect.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default AsciiArtScene;
