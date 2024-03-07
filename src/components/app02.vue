<template>
    <div>
        <div id="container">

        </div>
    </div>
</template>
  
<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue'
import * as dat from 'dat.gui';
// 创建控制对象-----------------dat gui
const controlData = {
    rotationSpeed: 0.01,
    color: '#66ccff',
    wireframe: false,
    envMap: '无'
}
const gui = new dat.GUI()
const f = gui.addFolder('配置')
// f.add(controlData,'rotationSpeed',0.01,0.1,0.01)

f.add(controlData, 'rotationSpeed').min(0.01).max(0.1).step(0.01)
//    颜色选择器
f.addColor(controlData, 'color')
//    下拉列表
f.add(controlData, 'envMap', ['无', '全反射', '漫反射'])
// checkbox
f.add(controlData, 'wireframe')

f.domElement.id = 'gui'
f.open()


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


const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,

    // 1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    // -1.0, -1.0, 1.0
]);

// itemSize = 3 因为每个顶点都是一个三元组。
// 确认集合体顶点 
// 利用索引来确定几何体的绘制方式


geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial(
    {
        color: 0xff0000,
        side: THREE.DoubleSide,
        wireframe: true
    });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0, 3, 0)
//    内容添加进场景
scene.add(mesh);


// 创建渲染器
const renderer = new THREE.WebGLRenderer();

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    // console.log('触发change');
})
// 添加阻尼
controls.enableDamping = true
controls.dampingFactor = 0.05
// 自动旋转
// controls.autoRotate =true
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


    material.wireframe = controlData.wireframe

    renderer.render(scene, camera);
}

onMounted(() => {
    document.getElementById('container').appendChild(f.domElement);

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
  