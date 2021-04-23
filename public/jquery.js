$(document).ready(function(){
  $('.field input').keyup(function() {
    var empty = false;
    $('.field input').each(function() {
        if ($(this).val().length == 0) {
            empty = true;
        }
    });

    if (empty) {
        $('.btn[type="submit"]').attr('disabled', 'disabled');
    } else {
        $('.btn[type="submit"]').removeAttr('disabled');
    }
  });



//    $('#mail').on('click', '#sendEmail', function(e) {
//       e.preventDefault();
// //      Email.send({
// // Host : "smtp.mailtrap.io",
// // Username : 'ec9bc1aebd26b2',
// // Password : '6aeb896090f2bc',
// // To : "satyammane6@gmail.com",
// // From : "rvsatyam2000@gmail.com",
// // Subject : "This is the subject",
// // Body : "And this is the body"}).then( message => alert(message));
// action : "mailto:satyammane6@gmail.com";
// });

});
