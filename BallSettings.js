/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/



/*                                                 BALL SETTINGS                                      */

    function set_angular_speed (nr_balls)// create angular speed & rotation Axis (omega) for each speed
	{
	    var i;

	    for(i=0;i<nr_balls;i++)
	    {
            var rotAxis = new THREE.Vector3(0,0,1);
            rotAxis.cross(ary_balls_speed[i].clone()).normalize();// cross product finds the perpendicular vector btw the vector rotAxis and ball speed

            var omega = ary_balls_speed[i].length()/balls_rad;//Calculation of angular speed
            ary_balls_angular.push(omega);// copy angular speed to the array
            ary_rot_axis.push(rotAxis);
        }
	//------------------------Ball speed-----------------------

	}

    function load_texture(image_id,material)
    {
        var txtLoader = new THREE.TextureLoader();// variable to load the texture of the Balls

	    txtLoader.load(image_id, function(txtMap)
        {

		txtMap.wrapS = THREE.RepeatWrapping;
        txtMap.wrapT = THREE.RepeatWrapping;
        material.map=txtMap;
		material.needsUpdate=true;

	    })
    }

    function create_new_pos()// method which create random position vector
    {
        var ball_rand_positionX=getRandomArbitrary(-cushion_width/2+(2*balls_rad),cushion_width/2-(2*balls_rad));
        var ball_rand_positionY=getRandomArbitrary(-cushion_height/2+(2*balls_rad),cushion_height/2-(2*balls_rad));
        var new_position= new THREE.Vector3(ball_rand_positionX,ball_rand_positionY,balls_rad);

        return new_position;
    }

    function generate_initial_pos(nr_balls)
    {
        // Method to create as many position as number of balls, if overlapping is detected a new position is created and assigned to be checked again
        var i;
        var k;
        for(i=0;i<nr_balls;i++)//generate nr_balls random positions
        {

            ary_balls_pos[i]= create_new_pos();
        }

        for(i=0;i<ary_balls_pos.length;i++)//loop to check whether all positions don't overlap with each other
        {
            for(k=i+1;k<ary_balls_pos.length;k++)
            {
                var distance_btw_balls;// Distance between the points of the balls

                distance_btw_balls=ary_balls_pos[i].clone().distanceToSquared(ary_balls_pos[k]);

                if(distance_btw_balls<(2*balls_rad))// overlapping detector, generates a new position if condition is full filled
                {
                    ary_balls_pos[k]=create_new_pos();
                    k--;
                }

            }
        }

    }

    function generate_speed(nr_balls)
    {
        //Generation of random speed for balls and store it in balls' speed array
        var i;
        for(i=0;i<nr_balls;i++)
        {
            var ballSpeed = new THREE.Vector3(Math.random()/3, Math.random()/3,0 );
            ary_balls_speed.push(ballSpeed);//copy speed to array of speeds

        }
    }

    function getRandomArbitrary(min, max)
    {
        return Math.random() * (max - min) + min;
    }