<template>
    <div>
        <div id="container">

        </div>
    </div>
</template>
  <!-- 环境光与点光源 -->
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
// scene.fog == new THREE.Fog(0xcccccc, 10, 15)
//    创建相机
const camera = new THREE.PerspectiveCamera()
camera.position.z = 2
camera.position.y = 10

// 创建立方体
const geometry = new THREE.BoxGeometry(1,1,1);
//材质
const material= new THREE.MeshPhongMaterial({
    color:0x0099ff,
    shininess:1000
})
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0.5,0)
// 物体能够接收光源
cube.receiveShadow=true
// 物体能够投射光源
cube.castShadow=true
//    内容添加进场景
scene.add(cube);
// 添加环境光
const light = new THREE.AmbientLight( 0xffffff ,1); // soft white light
scene.add( light );
// 添加点光源
const pointlight = new THREE.PointLight( 0xffffff, 100, 100 );
pointlight.position.set( 5, 3, 5 );
pointlight.castShadow=true
scene.add( pointlight );
// 创建地面
const meshfloor= new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshPhongMaterial({color:0x1b5e20})
)
// 地面也要有接受光源
meshfloor.receiveShadow=true
meshfloor.rotation.x-=Math.PI/2
scene.add(meshfloor)
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
axesHelper.position.set(0, 0, 0)
scene.add(axesHelper);
// 调整渲染器窗口的大小
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled=true

// 添加网格地面
// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)

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
  