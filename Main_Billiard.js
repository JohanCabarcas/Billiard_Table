/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/


// -----------------------------------Main Settings-------------------------


var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('black');    // set background color
renderer.shadowMap.enabled=true;

// Create a new Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(-1,2,1);
//camera.lookAt(scene.position.set(2,-2,0));
camera.lookAt(scene.position.set);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);

light_scene(scene);// add light to the scene and shadows

//-----------------Basic general dimensions for billiard table -------------------

//--------------------global variables -----
var balls_rad= 61.5/1000;//	floor to the surface of the table
var top_table_width=2*1.83;//standard measurement of Billiard table(mts.)
var top_table_height=2*0.91;
var cushion_width = top_table_width*0.90;
var cushion_height = top_table_height*0.80;

/*---------------------------------------------Arrays holding balls settings ----------------------------------------------------*/

var ary_rot_axis =[];
var ary_balls_pos =[];// array with all balls positions
var ary_balls_object=[];// array which holds all balls objects
var ary_balls_speed=[];
var ary_balls_angular=[];


var nr_balls=8;//amount of balls to be created


create_floor();
generate_initial_pos(nr_balls);// method which create the initial position and check for overlapping
generate_speed(nr_balls);// random speed are generated in this method
set_angular_speed (nr_balls);// Angular speed array are generated based on speed of balls
create_Billiard_table(nr_balls);// creation of all objects in from the billiard table and floor


var computerClock = new THREE.Clock();
var controls = new THREE.TrackballControls( camera, canvas );

//----------------------------------Rendering--------------------------
function render()
{

    requestAnimationFrame(render);

    var dt = computerClock.getDelta();  // must be before call to getElapsedTime, otherwise dt=0 !!!
    var t = computerClock.getElapsedTime();
    var seconds=0;

    var i;

    for(i=0;i<ary_balls_object.length;i++)// iteration through each object (ball) and update its motion, rotation and reflection calculation
    {

        // first, positions are updated and then collision is checked separetly

        ball_motion(i,dt);
        ball_rotation(i,t);
        //setInterval(reduce_speed(reduc_factor,  i),1000);
        reflection_check(i);
    }

    for(i=0;i<ary_balls_object.length;i++)
    {
        /*---------------check for collision---------------*/
        check_collision(i);
    }

    controls.update();

    renderer.render(scene, camera);
}
render();