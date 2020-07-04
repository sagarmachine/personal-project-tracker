package com.personalprojecttracker.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamProjectRequestDto {

    @NotNull(message = "project name cant be null")
    String projectName;

    @NotNull(message = "project identifier cant be null")
  String projectIdentifier;

    @NotNull(message = "project description cant be null")
    String projectDescription;

    //@NotNull(message = "project startDate cant be null")
    Date startingDate;

    //@NotNull(message = "project endDate cant be null")
    Date endingDate;

   // @NotNull(message = "project name cant be null")
    String []membersEmail;

    @NotNull(message = "project leadersEmail cant be null")
    String []leadersEmail;

}
