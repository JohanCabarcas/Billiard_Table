/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/




function ball_motion (i, dt)
{
    // Method for perform motion of the balls based on the balls' speed and position

   // console.log("dt: " + dt);
    // Motion along a straight line:
    /*
    ary_balls_speed[i].x= Math.abs(ary_balls_speed[i].clone().x * 0.8);
    ary_balls_speed[i].y= Math.abs(ary_balls_speed[i].clone().y * 0.8);
    ary_balls_speed[i].x=- Math.abs(ary_balls_speed[i].clone().x * 0.8);
    ary_balls_speed[i].y=- Math.abs(ary_balls_speed[i].clone().y * 0.8);
    */
    ary_balls_pos[i].add(ary_balls_speed[i].clone().multiplyScalar(dt));
    var transMat = new THREE.Matrix4();
    transMat.makeTranslation(ary_balls_pos[i].x, ary_balls_pos[i].y, ary_balls_pos[i].z);//Transformation (motion) ball is performed
    ary_balls_object[i].matrix.copy(transMat);//Transromation is applied to the ball object

}

function ball_rotation (i, t)
{

    var rotMat = new THREE.Matrix4();

    /* .makeRotationAxis ( axis, theta ) axis — Rotation axis, speed was normalized. theta — Rotation angle
     Sets this matrix as rotation transform around axis by angle radians.*/
    rotMat.makeRotationAxis(ary_rot_axis[i], ary_balls_angular[i]*t);

    ary_balls_object[i].matrix.multiply(rotMat);// here multiplies the object "ball" (mesh) with the rotation axis and angular speed

}

function reduce_speed(reduc_factor, i)
{
    ary_balls_speed[i].y =  Math.abs(ary_balls_speed[i].clone().y *reduc_factor);
    ary_balls_speed[i].x = Math.abs(ary_balls_speed[i].clone().x*reduc_factor);
    //seconds=seconds+1;
    //console.log(seconds);
}