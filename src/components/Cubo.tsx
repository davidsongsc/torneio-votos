import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const Cubo: React.FC = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  const selectedSpheres = useRef<THREE.Mesh[]>([]);
  const isMerging = useRef(false);

  useEffect(() => {
    scene.castShadow = true;
    scene.receiveShadow = true;

    camera.position.set(7, 5, 6);
    camera.lookAt(0, 0, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 2, 2);
    light.castShadow = true;
    scene.add(light);

    light.castShadow = true;
    light.shadow.mapSize.width = 124;
    light.shadow.mapSize.height = 124;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const createSphere = (color: number, x: number, name: string): THREE.Mesh => {
      const geometry = new THREE.SphereGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, 1, 1);
      sphere.name = name;
      scene.add(sphere);

      sphere.addEventListener('click', () => {
        console.log(`Clicou na esfera:`, sphere.name);

        if (selectedSpheres.current.length < 2) {
          selectedSpheres.current.push(sphere);
          sphere.visible = false;

          if (selectedSpheres.current.length === 2) {
            animateMerge();
          }

          gsap.to(sphere.scale, {
            x: 4,
            y: 3,
            z: 4,
            duration: 1,
          });
        }
      });

      return sphere;
    };

    const redSphere: THREE.Mesh = createSphere(0xff0000, -3, 'Sphere 1');
    const blueSphere: THREE.Mesh = createSphere(0x0000ff, 3, 'Sphere 2');
    const greenSphere: THREE.Mesh = createSphere(0x00FF00, 0, 'Sphere 3');
    const canvasWidth = 400;
    const canvasHeight = 400;

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    const canvasElement = renderer.domElement;
    document.body.appendChild(canvasElement);
  
    // Aplicar estilos para centralizar o canvas
    canvasElement.style.display = 'block';
    canvasElement.style.margin = '50px auto';
    canvasElement.style.borderRadius = '50px';
    canvasElement.style.position = 'relative';
    canvasElement.style.zIndex = '1';
    
    
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isMerging.current) {
        // Orbit red sphere
        redSphere.position.x = Math.cos(performance.now() * 0.001) * 3;
        redSphere.position.z = Math.sin(performance.now() * 0.001) * 3;

        // Orbit blue sphere
        blueSphere.position.x = Math.cos(performance.now() * 0.001) * -3;
        blueSphere.position.z = Math.sin(performance.now() * 0.001) * -3;

        // Orbit green sphere
        greenSphere.position.x = Math.cos(performance.now() * 0.001) * 1;
        greenSphere.position.z = Math.sin(performance.now() * 0.001) * -1;
      }

      renderer.render(scene, camera);
    };

    const animateMerge = () => {
      if (selectedSpheres.current.length === 2) {
        const sphere1 = selectedSpheres.current[0];
        const sphere2 = selectedSpheres.current[1];

        const color1 = (sphere1.material as THREE.MeshStandardMaterial).color.clone();
        const color2 = (sphere2.material as THREE.MeshStandardMaterial).color.clone();

        const mergedColor = new THREE.Color();
        mergedColor.addColors(color1, color2);

        const mergedMaterial = new THREE.MeshStandardMaterial({ color: mergedColor });

        const mergedSphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), mergedMaterial);
        mergedSphere.position.set(0, 0, 0);

        scene.add(mergedSphere);

        scene.remove(sphere1);
        scene.remove(sphere2);

        selectedSpheres.current = [];
        isMerging.current = false;
      }
    };

    animate();

    return () => {
      renderer.domElement.remove();
    };
  }, []);

  return null;
};

export default Cubo;
