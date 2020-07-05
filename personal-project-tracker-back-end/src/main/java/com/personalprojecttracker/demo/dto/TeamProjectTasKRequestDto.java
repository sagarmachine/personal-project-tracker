package com.personalprojecttracker.demo.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamProjectTasKRequestDto {

    @NotNull(message = "task preference can't be null")
    int preference;

    @NotNull(message = "task summary cant be null")
    String summary;

    @NotNull(message = "status can't be null")
    String status;

   // @NotNull(message="start date can't be null")
    @JsonFormat(pattern = "dd-mm-yyyy")
    Date startDate;

    //@NotNull(message="endDate can't be null")
    @JsonFormat(pattern = "dd-mm-yyyy")
    Date endDate;
}
