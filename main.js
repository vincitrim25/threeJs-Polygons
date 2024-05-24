import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let change = false;
let selectedGeometry = 'cube';
let wireframe = false;
document.getElementById('wireframe').addEventListener('change', (ev)=>{
    wireframe = ev.target.checked;
})
for(let el of document.getElementsByClassName('navbar')[0].children){
    el.addEventListener('click', () => {selectGeometry(el.id)});
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
const light1 = new THREE.PointLight(0xffffff, 1, 1000, 0)
const light2 = new THREE.PointLight(0xffffff, 1, 1000, 0)
// const light = new THREE.AmbientLight()
light1.position.set(50,50,50);
light2.position.set(-50,-50,-50);

var geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshPhongMaterial({
    color: '#049ef4'
});
// const material = new THREE.MeshBasicMaterial({color: 0x049ef4});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh, light1, light2);

camera.position.z = 5;

document.body.appendChild(renderer.domElement);
function animate(){
    if(change){
        mesh.geometry.dispose();
        switch(selectedGeometry){
            case 'cube':
                mesh.geometry = new THREE.BoxGeometry(1,1,1)
                break;
            case 'sphere':
                mesh.geometry = new THREE.SphereGeometry(1, 50, 50)
                break;
            case 'icosahedron':
                mesh.geometry = new THREE.IcosahedronGeometry(1)
        }
        change = false;
    }
    mesh.material.wireframe = wireframe;
    requestAnimationFrame(animate);
    mesh.rotation.x += .01;
    mesh.rotation.y += .01;
    renderer.render(scene, camera);
}
animate();

const selectGeometry = (g) => {
    for(let el of document.getElementsByClassName('navbar')[0].children){
        el.id != g ? el.classList.remove('active') : el.classList.add('active');
    }
    selectedGeometry = g;
    change = true;
}
selectGeometry(selectedGeometry);

