package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamProjectTask {

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

    @JsonFormat(pattern = "dd-mm-yyyy")
    Date startDate;

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
    TeamBacklog teamBacklog;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    User createdBy;

    @OneToMany(mappedBy = "teamProjectTask",cascade ={CascadeType.ALL},orphanRemoval = true)
    Set<UserTeamProjectTask> userTeamProjectTasks= new HashSet<>();

    public void addUserTeamProjectTask(UserTeamProjectTask userTeamProjectTask){
        userTeamProjectTasks.add(userTeamProjectTask);
    }

}
