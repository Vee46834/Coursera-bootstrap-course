//carousel animation slide setting
$(document).ready(function(){
    //set speed slide of carousel to 3000mS
    $("#mycarousel").carousel({interval:3000});

    //pause slide button
    $("#carouselButton").click(function(){
        //if (button-picture == fa-pause) 
        //{animation=play ; next-click = toggle button-picture>>fa-play, animation=pause}
        if ($("#carouselButton").children("span").hasClass('fa-pause')){
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play');
        }
        //if (button-picture == fa-play) 
        //{animation=pause ; next-click = toggle button-picture>>fa-pause, animation=pause}
        else if ($("#carouselButton").children("span").hasClass('fa-play')){
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');
        }
    });
})

//javascript function for tooltip(using Jquery)
//document = apply to all 'data-toggle="tooltip"' in this code
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

//#loginModal : modal on navbar(login)
$(document).ready(function(){
    $('#loginModal').modal('hide');

    $("#modalLoginButton").click(function(){
        $('#loginModal').modal('show');
    })
});

//#myModal : modal reserve table button
$(document).ready(function(){
    $('#myModal').modal('hide');

    $("#modalButton").click(function(){
        $('#myModal').modal('show');
    })
});