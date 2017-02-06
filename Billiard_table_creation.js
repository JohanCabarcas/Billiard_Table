/*Author: Johan Cabarcas
  Date  :  10-01-2017
*/





function create_Billiard_table(nr_balls) //this method is not working because it is just taking the last leg, the previous legs are delted because i am reseting the leg_name every time
{
    //--------------Create top table --------------

     var top_table_depth=1/5;//thickness of table
    var distance_btw_rug_table=1/2;//try and error value

    var geometry = new THREE.BoxGeometry( top_table_width, top_table_height, top_table_depth );
    var material = new THREE.MeshPhongMaterial( {color: "brown",wireframe:false} );
    load_texture("table_legs.jpg",material);
    var top_table = new THREE.Mesh( geometry, material );

    top_table.position.y=distance_btw_rug_table;
    top_table.rotation.x=-Math.PI/2;
    top_table.castShadow=true;

    scene.add(top_table);


    //------------------------------Create Legs-------------------------------------
    var i;
    var legs_width = top_table_width / 20;// proportion of legs corresponding to table size 1/20
    var legs_depth = top_table_width / 20;// distance between table and floor minus the tickness of the table, to set the legs right at the end of the table
    var ary_legs =[];


    for (i = 0; i < 4; i++) // loop to create four table legs
    {
        var legs_height = distance_btw_rug_table - top_table_depth / 2;//this actually the depth of the legs(axis of tables was rotated just apply for legs
        var geometry = new THREE.BoxGeometry(legs_width, legs_depth, legs_height);
        var material = new THREE.MeshPhongMaterial({color: "brown", wireframe: false});
        load_texture("table_legs.jpg",material);
        var leg_name = new THREE.Mesh(geometry, material);

        ary_legs.push(leg_name);//store legs on array

        if (i == 0) {
            ary_legs[i].position.z = -legs_height / 2 - top_table_depth / 2;//set the leg just below the table
            ary_legs[i].position.y = -top_table_height / 2 + legs_depth;//set the leg just on the corner of table
            ary_legs[i].position.x = -top_table_width / 2 + legs_depth;

            top_table.add(ary_legs[i]);
        }
        if (i == 1) {
            ary_legs[i].position.z = -legs_height / 2 - top_table_depth / 2;//set the leg just below the table
            ary_legs[i].position.y = top_table_height / 2 - legs_depth;// set leg on the top left corner of table
            ary_legs[i].position.x = -top_table_width / 2 + legs_depth ;

            top_table.add(ary_legs[i]);
        }
        if (i == 2) {
            ary_legs[i].position.z = -legs_height / 2 - top_table_depth / 2;//set the leg just below the table
            ary_legs[i].position.y = -top_table_height / 2 + legs_depth;// set leg on the bottom right corner of table
            ary_legs[i].position.x = top_table_width / 2 - legs_depth;

            top_table.add(ary_legs[i]);
        }
        if (i == 3) {
            ary_legs[i].position.z = -legs_height / 2 - top_table_depth / 2;//set the leg just below the table
            ary_legs[i].position.y = top_table_height / 2 - legs_depth;// set leg on the top right corner of table
            ary_legs[i].position.x = top_table_width / 2 - legs_depth;

            top_table.add(ary_legs[i]);
        }
    }


    //--------------------------Cushion----------------------------

    var geometry= new THREE.PlaneGeometry( cushion_width, cushion_height );
    var material = new THREE.MeshPhongMaterial( {color: "white",side: THREE.DoubleSide, wireframe:false} );
    load_texture("cushion.jpg",material);
    var cushion = new THREE.Mesh( geometry, material );

    cushion.receiveShadow=true;//Cushion receive shadow of the balls coming from the bulb
    cushion.position.z=top_table_depth/1.9;
    top_table.add(cushion);

    //******************************side_cushions****************

    var ary_side_cushion=[];
    var side_cushionL_width  =  (top_table_width-cushion_width)/2;
    var side_cushionL_height =  top_table_height;
    var side_cushionL_depth  =1/10;
    var i;

    for(i=0;i<2;i++)
    {

        var geometry = new THREE.BoxGeometry(side_cushionL_width, side_cushionL_height, side_cushionL_depth);
        var material = new THREE.MeshPhongMaterial({color: "white", wireframe: false});
        load_texture("cushion.jpg",material);
        var side_cushionL = new THREE.Mesh(geometry, material);

        ary_side_cushion.push(side_cushionL);

        if (i == 0)
        {
            ary_side_cushion[i].position.z = top_table_depth / 2 + side_cushionL_depth / 2;
            ary_side_cushion[i].position.x = -top_table_width / 2 + side_cushionL_width / 2;

            top_table.add(ary_side_cushion[i]);
        }

        if (i == 1)
        {
            ary_side_cushion[i].position.z = top_table_depth / 2 + side_cushionL_depth / 2;
            ary_side_cushion[i].position.x = top_table_width / 2 - side_cushionL_width / 2;

            top_table.add(ary_side_cushion[i]);
        }
    }

    //--------------------------------Top Cushion--------------------------

    var ary_top_cushion=[];
    var top_cushion_width  = cushion_width;
    var top_cushion_height = (top_table_height-cushion_height)/2;
    var top_cushion_depth  =1/10;
    var i;

    for(i=0;i<2;i++)
    {

        var geometry = new THREE.BoxGeometry(top_cushion_width, top_cushion_height, top_cushion_depth);
        var material = new THREE.MeshPhongMaterial({color: "white", wireframe: false});
        load_texture("cushion.jpg",material);
        var top_cushion = new THREE.Mesh(geometry, material);

        ary_top_cushion.push(top_cushion);
        if(i==0)
        {
            ary_top_cushion[i].position.z = top_table_depth/2+side_cushionL_depth/2;
            ary_top_cushion[i].position.y = -cushion_height/2-top_cushion_height/2;
            ary_top_cushion[i].position.x = -top_table_height / 2 + side_cushionL_height/2;
            top_table.add(ary_top_cushion[i]);

        }

        if(i==1)
        {
            ary_top_cushion[i].position.z = top_table_depth/2+side_cushionL_depth/2;
            ary_top_cushion[i].position.y = cushion_height/2+top_cushion_height/2;
            ary_top_cushion[i].position.x = -top_table_height / 2 + side_cushionL_height/2;
            top_table.add(ary_top_cushion[i]);

        }
    }
    //-------------------------------Create Billiard Balls-----------------------
        var ary_textures=["Ball8.jpg","Ball9.jpg","Ball10.jpg","Ball11.jpg","Ball12.jpg","Ball13.jpg","Ball14.jpg","Ball15.jpg"];

        //Creation of balls object and assigned an specific texture from the array of textures
        var i;
        for(i=0;i<nr_balls;i++)
        {

            //-----------------Ball Geometry-----------------------------------
            var geometry = new THREE.SphereGeometry( balls_rad,16, 16 );
            var material = new THREE.MeshPhongMaterial( {color: "white",wireframe:false} );

            load_texture(ary_textures[i],material);
            var ball = new THREE.Mesh( geometry, material );

            ball.castShadow=true;
            ball.matrixAutoUpdate = false;// this statement disallows the changes on position and and etc done as yet/

            ary_balls_object.push(ball);// push ball object into array to afterwards use it in rendering function

            cushion.add(ball);
        }

}

function create_floor()
{
    //-----------------Creation of floor -------------------

    var rugwidth=10;
    var rugheight=10;
    var geometry= new THREE.PlaneGeometry( rugwidth, rugheight );
    var material = new THREE.MeshPhongMaterial( {color: "gray",side: THREE.DoubleSide, wireframe:false} );
    load_texture("rug.jpg",material);
    var rug = new THREE.Mesh( geometry, material );

    rug.receiveShadow=true;
    scene.add(rug);
    rug.rotation.x=Math.PI/2;// rotation works according to radians, here is rotate 90 degrees

}




