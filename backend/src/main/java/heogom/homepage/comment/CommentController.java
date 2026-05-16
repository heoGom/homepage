package heogom.homepage.comment;

import heogom.homepage.auth.PrincipalDetails;
import heogom.homepage.common.response.ApiResponse;
import heogom.homepage.like.CommentLikeResponse;
import heogom.homepage.like.CommentLikeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentLikeService commentLikeService;

    @PostMapping("/api/posts/{postId}/comments")
    public ApiResponse<CommentResponse.DetailDTO> save(
            @PathVariable Long postId,
            @AuthenticationPrincipal PrincipalDetails principal,
            @Valid @RequestBody CommentRequest.SaveDTO request
    ) {
        return ApiResponse.ok(commentService.저장하기(postId, request, principal.getUser()));
    }

    @GetMapping("/api/posts/{postId}/comments")
    public ApiResponse<List<CommentResponse.DetailDTO>> findAll(
            @PathVariable Long postId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        return ApiResponse.ok(commentService.전체조회하기(postId, principal.getUser()));
    }

    @PutMapping("/api/comments/{commentId}")
    public ApiResponse<CommentResponse.DetailDTO> update(
            @PathVariable Long commentId,
            @AuthenticationPrincipal PrincipalDetails principal,
            @Valid @RequestBody CommentRequest.UpdateDTO request
    ) {
        return ApiResponse.ok(commentService.수정하기(commentId, request, principal.getUser()));
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ApiResponse<Void> delete(
            @PathVariable Long commentId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        commentService.삭제하기(commentId, principal.getUser());
        return ApiResponse.ok();
    }

    @PostMapping("/api/comments/{commentId}/likes")
    public ApiResponse<CommentLikeResponse.ResultDTO> toggleLike(
            @PathVariable Long commentId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        return ApiResponse.ok(commentLikeService.toggle(commentId, principal.getUser()));
    }

    @GetMapping("/api/comments/{commentId}/likes")
    public ApiResponse<CommentLikeResponse.ResultDTO> getLikeStatus(
            @PathVariable Long commentId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        return ApiResponse.ok(commentLikeService.getStatus(commentId, principal.getUser()));
    }
}
