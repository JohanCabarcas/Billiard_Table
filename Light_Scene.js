/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/



function light_scene(scene)
{

    var light = new THREE.SpotLight({color: 0xd2ed09,intensity: 0.5,distance: 2, angle:Math.PI/1000, penumbra: 1});
    light.position.set(0,2,0);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 40;
    scene.add(light);

    //**************Add light*******************
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32));
    var material = new THREE.MeshPhongMaterial({color:0x0000});
    load_texture("bulb.jpg",material);
    bulb.emissive="rgb(1,0,0)";
    bulb.position.copy(light.position);
    scene.add(bulb);
}