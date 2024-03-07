<template>
  <div>
    <div id="container">
      <button @click="movePerspectCamera">移动透视相机</button>
      <button @click="moveCube">移动cube</button>
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

f.domElement.id='gui'
f.open()


//创建场景------------------------
const scene = new THREE.Scene()
// 添加背景颜色
// scene.background = new THREE.Color(0x666666)
// 添加背景图片  图片宽高要一样
// scene.background = new THREE.CubeTextureLoader().setPath('/').load(['01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg'])
// 创建雾
scene.fog == new THREE.Fog(0xcccccc, 10, 15)
//    创建相机
const camera = new THREE.PerspectiveCamera()
camera.position.z = 10
camera.position.y = 2

// 创建立方体
const geometry = new THREE.BoxGeometry();
// 创建纹理
const texture = new THREE.TextureLoader().load( "textures/wall.jpg" );
// 创建立体纹理
// const loader = new THREE.CubeTextureLoader();
// loader.setPath( 'textures/cubetexture/' );
// 左右 上下 前后
// const textureCube = loader.load( [
// 	'02.png', '02.png',
// 	'02.png', '02.png',
// 	'02.png', '02.png'
// ] );
// scene.background = new THREE.CubeTextureLoader().setPath('textures/cubetexture/').load(['02.jpg', '02.jpg', '02.jpg', '02.jpg', '02.jpg', '02.jpg'])

const  textureCube=new THREE.CubeTextureLoader().setPath('/').load(['01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg', '01.jpg'])
scene.background = textureCube

//    材质
const material = new THREE.MeshBasicMaterial({ 
  // color: 0x00ff00 ,
map:texture});
//   方格
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 3, 0)
//球体  半径1 环境纹理
const ballGeometry = new THREE.SphereGeometry(1);
// 通过环境贴图模拟镜面反射效果
const ballMaterial = new THREE.MeshBasicMaterial({ 
envMap:textureCube});
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(3, 0, 0)
//    内容添加进场景
scene.add(cube);
scene.add(ball);

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
  // cube.rotation.x += .01
  // 轨道控制器更新
  // controls.update();
  // 进行渲染
  cube.rotation.x +=controlData.rotationSpeed
  cube.rotation.y +=controlData.rotationSpeed
  cube.material.color=new THREE.Color(controlData.color)
  material.wireframe=controlData.wireframe

  renderer.render(scene, camera);
}
// 透视相机移动
const movePerspectCamera = () => {
  camera.position.y = 15
  camera.position.z = 10
  camera.lookAt(0, 3, 0)
}
// 方块移动调整视角
const moveCube = () => {
  cube.position.set(3, 5, 0)
  // camera.lookAt(3, 5, 0)
  camera.lookAt(cube.position)

}
onMounted(() => {
  document.getElementById('container').appendChild(f.domElement);

  // 在页面中将canvas加入
  document.getElementById('container').appendChild(renderer.domElement);
  animate()
})

</script>

<style>
#gui{
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
}
</style>
