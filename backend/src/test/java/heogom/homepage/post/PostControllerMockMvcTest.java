package heogom.homepage.post;

import heogom.homepage.common.exception.BusinessException;
import heogom.homepage.common.exception.ErrorCode;
import heogom.homepage.jwt.JwtUtil;
import heogom.homepage.like.PostLikeService;
import heogom.homepage.user.User;
import heogom.homepage.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerMockMvcTest {

    private static final String EMAIL = "writer@test.com";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @MockBean
    private PostService postService;

    @MockBean
    private PostLikeService postLikeService;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(loginUser()));
    }

    @Test
    void getPosts_returnsApiResponseWithJwt() throws Exception {
        Post post = samplePost(1L, "목록 제목", "목록 본문", "owner@test.com", "작성자", 11L);
        PostListRow row = new PostListRow() {
            @Override
            public Post getPost() {
                return post;
            }

            @Override
            public long getCommentCount() {
                return 4L;
            }

            @Override
            public long getTopLevelCommentCount() {
                return 2L;
            }

            @Override
            public long getLikeCount() {
                return 3L;
            }

            @Override
            public long getLikedCount() {
                return 1L;
            }
        };

        Page<PostListRow> pageResult = new PageImpl<>(List.of(row), PageRequest.of(0, 10), 1);
        when(postService.전체조회하기(anyInt(), anyInt(), any(), any(), any(), any(User.class)))
                .thenReturn(new PostResponse.PageDTO(pageResult));

        mockMvc.perform(get("/api/posts")
                        .with(bearerToken())
                        .param("page", "0")
                        .param("size", "10")
                        .param("keyword", "목록")
                        .param("sort", "latest")
                        .param("direction", "desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.posts[0].postId").value(1L))
                .andExpect(jsonPath("$.data.posts[0].title").value("목록 제목"))
                .andExpect(jsonPath("$.data.posts[0].likeCount").value(3L))
                .andExpect(jsonPath("$.data.posts[0].liked").value(true))
                .andExpect(jsonPath("$.data.posts[0].commentCount").value(4L))
                .andExpect(jsonPath("$.data.posts[0].topLevelCommentCount").value(2L))
                .andExpect(jsonPath("$.message").value(nullValue()));

        verify(postService).전체조회하기(eq(0), eq(10), eq("목록"), eq("latest"), eq("desc"), any(User.class));
    }

    @Test
    void getPost_returnsApiResponseWithJwt() throws Exception {
        Post post = samplePost(1L, "상세 제목", "상세 본문", "owner@test.com", "작성자", 21L);
        when(postService.상세조회하기(eq(1L), any(User.class), any(HttpServletRequest.class)))
                .thenReturn(new PostResponse.DetailDTO(post, 5, true, 7, 3));

        mockMvc.perform(get("/api/posts/1")
                        .with(bearerToken()))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.postId").value(1L))
                .andExpect(jsonPath("$.data.title").value("상세 제목"))
                .andExpect(jsonPath("$.data.likeCount").value(5L))
                .andExpect(jsonPath("$.data.liked").value(true))
                .andExpect(jsonPath("$.data.commentCount").value(7L))
                .andExpect(jsonPath("$.data.topLevelCommentCount").value(3L))
                .andExpect(jsonPath("$.message").value(nullValue()));
    }

    @Test
    void createPost_returnsApiResponseWithJwt() throws Exception {
        Post post = samplePost(1L, "작성 제목", "작성 본문", EMAIL, "작성자", 31L);
        when(postService.저장하기(any(PostRequest.SaveDTO.class), any(User.class)))
                .thenReturn(new PostResponse.DetailDTO(post));

        mockMvc.perform(post("/api/posts")
                        .with(bearerToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "작성 제목",
                                  "content": "작성 본문"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.postId").value(1L))
                .andExpect(jsonPath("$.data.title").value("작성 제목"))
                .andExpect(jsonPath("$.message").value(nullValue()));

        verify(postService).저장하기(any(PostRequest.SaveDTO.class), any(User.class));
    }

    @Test
    void requestsWithoutBearerToken_areRejected() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.AUTHENTICATION_FAILED.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.AUTHENTICATION_FAILED.getMessage()));
    }

    @Test
    void invalidBearerToken_isRejected() throws Exception {
        mockMvc.perform(get("/api/posts/1")
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.AUTHENTICATION_FAILED.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.AUTHENTICATION_FAILED.getMessage()));
    }

    @Test
    void expiredBearerToken_isRejected() throws Exception {
        String expiredToken = jwtUtil.createToken(EMAIL, new Date(System.currentTimeMillis() - 1000));

        mockMvc.perform(get("/api/posts/1")
                        .header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.AUTHENTICATION_FAILED.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.AUTHENTICATION_FAILED.getMessage()));
    }

    @Test
    void createPost_validationFailure_returnsInvalidRequest() throws Exception {
        mockMvc.perform(post("/api/posts")
                        .with(bearerToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "",
                                  "content": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.INVALID_REQUEST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.INVALID_REQUEST.getMessage()));
    }

    @Test
    void updatePost_forbidden_returns403() throws Exception {
        when(postService.수정하기(eq(1L), any(PostRequest.UpdateDTO.class), any(User.class)))
                .thenThrow(new BusinessException(ErrorCode.FORBIDDEN_POST));

        mockMvc.perform(put("/api/posts/1")
                        .with(bearerToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "수정 제목",
                                  "content": "수정 본문"
                                }
                                """))
                .andExpect(status().isForbidden())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.code").value(ErrorCode.FORBIDDEN_POST.name()))
                .andExpect(jsonPath("$.message").value(ErrorCode.FORBIDDEN_POST.getMessage()));
    }

    private RequestPostProcessor bearerToken() {
        return request -> {
            request.addHeader("Authorization", "Bearer " + jwtUtil.createToken(EMAIL));
            return request;
        };
    }

    private User loginUser() {
        User user = User.builder()
                .email(EMAIL)
                .password("encoded-password")
                .nickname("작성자")
                .build();
        ReflectionTestUtils.setField(user, "userId", 99L);
        return user;
    }

    private Post samplePost(Long postId, String title, String content, String ownerEmail, String ownerNickname,
                            Long ownerUserId) {
        User owner = User.builder()
                .email(ownerEmail)
                .password("encoded-password")
                .nickname(ownerNickname)
                .build();
        ReflectionTestUtils.setField(owner, "userId", ownerUserId);

        Post post = Post.builder()
                .user(owner)
                .title(title)
                .content(content)
                .build();
        ReflectionTestUtils.setField(post, "postId", postId);
        ReflectionTestUtils.setField(post, "createdAt", LocalDateTime.of(2026, 5, 3, 12, 0));
        ReflectionTestUtils.setField(post, "updatedAt", LocalDateTime.of(2026, 5, 3, 12, 30));
        return post;
    }
}
