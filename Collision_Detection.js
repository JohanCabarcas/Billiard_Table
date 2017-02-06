/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/




function check_collision (i)
{
    var l;
    for(l=0;l<ary_balls_object.length;l++)/*loop to compare each position with the ary_position to find collisions*/
    {

        var distance_btw_balls;// Distance between the points of the balls
 // If statement to find potential collision
         if(ary_balls_pos[i].x+(2*balls_rad)>ary_balls_pos[l].x && ary_balls_pos[i].x < ary_balls_pos[l].x + (2*balls_rad)
            && ary_balls_pos[i].y + (2*balls_rad)> ary_balls_pos[l].y && ary_balls_pos[i].y < ary_balls_pos[l].y + (2*balls_rad))
        {
            // Below the distance from center to center between each ball is performed

            distance_btw_balls = Math.sqrt(((ary_balls_pos[i].x - ary_balls_pos[l].clone().x) * (ary_balls_pos[i].x - ary_balls_pos[l].clone().x))
                + ((ary_balls_pos[i].y - ary_balls_pos[l].clone().y) * (ary_balls_pos[i].y - ary_balls_pos[l].clone().y))
            );

            if (distance_btw_balls < (2 * balls_rad) && i !== l) //check for collision balls
            {                                    //Comparison to avoid check within the same ball i!==l

                //calculation of distance vector to perform vector projection later on
                var distance_vector = new THREE.Vector3(ary_balls_pos[i].x - ary_balls_pos[l].clone().x, ary_balls_pos[i].y - ary_balls_pos[l].clone().y, 0);

                // vectors for new speed calculation and for vector projection calculation
                    var new_speed_i = new THREE.Vector3(0, 0, 0);
                    var new_speed_l = new THREE.Vector3(0, 0, 0);
                    var sub_speed_vect = new THREE.Vector3(0, 0, 0);
                    var vec_project = new THREE.Vector3(0, 0, 0);


                    sub_speed_vect = ary_balls_speed[i].clone().sub(ary_balls_speed[l]);// subtraction of the speed vectors before collision

                    vec_project = sub_speed_vect.projectOnVector(distance_vector);// vector projection calculation

                    new_speed_i = ary_balls_speed[i].clone().sub(vec_project);// calculation of new speed for collided balls
                    new_speed_l = ary_balls_speed[l].clone().add(vec_project);

                    ary_balls_speed[i] = new_speed_i;
                    ary_balls_speed[l] = new_speed_l;

                // updating the position (moving apart to avoid stick balls)
                    ary_balls_pos[i] = ary_balls_pos[i].clone().add(new_speed_i.clone().multiplyScalar(2*balls_rad));
                    ary_balls_pos[l] = ary_balls_pos[l].clone().add(new_speed_l.clone().multiplyScalar(2*balls_rad));

                // Calculation of new omega for angular speed
                    var new_omega_i = ary_balls_speed[i].clone().length() / balls_rad;
                    var new_omega_l = ary_balls_speed[l].clone().length() / balls_rad;

                // New omega assigned to angular speed array
                    ary_balls_angular[i] = new_omega_i;
                    ary_balls_angular[l] = new_omega_l; //Recalculating the rotation axis (exchange i and j balls)

                //Calculation of new rotation axis based on new balls' speed
                    rotAxis = new THREE.Vector3(0, 0, 1);

                    ary_rot_axis[i] = rotAxis.clone();
                    ary_rot_axis[l] = rotAxis.clone();

                    ary_rot_axis[l].cross(ary_balls_speed[l].clone()).normalize();
                    ary_rot_axis[i].cross(ary_balls_speed[i].clone()).normalize();

            }
        }
    }
}