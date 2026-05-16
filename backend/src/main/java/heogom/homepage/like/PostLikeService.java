package heogom.homepage.like;

import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.post.Post;
import heogom.homepage.post.PostRepository;
import heogom.homepage.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final PostRepository postRepository;

    @Transactional
    public PostLikeResponse.ToggleDTO toggle(Long postId, User user) {
        Post post = postRepository.findActiveById(postId)
                .orElseThrow(() -> new BusinessException(ErrorCode.POST_NOT_FOUND));

        boolean liked = postLikeRepository.findByPostAndUser(post, user)
                .map(postLike -> {
                    postLikeRepository.delete(postLike);
                    return false;
                })
                .orElseGet(() -> {
                    postLikeRepository.save(new PostLike(post, user));
                    return true;
                });

        long likeCount = postLikeRepository.countByPostPostId(postId);
        return new PostLikeResponse.ToggleDTO(postId, likeCount, liked);
    }

    public long countByPostId(Long postId) {
        return postLikeRepository.countByPostPostId(postId);
    }

    public boolean isLiked(Long postId, Long userId) {
        return postLikeRepository.existsByPostPostIdAndUserUserId(postId, userId);
    }
}
