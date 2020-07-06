package com.personalprojecttracker.demo.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestDto {


    int id;

    @NotNull(message = "project name cant be null")
    @Size(min= 5,message = "project name had to be at least 5 in letters")
    String projectName;

    @NotNull(message = "project id cant be null")
    @Size(min = 4,message = "project id had to be at least 4 in letters")
    String projectIdentifier;

    @NotNull(message = "project description cant be null")
    String projectDescription;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date startingDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date endingDate;

    String []notes= new String [0];

    UsefullLinkRequestDto[] usefullLinks= new UsefullLinkRequestDto[0];


}
