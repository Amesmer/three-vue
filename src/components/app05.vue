<template>
    <div>
        <div id="container">

        </div>
    </div>
</template>
  <!-- vector3 向量-->
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
const material= new THREE.MeshBasicMaterial({
    color:0x0099ff
})

const vector= new THREE.Vector3(1,1,1)
console.log(vector);
const cube = new THREE.Mesh(geometry, material);
// cube.position.set(1,1,1)
// cube.position.x=1
// cube.position.y=1
// cube.position.add(vector)
console.log(cube.position.clone(),'current position');
// 局部缩放
// cube.position.addScalar(1) //位置
// cube.scale.set(2,3,3)  //大小
// 平移
cube.translateX(1)

// 显示 隐藏
// cube.visible=false
const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 1, 1, 1 );

const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -1, -1, -1 );

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add( cubeA );
group.add( cubeB );
group.position.x=2
//    内容添加进场景
// scene.add(cube);
scene.add(group);



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
  