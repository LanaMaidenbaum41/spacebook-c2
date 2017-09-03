var posts = [];

var postCounter = 0;;

function addPost(text) {

    var newPost = {
        text: text,
        id: postCounter,
        comments: {
            username:'',
            text:''
        }
    }

    posts.push(newPost);
    postCounter++;
}

$('button').click(function () {
    var newPostText = $('#post-name').val();
    addPost(newPostText);

    $('#post-name').val('');
    renderPosts();
});

function renderPosts() {
    $('.posts').empty();

    posts.forEach(function (post, index) {
        $('.posts').append('<div class = "post" data-id=' + post.id + '><button class="glyphicon glyphicon-trash remove"></button>\
        '+ post.text + '<br><form><input type="text" class="usernames" placeholder="Username"/><input type="text" class="comment-name" placeholder="Write a comment..."/>\
        <button type="button" class="btn btn-xs btn-primary commentButton" >comment</button></form>\
        <div class = "comments"></div></div>');
        renderComments(post.id, index);
    });

}

$('.posts').on('click', '.remove', function () {
    var postIndex = $(this).parent().index();
    posts.splice(postIndex, 1);
    renderPosts();
})


$('.posts').on('click', '.commentButton', function () {
    var Username = $(this).siblings('.usernames').val();
    var newComment = $(this).siblings('.comment-name').val();
    if (newComment) {
        var postIndex = $(this).parent().parent().index();
        posts[postIndex].comments.username = Username;
        posts[postIndex].comments.text =newComment;
    
        $('.comment-name').val('');
        $('.usernames').val('');
        renderComments((posts[postIndex].id), postIndex)
    }
    else {
        alert('theres no text in yours comment');
    }


})

function renderComments(postId, postIndex) {
    // var postIndex;
    // for(var i =0 ;i< posts.length;i++){
    //     if(postId == posts[i].id){
    //         postIndex = i;
    //     }
    // }
    var $postComments = posts[postIndex].comments;
    var $comments = $('.post[data-id|=' + postId + ']').find('.comments');
    $comments.empty();

    posts[postIndex].comments.forEach(function (i,text) {

        $comments.append('<div class = "row"><button type="button" class="btn btn-default btn-circle">\
        '+username+'</button><div class="postComment col-lg-6">' + text + '\
        </div><button class="btn btn-xs btn-danger col-lg-6 glyphicon glyphicon-trash deleteComment"></button></div>');

    })

}

$('.posts').on('click', '.deleteComment', function () {
    var commentIndex = $(this).parent().index();
    var $postId = $(this).closest('.post').data().id
    var $postIndex = $(this).closest('.post').index();

    posts[$postIndex].comments.splice(commentIndex, 1);
    renderComments($postId, $postIndex);
})

//Extenstion 3 
$('.row').on('click','.post',function(){
    var postId = $(this).data().id;
    $('body').append('<section>'+postId+'</section>');
})