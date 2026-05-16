package heogom.homepage;

import heogom.homepage.comment.*;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.common.history.AuditAction;
import heogom.homepage.like.CommentLikeResponse;
import heogom.homepage.like.CommentLikeService;
import heogom.homepage.like.PostLikeResponse;
import heogom.homepage.like.PostLikeService;
import heogom.homepage.post.*;
import heogom.homepage.user.User;
import heogom.homepage.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
class PostCommentRegressionTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private PostHistoryRepository postHistoryRepository;

    @Autowired
    private PostViewHistoryRepository postViewHistoryRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentLikeService commentLikeService;

    @Autowired
    private CommentHistoryRepository commentHistoryRepository;

    @Test
    void postLikeToggle_addsAndCancelsLike() {
        User owner = saveUser("post-like-owner@example.com");
        User liker = saveUser("post-like-user@example.com");
        Post post = savePost(owner, "좋아요 게시글", "내용");

        PostLikeResponse.ToggleDTO liked = postLikeService.toggle(post.getPostId(), liker);
        PostLikeResponse.ToggleDTO canceled = postLikeService.toggle(post.getPostId(), liker);

        assertThat(liked.isLiked()).isTrue();
        assertThat(liked.getLikeCount()).isEqualTo(1);
        assertThat(canceled.isLiked()).isFalse();
        assertThat(canceled.getLikeCount()).isZero();
    }

    @Test
    void commentLikeToggle_addsAndCancelsLike() {
        User owner = saveUser("comment-like-owner@example.com");
        User liker = saveUser("comment-like-user@example.com");
        Post post = savePost(owner, "댓글 좋아요 게시글", "내용");
        Comment comment = saveComment(post, owner, "댓글", null);

        CommentLikeResponse.ResultDTO liked = commentLikeService.toggle(comment.getCommentId(), liker);
        CommentLikeResponse.ResultDTO canceled = commentLikeService.toggle(comment.getCommentId(), liker);

        assertThat(liked.isLiked()).isTrue();
        assertThat(liked.getLikeCount()).isEqualTo(1);
        assertThat(canceled.isLiked()).isFalse();
        assertThat(canceled.getLikeCount()).isZero();
    }

    @Test
    void deletedComment_isReturnedWithDeletedMessage() {
        User owner = saveUser("comment-delete-owner@example.com");
        Post post = savePost(owner, "댓글 삭제 게시글", "내용");
        Comment comment = saveComment(post, owner, "삭제 전 댓글", null);

        commentService.삭제하기(comment.getCommentId(), owner);

        List<CommentResponse.DetailDTO> comments = commentService.전체조회하기(post.getPostId(), owner);
        assertThat(comments)
                .extracting(CommentResponse.DetailDTO::getContent)
                .contains("삭제된 댓글입니다");
        assertThat(comments.get(0).isDeleted()).isTrue();
    }

    @Test
    void postDetail_increasesViewCountAndSavesViewHistory() {
        User owner = saveUser("view-owner@example.com");
        User viewer = saveUser("view-user@example.com");
        Post post = savePost(owner, "조회수 게시글", "내용");
        HttpServletRequest request = viewRequest();

        PostResponse.DetailDTO detail = postService.상세조회하기(post.getPostId(), viewer, request);

        assertThat(detail.getViewCount()).isEqualTo(1);
        PostViewHistory history = postViewHistoryRepository.findAll().stream()
                .max(Comparator.comparing(PostViewHistory::getViewHistoryId))
                .orElseThrow();
        assertThat(history.getPostId()).isEqualTo(post.getPostId());
        assertThat(history.getUserId()).isEqualTo(viewer.getUserId());
        assertThat(history.getViewerType()).isEqualTo(ViewerType.AUTHENTICATED);
        assertThat(history.getIpAddress()).isEqualTo("203.0.113.10");
        assertThat(history.getUserAgent()).isEqualTo("RegressionTest");
    }

    @Test
    void postList_appliesKeywordSortingDirectionAndPagination() {
        User owner = saveUser("post-list-owner@example.com");
        Post lowViewPost = savePost(owner, "목록 검증 낮은 조회", "내용");
        Post highViewPost = savePost(owner, "목록 검증 높은 조회", "내용");
        Post otherPost = savePost(owner, "다른 제목 높은 조회", "내용");
        increaseViews(lowViewPost, 1);
        increaseViews(highViewPost, 3);
        increaseViews(otherPost, 10);
        postRepository.flush();

        PostResponse.PageDTO result = postService.전체조회하기(0, 2, "목록 검증", "views", "asc", owner);

        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getPage()).isZero();
        assertThat(result.getSize()).isEqualTo(2);
        assertThat(result.getPosts())
                .extracting(PostResponse.DetailDTO::getTitle)
                .containsExactly("목록 검증 낮은 조회", "목록 검증 높은 조회");
        assertThat(result.getPosts())
                .extracting(PostResponse.DetailDTO::getViewCount)
                .containsExactly(1L, 3L);
    }

    @Test
    void postUpdateAndDelete_saveBeforeAfterHistory() {
        User owner = saveUser("post-history-owner@example.com");
        Post post = savePost(owner, "수정 전 제목", "수정 전 내용");

        PostRequest.UpdateDTO update = new PostRequest.UpdateDTO();
        update.setTitle("수정 후 제목");
        update.setContent("수정 후 내용");
        postService.수정하기(post.getPostId(), update, owner);
        postService.삭제하기(post.getPostId(), owner);

        List<PostHistory> histories = postHistoryRepository.findAll().stream()
                .filter(history -> history.getTargetId().equals(post.getPostId()))
                .toList();

        assertThat(histories)
                .anySatisfy(history -> {
                    assertThat(history.getAction()).isEqualTo(AuditAction.UPDATE);
                    assertThat(history.getBeforeData()).contains("수정 전 제목");
                    assertThat(history.getAfterData()).contains("수정 후 제목");
                })
                .anySatisfy(history -> {
                    assertThat(history.getAction()).isEqualTo(AuditAction.DELETE);
                    assertThat(history.getBeforeData()).contains("수정 후 제목");
                    assertThat(history.getAfterData()).isNull();
                });
    }

    @Test
    void commentUpdateAndDelete_saveBeforeAfterHistory() {
        User owner = saveUser("comment-history-owner@example.com");
        Post post = savePost(owner, "댓글 이력 게시글", "내용");
        Comment comment = saveComment(post, owner, "수정 전 댓글", null);

        CommentRequest.UpdateDTO update = new CommentRequest.UpdateDTO();
        update.setContent("수정 후 댓글");
        commentService.수정하기(comment.getCommentId(), update, owner);
        commentService.삭제하기(comment.getCommentId(), owner);

        List<CommentHistory> histories = commentHistoryRepository.findAll().stream()
                .filter(history -> history.getTargetId().equals(comment.getCommentId()))
                .toList();

        assertThat(histories)
                .anySatisfy(history -> {
                    assertThat(history.getAction()).isEqualTo(AuditAction.UPDATE);
                    assertThat(history.getBeforeData()).contains("수정 전 댓글");
                    assertThat(history.getAfterData()).contains("수정 후 댓글");
                })
                .anySatisfy(history -> {
                    assertThat(history.getAction()).isEqualTo(AuditAction.DELETE);
                    assertThat(history.getBeforeData()).contains("수정 후 댓글");
                    assertThat(history.getAfterData()).isNull();
                });
    }

    @Test
    void nonOwnerCannotUpdateOrDeletePostAndComment() {
        User owner = saveUser("owner@example.com");
        User attacker = saveUser("attacker@example.com");
        Post post = savePost(owner, "권한 게시글", "내용");
        Comment comment = saveComment(post, owner, "권한 댓글", null);

        PostRequest.UpdateDTO postUpdate = new PostRequest.UpdateDTO();
        postUpdate.setTitle("공격자 제목");
        postUpdate.setContent("공격자 내용");
        CommentRequest.UpdateDTO commentUpdate = new CommentRequest.UpdateDTO();
        commentUpdate.setContent("공격자 댓글");

        assertForbidden(() -> postService.수정하기(post.getPostId(), postUpdate, attacker), ErrorCode.FORBIDDEN_POST);
        assertForbidden(() -> postService.삭제하기(post.getPostId(), attacker), ErrorCode.FORBIDDEN_POST);
        assertForbidden(() -> commentService.수정하기(comment.getCommentId(), commentUpdate, attacker), ErrorCode.FORBIDDEN_COMMENT);
        assertForbidden(() -> commentService.삭제하기(comment.getCommentId(), attacker), ErrorCode.FORBIDDEN_COMMENT);
    }

    private User saveUser(String email) {
        return userRepository.save(User.builder()
                .email(email)
                .password("encoded-password")
                .nickname(email.substring(0, email.indexOf("@")))
                .build());
    }

    private Post savePost(User user, String title, String content) {
        return postRepository.saveAndFlush(Post.builder()
                .user(user)
                .title(title)
                .content(content)
                .build());
    }

    private void increaseViews(Post post, int count) {
        for (int i = 0; i < count; i++) {
            post.increaseViewCount();
        }
    }

    private Comment saveComment(Post post, User user, String content, Long parentId) {
        return commentRepository.saveAndFlush(Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .parentId(parentId)
                .build());
    }

    private HttpServletRequest viewRequest() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("X-Forwarded-For", "203.0.113.10");
        request.addHeader("User-Agent", "RegressionTest");
        request.setRemoteAddr("127.0.0.1");
        return request;
    }

    private void assertForbidden(Runnable action, ErrorCode errorCode) {
        assertThatThrownBy(action::run)
                .isInstanceOf(BusinessException.class)
                .extracting("errorCode")
                .isEqualTo(errorCode);
    }
}
