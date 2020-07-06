package com.personalprojecttracker.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsefullLinkRequestDto {

    @NotNull(message = "link cant be null")
    String link;
    String comment;

}
