package com.personalprojecttracker.demo.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int id;

    @NotNull(message = "project name cant be null")
     @Size(min= 5,message = "project name had to be at least 5 in letters")
    String projectName;

    @Column(unique = true,updatable = false)
    @NotNull(message = "project id cant be null")
    @Size(min = 4,message = "project id had to be at least 4 in letters")
    String projectIdentifier;

    @NotNull(message = "project description cant be null")
    String projectDescription;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date startingDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date endingDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    Date updatedDate;

    @PostPersist
    void setCreatedDate(){
        this.createdDate=new Date();;
    }

    @PostUpdate
    void setUpdatedDate(){
        this.updatedDate=new Date();
    }
}
