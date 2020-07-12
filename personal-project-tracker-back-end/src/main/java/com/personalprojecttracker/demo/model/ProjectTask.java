package com.personalprojecttracker.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

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

    int preference;

    String summary;

    String status;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date startDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date endDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    Date createdDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
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


    @ElementCollection
    @CollectionTable(name = "project_task_notes", joinColumns = @JoinColumn(name="project_task_id"))
    List<String> notes= new ArrayList<>();


    @ElementCollection
    @CollectionTable(name = "project_task_use_full_links", joinColumns = @JoinColumn(name="project_task_id"))
    List<UsefullLink> usefullLinks= new ArrayList<>();


//    public void addNote(Note note){
//        notes.add(note);
//    }

}
