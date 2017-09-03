var SpacebookApp = function () {
    var posts = [];
    var postCounter = 0;;
    function addPost(text) {

        var newPost = {
            text: text,
            id: postCounter,
            comments: []
        }

        posts.push(newPost);
        postCounter++;
        renderPosts();
    }

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

    function deletePost(postIndex) {
        posts.splice(postIndex, 1);
        renderPosts();
    }

    function createComment(postIndex, Username, newComment) {
        if (newComment) {
            posts[postIndex].comments.push({ username: Username, text: newComment });
            renderComments((posts[postIndex].id), postIndex);
        }
        else {
            alert('theres no text in yours comment');
        }
    }

    function renderComments(postId, postIndex) {
        // var postIndex;
        // for(var i =0 ;i< posts.length;i++){
        //     if(postId == posts[i].id){
        //         postIndex = i;
        //     }
        // }
        var $comments = $('.post[data-id|=' + postId + ']').find('.comments');
        $comments.empty();

        posts[postIndex].comments.forEach(function (comment) {

            $comments.append('<div class = "row"><button type="button" class="btn btn-circle">\
        '+ comment.username + '</button><div class="postComment col-lg-6">' + comment.text + '\
        </div><button class="btn btn-xs btn-danger col-lg-6 glyphicon glyphicon-trash deleteComment"></button></div>');

        })

    }
    function deleteComment($postId, $postIndex, commentIndex) {
        posts[$postIndex].comments.splice(commentIndex, 1);
        renderComments($postId, $postIndex);
    }
    return {
        addPost: addPost,
        deletePost: deletePost,
        createComment: createComment,
        deleteComment: deleteComment
    }
}

var app = SpacebookApp();

$('button').click(function () {
    var newPostText = $('#post-name').val();
    $('#post-name').val('');
    app.addPost(newPostText);

});

$('.posts').on('click', '.remove', function () {
    var postIndex = $(this).parent().index();
    app.deletePost(postIndex);
});

$('.posts').on('click', '.commentButton', function () {
    var postIndex = $(this).parent().parent().index();
    var $username = $(this).siblings('.usernames')
    var $comment = $(this).siblings('.comment-name')
    var Username = $username.val();
    var newComment = $comment.val();

    $username.val('');
    $comment.val('');

    app.createComment(postIndex, Username, newComment);
});
$('.posts').on('click', '.deleteComment', function () {
    var commentIndex = $(this).parent().index();
    var $postId = $(this).closest('.post').data().id
    var $postIndex = $(this).closest('.post').index();
    app.deleteComment($postId, $postIndex, commentIndex);
});

//Extenstion 3 
$('.row').on('click', '.post', function () {
    var postId = $(this).data().id;
    $('body').append('<section>' + postId + '</section>');
})

$('.post[data-id|=' + postId + ']')