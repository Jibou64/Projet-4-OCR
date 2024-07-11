package com.openclassrooms.mddapi.payload.response;

import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Subject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostFullResponse {
    private Post post;
    private List<Comment> comments;
}
