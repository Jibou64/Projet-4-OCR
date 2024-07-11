package com.openclassrooms.mddapi.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class SignupRequest {
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(min = 3, max = 20)
  private String firstName;

  @NotBlank
  @Size(min = 3, max = 20)
  private String lastName;

  @NotBlank
  @Pattern.List({
          @Pattern(regexp = ".*[A-Z].*", message = "Le mot de passe doit contenir au moins une majuscule"),
          @Pattern(regexp = ".*[a-z].*", message = "Le mot de passe doit contenir au moins une minuscule"),
          @Pattern(regexp = ".*[0-9].*", message = "Le mot de passe doit contenir au moins un chiffre"),
          @Pattern(regexp = ".*[@#$%^&+=].*", message = "Le mot de passe doit contenir au moins un caractère spécial")
  })
  @Size(min = 6, max = 40)
  private String password;
}
