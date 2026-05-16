package heogom.homepage.post;

import heogom.homepage.auth.PrincipalDetails;
import heogom.homepage.common.response.ApiResponse;
import heogom.homepage.like.PostLikeResponse;
import heogom.homepage.like.PostLikeService;
import heogom.homepage.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final PostLikeService postLikeService;

    @PostMapping
    public ApiResponse<PostResponse.DetailDTO> save(@AuthenticationPrincipal PrincipalDetails principal,
                                                    @Valid @RequestBody PostRequest.SaveDTO request) {
        User user = principal.getUser();
        return ApiResponse.ok(postService.저장하기(request, user));

    }

    @GetMapping
    public ApiResponse<PostResponse.PageDTO> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "latest") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        return ApiResponse.ok(postService.전체조회하기(page, size, keyword, sort, direction, principal.getUser()));
    }

    @DeleteMapping("/{postId}")
    public ApiResponse<Void> delete(@PathVariable Long postId, @AuthenticationPrincipal PrincipalDetails principal) {
        postService.삭제하기(postId, principal.getUser());
        return ApiResponse.ok();
    }

    @PutMapping("/{postId}")
    public ApiResponse<PostResponse.DetailDTO> update(
            @PathVariable Long postId,
            @AuthenticationPrincipal PrincipalDetails principal,
            @Valid @RequestBody PostRequest.UpdateDTO request) {
        return ApiResponse.ok(postService.수정하기(postId, request, principal.getUser()));
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostResponse.DetailDTO> findById(
            @PathVariable Long postId,
            @AuthenticationPrincipal PrincipalDetails principal,
            HttpServletRequest request
    ) {
        return ApiResponse.ok(postService.상세조회하기(postId, principal.getUser(), request));
    }

    @GetMapping("/suggest")
    public ApiResponse<List<String>> suggest(@RequestParam String keyword) {
        return ApiResponse.ok(postService.자동완성(keyword));
    }

    @PostMapping("/{postId}/likes")
    public ApiResponse<PostLikeResponse.ToggleDTO> toggleLike(
            @PathVariable Long postId,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        return ApiResponse.ok(postLikeService.toggle(postId, principal.getUser()));
    }

}
