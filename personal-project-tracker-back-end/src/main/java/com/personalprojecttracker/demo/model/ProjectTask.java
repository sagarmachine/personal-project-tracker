package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;



    String projectTaskIdentifier;

    @NotNull(message = "preference can't be null")
    int preference;

    @NotNull(message = "task summary cant be null")
    String summary;

    @NotNull(message = "status can't be null")
    String status;

   @NotNull(message="start date can't be null")
    @JsonFormat(pattern = "dd-mm-yyyy")
    Date startDate;

    @NotNull(message="endDate can't be null")
    @JsonFormat(pattern = "dd-mm-yyyy")
    Date endDate;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date createdDate;

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date updatedDate;

    @PrePersist
    void setCreatedDate(){
        this.createdDate=new Date();
    }

    @PreUpdate
    void setUpdatedDate(){
        this.updatedDate= new Date();
    }


    @ManyToOne(cascade =CascadeType.REFRESH)
    @JoinColumn
    @JsonIgnore
    Backlog backlog;


}
