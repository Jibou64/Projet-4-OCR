package com.openclassrooms.mddapi.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class PostRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long subjectId;

    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    private String content;

    private LocalDateTime createdAt;
}
