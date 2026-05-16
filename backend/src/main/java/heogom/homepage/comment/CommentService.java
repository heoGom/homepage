package heogom.homepage.comment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import heogom.homepage.common.entity.EntityStatus;
import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.common.history.AuditAction;
import heogom.homepage.common.security.OwnershipValidator;
import heogom.homepage.common.security.SecurityAction;
import heogom.homepage.like.CommentLikeService;
import heogom.homepage.post.Post;
import heogom.homepage.post.PostRepository;
import heogom.homepage.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentHistoryRepository commentHistoryRepository;
    private final PostRepository postRepository;
    private final ObjectMapper objectMapper;
    private final OwnershipValidator ownershipValidator;
    private final CommentLikeService commentLikeService;

    @Transactional
    public CommentResponse.DetailDTO 저장하기(Long postId, CommentRequest.SaveDTO request, User user) {
        Post post = postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        validateParent(postId, request.getParentId());

        Comment savedComment = commentRepository.saveAndFlush(request.toEntity(post, user));

        commentHistoryRepository.save(CommentHistory.of(
                savedComment.getCommentId(),
                user.getUserId(),
                AuditAction.CREATE,
                null,
                toJson(CommentSnapshot.from(savedComment))
        ));

        return new CommentResponse.DetailDTO(savedComment);
    }

    public List<CommentResponse.DetailDTO> 전체조회하기(Long postId, User user) {
        postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        List<Comment> comments = commentRepository.findByPostPostIdOrderByCommentIdAsc(postId);
        Map<Long, CommentResponse.DetailDTO> roots = new LinkedHashMap<>();
        List<CommentResponse.DetailDTO> orphans = new ArrayList<>();

        for (Comment comment : comments) {
            CommentResponse.DetailDTO dto = toDetailDTO(comment, user);
            if (comment.getParentId() == null) {
                roots.put(comment.getCommentId(), dto);
                continue;
            }

            CommentResponse.DetailDTO parent = roots.get(comment.getParentId());
            if (parent == null) {
                orphans.add(dto);
            } else {
                parent.addReply(dto);
            }
        }

        List<CommentResponse.DetailDTO> result = new ArrayList<>(roots.values());
        result.addAll(orphans);
        return result;
    }

    @Transactional
    public CommentResponse.DetailDTO 수정하기(Long commentId, CommentRequest.UpdateDTO request, User user) {
        Comment comment = commentRepository.findActiveById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));

        ownershipValidator.validate(comment, user.getUserId(), SecurityAction.UPDATE, ErrorCode.FORBIDDEN_COMMENT);

        String beforeData = toJson(CommentSnapshot.from(comment));
        comment.update(request.getContent());
        commentRepository.flush();
        String afterData = toJson(CommentSnapshot.from(comment));

        commentHistoryRepository.save(CommentHistory.of(
                comment.getCommentId(),
                user.getUserId(),
                AuditAction.UPDATE,
                beforeData,
                afterData
        ));

        return toDetailDTO(comment, user);
    }

    @Transactional
    public void 삭제하기(Long commentId, User user) {
        Comment comment = commentRepository.findActiveById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.COMMENT_NOT_FOUND));

        ownershipValidator.validate(comment, user.getUserId(), SecurityAction.DELETE, ErrorCode.FORBIDDEN_COMMENT);

        String beforeData = toJson(CommentSnapshot.from(comment));
        comment.delete();

        commentHistoryRepository.save(CommentHistory.of(
                comment.getCommentId(),
                user.getUserId(),
                AuditAction.DELETE,
                beforeData,
                null
        ));
    }

    private void validateParent(Long postId, Long parentId) {
        if (parentId == null) {
            return;
        }

        Comment parent = commentRepository.findActiveById(parentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_COMMENT_PARENT));

        if (!parent.getPost().getPostId().equals(postId) || parent.isReply()) {
            throw new BusinessException(ErrorCode.INVALID_COMMENT_PARENT);
        }
    }

    private CommentResponse.DetailDTO toDetailDTO(Comment comment, User user) {
        long likeCount = commentLikeService.countByCommentId(comment.getCommentId());
        boolean liked = !comment.getStatus().equals(EntityStatus.DELETED)
                && commentLikeService.isLiked(comment.getCommentId(), user.getUserId());

        return new CommentResponse.DetailDTO(comment, likeCount, liked);
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("이력 데이터 직렬화 실패", e);
        }
    }
}
