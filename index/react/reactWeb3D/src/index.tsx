import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MyComponent = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 'red' });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const axesHelper = new THREE.AxesHelper(400);
        scene.add(axesHelper);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(35, width / height, 1, 4500);
        camera.position.set(500, 500, 500);
        camera.lookAt(mesh.position);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        mountRef.current?.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef}></div>;
};

export default MyComponent;
