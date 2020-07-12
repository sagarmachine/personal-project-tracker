package com.personalprojecttracker.demo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.personalprojecttracker.demo.model.UsefullLink;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTaskRequestDto {

    int id;

    @NotNull(message = "preference can't be null")
    int preference;

    @NotNull(message = "task summary cant be null")
    String summary;

    @NotNull(message = "status can't be null")
    String status;

    //@NotNull(message="start date can't be null")
    @JsonFormat(pattern = "yyyy-mm-dd")
    Date startDate;

   // @NotNull(message="endDate can't be null")
    @JsonFormat(pattern = "yyyy-mm-dd")
    Date endDate;

    List<String> notes=new ArrayList();

    List<UsefullLink> usefullLinks= new ArrayList<>();


}
