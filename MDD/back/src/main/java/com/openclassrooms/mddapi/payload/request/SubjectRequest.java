package com.openclassrooms.mddapi.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SubjectRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    private String description;
}
