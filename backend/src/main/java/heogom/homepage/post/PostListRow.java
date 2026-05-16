package heogom.homepage.post;

public interface PostListRow {

    Post getPost();

    long getCommentCount();

    long getTopLevelCommentCount();

    long getLikeCount();

    long getLikedCount();
}
