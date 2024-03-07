<template>
    <div>
        <div id="container">

        </div>
    </div>
</template>
  <!-- uv -->
<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue'



//创建场景------------------------
const scene = new THREE.Scene()
// 添加背景颜色
scene.background = new THREE.Color(0x666666)
// 添加背景图片  图片宽高要一样
// 创建雾
scene.fog == new THREE.Fog(0xcccccc, 10, 15)
//    创建相机
const camera = new THREE.PerspectiveCamera()
camera.position.z = 10
camera.position.y = 2

// 创建矩形
const geometry = new THREE.PlaneGeometry(1,1);

// 创建纹理
const texture= new THREE.TextureLoader().load('/textures/wall.jpg')
// 定义uv像素的取值范围 左上 右上 左下 右下
const uv= new Float32Array([
    0,0.5,
    .5,.5,
    0,0,
    .5,0
])
// const uv= new Float32Array([
//     0,1,
//     1,1,
//     0,0,
//     1,0
// ])
geometry.attributes.uv=new THREE.BufferAttribute(uv ,2)
//材质
const material= new THREE.MeshBasicMaterial({
    map:texture
})

const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0, 3, 0)
//    内容添加进场景
scene.add(mesh);
// 创建渲染器
const renderer = new THREE.WebGLRenderer();

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加阻尼
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.autoRotateSpeed = 0.5
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 3, 0)
scene.add(axesHelper);
// 调整渲染器窗口的大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 添加网格地面
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

// 动画效果
const animate = () => {
    // 告诉浏览器 你希望执行一个动画 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画 该方法需要传入一个回掉函数作为参数
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
}

onMounted(() => {
    // 在页面中将canvas加入
    document.getElementById('container').appendChild(renderer.domElement);
    animate()
})

</script>
  
<style>
#gui {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
}
</style>
  