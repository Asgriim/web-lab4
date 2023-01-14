package org.asgrim.lab4.data;

import lombok.Data;
import lombok.NonNull;

@Data
public class JwtDTO {
    @NonNull
    private String username;
    @NonNull
    private String jwt;
}
