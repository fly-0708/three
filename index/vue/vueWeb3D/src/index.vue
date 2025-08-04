<script lang="ts" setup>
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {onMounted} from "vue";

// 创建场景
const Scene = new THREE.Scene();
//添加物体
const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质
const material = new THREE.MeshLambertMaterial({
  color: 'red',//颜色
  transparent: true,//是否透明
  opacity: 1,
});
//创建网格模型：表示生活中的物体
const mesh = new THREE.Mesh(geometry, material);
//设置网格模型的位置
mesh.position.set(0, 0, 0);
//将网格模型添加到场景中
Scene.add(mesh);
//添加辅助坐标系
/**
 * 尺寸
 *rgb=>xyz
 * */
const axesHelper = new THREE.AxesHelper(200);
Scene.add(axesHelper);

//生成的canvas画布单位是像素
const width = window.innerWidth;
const height =window.innerHeight;

/**
 * 创建透视投影相机
 * fov:垂直事业角度
 * aspect:视窗宽高比
 * near:近端面
 * far:远端面
 */
const camera = new THREE.PerspectiveCamera(35, width / height, 10, 4500);
//设置相机位置
//远近 上下  左右
camera.position.set(400, 400, 400);
//设置相机朝向/方向
// camera.lookAt(0,0,0);
camera.lookAt(mesh.position);
//环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
Scene.add(ambientLight);
//光源
const point = new THREE.PointLight(
    'red',
    1,
    0,
)
point.position.set(200, 100, 100);
Scene.add(point);
//渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染的尺寸大小
renderer.setSize(width, height);
//将webgl渲染的canvas内容添加到body
//渲染
renderer.render(Scene, camera);
//将渲染器添加到body

//相机控件
const Controls = new OrbitControls(camera, renderer.domElement);
Controls.addEventListener("change", (e) => {
  renderer.render(Scene, camera);
})
onMounted(() => {
  const container = document.getElementById('threeDocument')
  if (container) {
    container.appendChild(renderer.domElement)
    renderer.render(Scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(Scene, camera)
  }
  animate()
})
</script>

<template>
  <div class="three" id="threeDocument"></div>
</template>

<style scoped>
.three{
  flex: 1;
}
</style>
