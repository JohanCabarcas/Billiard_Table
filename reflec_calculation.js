/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/



function reflection_check (i)
{
    // Reflection
    var reduc_factor=0.8;//reducing the speed when ball reflect the wall
    /* Detection X positive axis*/
    if(ary_balls_pos[i].x+(2*balls_rad)>cushion_width/2)
    {

        ary_balls_speed[i].x = - Math.abs(ary_balls_speed[i].clone().x*reduc_factor);//here the speed is negative because bounce on the positive edge then the transformation is perform in opposite direction
        /*Reduce the speed to 80 percent of previous speed "20%"*/
        var omega = ary_balls_speed[i].length()/balls_rad;//new calculation of angular speed finding the magnitude of the new vector
        ary_balls_angular[i]=omega;// copy angular speed to the array
        rotAxis = new THREE.Vector3(0,0,1);
        ary_rot_axis[i]=rotAxis;
        ary_rot_axis[i].cross(ary_balls_speed[i].clone()).normalize();
    }
    /* Detection y positive axis*/
    if(ary_balls_pos[i].y+(2*balls_rad)>cushion_height/2)
    {

        ary_balls_speed[i].y = - Math.abs(ary_balls_speed[i].clone().y*reduc_factor);//here the speed is negative because bounce on the positive edge then the transformation is perfor in opposite direction
        var omega = ary_balls_speed[i].length()/balls_rad;//new calculation of angular speed finding the magnitude of the new vector
        ary_balls_angular[i]=omega;// copy angular speed to the array
        rotAxis = new THREE.Vector3(0,0,1);
        ary_rot_axis[i]=rotAxis;
        ary_rot_axis[i].cross(ary_balls_speed[i].clone()).normalize();
    }

    /*Detection X negative axis*/
    if(ary_balls_pos[i].x-(2*balls_rad)<-cushion_width/2)
    {

        ary_balls_speed[i].x = Math.abs(ary_balls_speed[i].clone().x*reduc_factor);
        var omega = ary_balls_speed[i].length()/balls_rad;//new calculation of angular speed finding the magnitude of the new vector
        ary_balls_angular[i]=omega;// copy angular speed to the array
        rotAxis = new THREE.Vector3(0,0,1);
        ary_rot_axis[i]=rotAxis;
        ary_rot_axis[i].cross(ary_balls_speed[i].clone()).normalize();
    }


    /*detection Y negative axis*/
    if(ary_balls_pos[i].y-(2*balls_rad)<-cushion_height/2)
    {

        ary_balls_speed[i].y =  Math.abs(ary_balls_speed[i].clone().y*reduc_factor);
        var omega = ary_balls_speed[i].length()/balls_rad;//new calculation of angular speed finding the magnitude of the new vector
        ary_balls_angular[i]=omega;// copy angular speed to the array
        rotAxis = new THREE.Vector3(0,0,1);
        ary_rot_axis[i]=rotAxis;
        ary_rot_axis[i].cross(ary_balls_speed[i].clone()).normalize();
    }
}