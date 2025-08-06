import { useEffect, useRef } from 'react';
import * as THREE from 'three';
 import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module';
const MyComponent = () => {


    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const stats =new Stats()
        // 场景
        const scene = new THREE.Scene();

        // 立方体
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial({
            color: 0x6a7a8a,
            transparent: true,
            opacity: 0.5,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const  number= 3000
        for (let i = 0; i < number; i++) {
            const geometry = new THREE.BoxGeometry(10, 10, 10);
            const material = new THREE.MeshLambertMaterial({
                color: 0x6a7a8a,
                transparent: true,
                opacity: 0.5,
            });
            const mesh = new THREE.Mesh(geometry, material);
            const x=(Math.random()-0.5)*100;
            const y=(Math.random()-0.5)*100;
            const z=(Math.random()-0.5)*100;
             mesh.position.set(x,y,z);
             scene.add(mesh);
        }



        // 坐标辅助
        scene.add(new THREE.AxesHelper(400));

        // 相机
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(35, width / height, 1, 4500);
        camera.position.set(500, 500, 500);
        camera.lookAt(mesh.position);

        // 渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current?.appendChild(renderer.domElement);
        mountRef.current?.appendChild(stats.dom)

        // 光源
        const point = new THREE.PointLight(0xffffff, 1, 2000, 2);
        point.position.set(200, 200, 0);
        scene.add(point);
        const directionalLight = new THREE.DirectionalLight('red',3);
        directionalLight.position.set(100,200,0)
        directionalLight.target=mesh//默认原点
        scene.add(directionalLight);
        scene.add(directionalLight.target);

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,20)
        scene.add(directionalLightHelper);
        scene.add(new THREE.PointLightHelper(point, 10));

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const Orbit = new OrbitControls(camera,renderer.domElement);
        Orbit.addEventListener("change", (e) => {
            renderer.render(scene, camera);
        })
        // 动画
        let animationId: number;
        const clock = new THREE.Clock();
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const fps=clock.getDelta()*1000
            stats.update()
            console.log(animationId,fps);
            mesh.rotation.x += 0.01;
            mesh.rotateY(0.01)

            renderer.render(scene, camera);
        };
        animate();
        renderer.render(scene, camera);

        //查看渲染帧率

        window.onresize=function (){
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            //更新相机矩阵
            camera.updateProjectionMatrix();
        }
        // 清理
        return () => {
            cancelAnimationFrame(animationId);
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef}></div>;
};

export default MyComponent;
