package heogom.homepage.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.common.history.AuditAction;
import heogom.homepage.common.security.OwnershipValidator;
import heogom.homepage.common.security.SecurityAction;
import heogom.homepage.comment.CommentRepository;
import heogom.homepage.like.PostLikeService;
import heogom.homepage.user.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostHistoryRepository postHistoryRepository;
    private final ObjectMapper objectMapper;
    private final OwnershipValidator ownershipValidator;
    private final PostLikeService postLikeService;
    private final CommentRepository commentRepository;
    private final PostViewHistoryRepository postViewHistoryRepository;

    @Transactional
    public PostResponse.DetailDTO 저장하기 (PostRequest.SaveDTO request, User user) {

        Post savedPost = postRepository.saveAndFlush(request.toEntity(user));
        postHistoryRepository.save(PostHistory.of(
                savedPost.getPostId(),
                user.getUserId(),
                AuditAction.CREATE,
                null,
                toJson(PostSnapshot.from(savedPost))
        ));

        return new PostResponse.DetailDTO(savedPost);
    }

    @Transactional(readOnly = true)
    public PostResponse.PageDTO 전체조회하기(int page, int size, String keyword, String sort, String direction, User user) {
        Pageable pageable = PageRequest.of(page, size);
        Long userId = user.getUserId();
        String normalizedSort = normalizeSort(sort);
        String normalizedDirection = normalizeDirection(direction);

        Page<PostListRow> pageResult = postRepository.findPostListRows(
                keyword,
                EntityStatus.DELETED,
                userId,
                normalizedSort,
                normalizedDirection,
                pageable
        );

        return new PostResponse.PageDTO(pageResult);
    }

    @Transactional
    public void 삭제하기(Long postId, User user) {
        Post post = postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        ownershipValidator.validate(post, user.getUserId(), SecurityAction.DELETE, ErrorCode.FORBIDDEN_POST);

        String beforeData = toJson(PostSnapshot.from(post));
        post.delete();

        postHistoryRepository.save(PostHistory.of(
                post.getPostId(),
                user.getUserId(),
                AuditAction.DELETE,
                beforeData,
                null
        ));
    }

    @Transactional
    public PostResponse.DetailDTO 수정하기(Long postId, PostRequest.UpdateDTO request, User user) {
        Post post = postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        ownershipValidator.validate(post, user.getUserId(), SecurityAction.UPDATE, ErrorCode.FORBIDDEN_POST);

        String beforeData = toJson(PostSnapshot.from(post));
        post.update(request.getTitle(), request.getContent());
        postRepository.flush();
        String afterData = toJson(PostSnapshot.from(post));

        postHistoryRepository.save(PostHistory.of(
                post.getPostId(),
                user.getUserId(),
                AuditAction.UPDATE,
                beforeData,
                afterData
        ));

        return new PostResponse.DetailDTO(post);
    }

    @Transactional
    public PostResponse.DetailDTO 상세조회하기(Long postId, User user, HttpServletRequest request) {
        Post post = postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        post.increaseViewCount();
        postViewHistoryRepository.save(PostViewHistory.loggedIn(
                post.getPostId(),
                user.getUserId(),
                getClientIp(request),
                getUserAgent(request)
        ));

        long likeCount = postLikeService.countByPostId(postId);
        boolean liked = postLikeService.isLiked(postId, user.getUserId());
        long commentCount = commentRepository.countByPostPostIdAndStatusNot(postId, EntityStatus.DELETED);
        long topLevelCommentCount = commentRepository.countByPostPostIdAndParentIdIsNullAndStatusNot(postId, EntityStatus.DELETED);

        return new PostResponse.DetailDTO(post, likeCount, liked, commentCount, topLevelCommentCount);
    }

    @Transactional(readOnly = true)
    public List<String> 자동완성(String keyword) {
        return postRepository.findTop10ByTitleContainingAndStatusNot(keyword, EntityStatus.DELETED)
                .stream()
                .map(Post::getTitle)
                .toList();
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("이력 데이터 직렬화 실패", e);
        }
    }

    private String normalizeSort(String sort) {
        if (sort == null) {
            return "latest";
        }

        return switch (sort) {
            case "likes", "comments", "views" -> sort;
            default -> "latest";
        };
    }

    private String normalizeDirection(String direction) {
        if (direction == null) {
            return "desc";
        }

        return "asc".equals(direction) ? "asc" : "desc";
    }

    private String getClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }

        return request.getRemoteAddr();
    }

    private String getUserAgent(HttpServletRequest request) {
        return request.getHeader("User-Agent");
    }
}
